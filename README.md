# Hệ Thống Hỗ Trợ Giảng Dạy Cây Quyết Định Quinlan (Quinlan Decision Tree)

Dự án này là một ứng dụng web tương tác thời gian thực được thiết kế để hỗ trợ giảng dạy thuật toán **Cây quyết định Quinlan (Quinlan Decision Tree / ID3)** theo mô hình dạy học **5E (Engage, Explore, Explain, Elaborate, Evaluate)**. 

Hệ thống được phát triển dành cho hoạt động Hội giảng năm 2026 tại Trường Cao đẳng Kỹ thuật Cao Thắng.

---

## 🌟 Các tính năng chính

Hệ thống phân chia giao diện và quyền hạn theo vai trò:

### 1. Vai trò Giảng viên (Teacher - Giao diện điều khiển chính)
*   **Trình chiếu Slide bài giảng (Slideshow Control):** Giảng viên trực tiếp điều phối tiến trình bài học thông qua các Slide tương ứng với 5 giai đoạn 5E.
*   **Đồng bộ hóa thời gian thực (Real-time Sync):** Tự động đồng bộ slide hiển thị và trạng thái lớp học tới tất cả các thiết bị của sinh viên đang kết nối qua WebSocket.
*   **Quản lý điểm số:** Tính điểm hoạt động cho các nhóm sinh viên (Nhóm 1 & Nhóm 2).
*   **Hệ thống Câu hỏi & Thống kê:** Hiển thị kết quả bình chọn, trả lời trắc nghiệm của sinh viên theo thời gian thực dưới dạng biểu đồ/số liệu trực quan.

### 2. Vai trò Sinh viên (Student - Giao diện tương tác trực tuyến)
*   **Theo dõi bài học tự động:** Giao diện của sinh viên tự động thay đổi theo Slide đang trình chiếu của giảng viên.
*   **Tham gia trò chơi dự đoán (Explore):** Nhận mẫu dữ liệu ngẫu nhiên từ giảng viên và thực hiện dự đoán nhãn kết quả học tập (Khá giỏi, Trung bình khá, Rớt môn) dựa trên các thuộc tính nhận được.
*   **Trả lời câu hỏi củng cố (Evaluate):** Thực hiện làm bài trắc nghiệm trực tuyến trên hệ thống, kết quả sẽ được ghi nhận và gửi trực tiếp về màn hình của giảng viên.

### 3. Trực quan hóa Cây Quyết định (Decision Tree Visualizer)
*   Hiển thị sơ đồ cây quyết định bằng đồ họa SVG trực quan, hỗ trợ vẽ động theo từng giai đoạn phát triển của cây.
*   Highlight (tô sáng) đường đi phân loại dựa trên thuộc tính của mẫu dữ liệu được chọn, giúp sinh viên dễ dàng theo dõi tiến trình suy luận từ gốc đến lá.

---

## 🛠️ Công nghệ sử dụng

*   **Frontend:** React 19, Vite, SVG components, CSS Vanilla.
*   **Backend:** Node.js, Express, WebSocket (`ws`).
*   **Dữ liệu (Database):** Lưu trữ dạng file CSV đơn giản (`users.csv` và `data.csv`) được parse trực tiếp ở server để đảm bảo tính gọn nhẹ và dễ cấu hình.
*   **Công cụ chạy đồng thời:** `concurrently` (chạy cả Client và Server bằng một lệnh duy nhất).

---

## 🚀 Hướng dẫn cài đặt và khởi chạy

### Bước 1: Ánh xạ tên miền nội bộ
Hệ thống sử dụng tên miền nội bộ `hoigiang2026.caothang.local`. Để cấu hình file `hosts` tự động:
1.  Nhấp chuột phải vào file `setup-hosts.ps1` ở thư mục gốc của dự án.
2.  Chọn **Run with PowerShell** (Chạy bằng quyền Administrator khi được yêu cầu).

### Bước 2: Cài đặt thư viện (Dependencies)
Chạy lệnh sau tại thư mục gốc để cài đặt tất cả các gói thư viện cần thiết cho cả dự án, client và server:
```bash
npm run install-all
```

### Bước 3: Khởi chạy dự án
Khởi động cả server API, WebSocket server và client cùng một lúc:
```bash
npm run dev
```
*   **Frontend Client:** Chạy tại địa chỉ `http://localhost:5173` hoặc thông qua tên miền `http://hoigiang2026.caothang.local:5173` (sau khi đã map host).
*   **Backend API & WebSocket Server:** Chạy trên cổng `5000`.

---

## 🔑 Tài khoản đăng nhập mặc định

Dữ liệu tài khoản được định nghĩa sẵn trong file [users.csv](file:///d:/CDKTCT/HG/project/quinlan-decision-tree/server/data/users.csv):

| Vai trò | Tên đăng nhập (Username) | Mật khẩu (Password) | Họ và tên | Nhóm |
| :--- | :--- | :--- | :--- | :---: |
| **Giảng viên** | `nhviet` | `Hoigiang2026` | Nguyễn Hoàng Việt | GV (0) |
| **Sinh viên** | `student1` | `Abc123` | Nguyễn Văn A | 1 |
| **Sinh viên** | `student2` | `Abc123` | Nguyễn Văn B | 1 |
| **Sinh viên** | `student3` | `Abc123` | Nguyễn Văn C | 1 |
| **Sinh viên** | `student4` | `Abc123` | Nguyễn Văn D | 2 |
| **Sinh viên** | `student5` | `Abc123` | Nguyễn Văn E | 2 |
| **Sinh viên** | `student6` | `Abc123` | Nguyễn Văn F | 2 |

---

## 📁 Cấu trúc thư mục dự án

```text
quinlan-decision-tree/
├── client/                     # Mã nguồn ứng dụng Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   └── DecisionTreeSVG.jsx   # Thành phần trực quan cây quyết định (SVG)
│   │   ├── App.jsx             # Giao diện chính và luồng xử lý 5E
│   │   └── App.css             # Định kiểu giao diện học tập
│   └── package.json
├── server/                     # Mã nguồn Express Server & WebSocket
│   ├── data/
│   │   ├── data.csv            # Tập dữ liệu huấn luyện cây quyết định
│   │   └── users.csv           # Danh sách người dùng
│   ├── src/
│   │   └── index.js            # Khởi tạo server, API endpoints và WebSocket
│   └── package.json
├── setup-hosts.ps1             # Script cấu hình tên miền nội bộ Cao Thắng
├── package.json                # Cấu hình npm script chạy đồng thời toàn dự án
└── README.md                   # Hướng dẫn dự án này
```
