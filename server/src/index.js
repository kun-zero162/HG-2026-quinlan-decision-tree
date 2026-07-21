import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Helper function to parse simple CSV files
const parseCSV = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length === 0) return [];

    // Parse headers
    const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
    
    // Parse rows
    const data = lines.slice(1).map(line => {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^["']|["']$/g, ''));
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] !== undefined ? values[index] : '';
      });
      return obj;
    });
    
    return data;
  } catch (error) {
    console.error(`Error parsing CSV file ${filePath}:`, error);
    return null;
  }
};

// Global classroom state
let classState = {
  activeStage: 'engage', // engage, explore, explain, elaborate, evaluate
  activeSlideIndex: 0,
  activeQuestionIndex: 0,
  slideshowActive: false,
  scores: { group1: 0, group2: 0 },
  exploreRecord: null, // Current active randomized PC troubleshooting sample
  isRevealed: false, // Whether the current slide's answer is revealed
  evaluateAnswers: {} // Tracks group answers for evaluate stage questions
};

// Login API Check
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Vui lòng cung cấp tài khoản và mật khẩu' });
  }

  const csvPath = path.join(__dirname, '../data/users.csv');
  const users = parseCSV(csvPath);

  if (!users) {
    return res.status(500).json({ error: 'Lỗi hệ thống: Không tìm thấy cơ sở dữ liệu người dùng' });
  }

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
  }

  res.json({
    id: user.id,
    username: user.username,
    fullname: user.fullname,
    role: user.role, // teacher, student
    group: parseInt(user.group, 10) || 0 // 0 for teacher, 1 or 2 for students
  });
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV
  });
});

// Endpoint to fetch decision tree troubleshooting dataset
app.get('/api/dataset', (req, res) => {
  const csvPath = path.join(__dirname, '../data/data.csv');
  const data = parseCSV(csvPath);
  
  if (!data) {
    return res.status(404).json({ error: 'troubleshooting dataset (data.csv) not found' });
  }
  
  res.json({
    filename: 'data.csv',
    columns: Object.keys(data[0] || {}),
    rows: data
  });
});

// Endpoint to fetch users list
app.get('/api/users', (req, res) => {
  const csvPath = path.join(__dirname, '../data/users.csv');
  const data = parseCSV(csvPath);
  
  if (!data) {
    return res.status(404).json({ error: 'users dataset (users.csv) not found' });
  }
  
  res.json({
    filename: 'users.csv',
    columns: Object.keys(data[0] || {}),
    rows: data
  });
});

// Start standard HTTP Server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Attach WebSocket Server
const wss = new WebSocketServer({ server });

// Broadcast utility
const getOnlineUsers = () => {
  const users = [];
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client.user) {
      if (!users.some(u => u.username === client.user.username)) {
        users.push(client.user);
      }
    }
  });
  return users;
};

const broadcastState = () => {
  const payload = JSON.stringify({ 
    type: 'STATE_UPDATE', 
    state: classState,
    onlineUsers: getOnlineUsers()
  });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
};

wss.on('connection', (ws) => {
  // Immediately sync state on connection
  ws.send(JSON.stringify({ 
    type: 'STATE_UPDATE', 
    state: classState,
    onlineUsers: getOnlineUsers()
  }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'USER_IDENTIFY':
          ws.user = data.user;
          broadcastState();
          break;

        case 'TEACHER_UPDATE_STATE':
          // GV updates state fields
          classState = { ...classState, ...data.state };
          broadcastState();
          break;

        case 'TEACHER_RESET_CLASS':
          // Reset the entire classroom state
          classState = {
            activeStage: 'engage',
            activeSlideIndex: 0,
            activeQuestionIndex: 0,
            slideshowActive: false,
            scores: { group1: 0, group2: 0 },
            exploreRecord: null,
            isRevealed: false,
            evaluateAnswers: {},
            studentSubmissions: {}
          };
          broadcastState();
          break;

        case 'STUDENT_SUBMIT_ANSWER': {
          const { username, fullname, questionId, selected } = data;
          if (!username || !questionId) break;
          
          if (!classState.studentSubmissions) {
            classState.studentSubmissions = {};
          }
          if (!classState.studentSubmissions[questionId]) {
            classState.studentSubmissions[questionId] = {};
          }
          
          classState.studentSubmissions[questionId][username] = {
            fullname,
            selected
          };
          
          classState = { ...classState };
          broadcastState();
          break;
        }

        default:
          console.warn('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error processing WS message:', error);
    }
  });

  ws.on('close', () => {
    broadcastState();
  });
});
