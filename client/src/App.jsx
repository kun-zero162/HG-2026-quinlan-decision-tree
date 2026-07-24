import { useState, useEffect, useRef } from 'react';
import './App.css';
import DecisionTreeSVG from './components/DecisionTreeSVG';

// Definition of slides across the 5E stages
const SLIDES = [
  // --- ENGAGE ---
  {
    stage: 'engage',
    type: 'content',
    title: 'Kiểm tra bài cũ - Cây quyết định',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2vh 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh', width: '100%', maxWidth: '500px' }}>
          <div className="quiz-option-stats" style={{ background: '#ffffff', borderColor: 'var(--border-color)', padding: '2.5vh 3vw', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1vw', justifyContent: 'flex-start', textAlign: 'left', width: '100%' }}>
            <span style={{ background: 'var(--primary)', color: 'white', width: '4vh', height: '4vh', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 'bold', fontSize: '2vh', flexShrink: 0 }}>1</span>
            <span style={{ fontWeight: 'bold', fontSize: '2.4vh', color: 'var(--text-primary)' }}>Cây quyết định là gì?</span>
          </div>
          <div className="quiz-option-stats" style={{ background: '#ffffff', borderColor: 'var(--border-color)', padding: '2.5vh 3vw', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1vw', justifyContent: 'flex-start', textAlign: 'left', width: '100%' }}>
            <span style={{ background: 'var(--primary)', color: 'white', width: '4vh', height: '4vh', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 'bold', fontSize: '2vh', flexShrink: 0 }}>2</span>
            <span style={{ fontWeight: 'bold', fontSize: '2.4vh', color: 'var(--text-primary)' }}>Nêu lợi ích của cây quyết định.</span>
          </div>
        </div>
      </div>
    )
  },
  {
    stage: 'engage',
    type: 'content',
    title: 'Kiểm tra bài cũ - Cây quyết định',
    content: null,
    showTree: true
  },

  // --- EXPLORE (4 to 5) ---
  {
    stage: 'explore',
    type: 'content',
    title: 'Đặt vấn đề - Dự đoán kết quả học tập',
    content: (
      <div>
        <p>Chúng ta sẽ tiến hành hoạt động tiếp theo: <strong>"Dự đoán kết quả học tập của sinh viên"</strong> dựa trên tập dữ liệu học tập thực tế.</p>
        <p>Giảng viên sẽ rút ra một mẫu dữ liệu ngẫu nhiên từ hệ thống. Sinh viên sẽ dựa vào cây quyết định và các thuộc tính nhận được để dự đoán kết quả học tập.</p>
      </div>
    ),
    showTree: true
  },
  {
    stage: 'explore',
    type: 'explore-game',
    title: 'Hoạt động: Dự đoán nhãn dữ liệu',
    showTree: true
  },
  {
    stage: 'explore',
    type: 'content',
    title: 'Đặt vấn đề',
    content: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '35vh',
        height: '100%',
        textAlign: 'center',
        padding: '4vh 2vw',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(99, 102, 241, 0.08) 100%)',
        borderRadius: '1.25rem',
        border: '1.5px dashed rgba(99, 102, 241, 0.25)',
        boxShadow: 'inset 0 2px 4px rgba(99, 102, 241, 0.02)',
        margin: '2vh auto',
        maxWidth: '800px'
      }}>
        <h3 style={{
          color: 'var(--primary)',
          fontSize: 'clamp(1.8rem, 4vh, 2.8rem)',
          fontWeight: '800',
          lineHeight: '1.6',
          margin: 0,
          letterSpacing: '-0.02em',
          textShadow: '0 2px 10px rgba(99, 102, 241, 0.05)'
        }}>
          Làm thế nào để máy tính tự động xây dựng được cây quyết định từ dữ liệu?
        </h3>
      </div>
    )
  },

  // --- EXPLAIN (6 to 10) ---
  {
    stage: 'explain',
    type: 'content',
    title: 'Thuật toán Quinlan - Lịch sử phát triển',
    content: (
      <div>
        <p>Thuật toán cây quyết định Quinlan được phát triển đầu tiên vào năm <strong>1986 bởi Ross Quinlan</strong>.</p>
        <p>Đây là thuật toán <strong>tham lam (greedy)</strong> xây dựng cây quyết định bằng cách phân vùng tập dữ liệu một cách đệ quy thành các tập con nhỏ hơn cho đến khi tất cả các điểm dữ liệu trong tập con đều thuộc cùng một lớp (đồng nhất).</p>
        <p>Các phiên bản nâng cấp nổi tiếng tiếp theo bao gồm <strong>ID3</strong> và <strong>C4.5</strong>. Trong bài học này chúng ta tập trung vào ý tưởng Quinlan nguyên thủy sử dụng <strong>phương pháp so sánh vectơ</strong>.</p>
      </div>
    )
  },
  {
    stage: 'explain',
    type: 'content',
    title: 'Xác định Ngữ cảnh Dữ liệu',
    content: (
      <div style={{ padding: '2vh 3vw', display: 'flex', flexDirection: 'column', gap: '3vh', height: '100%', justifyContent: 'center' }}>
        <p style={{ fontSize: '2.75vh', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '0 auto', textAlign: 'center', maxWidth: '800px' }}>
          Một trường học đã thu thập dữ liệu học tập của sinh viên dựa trên <strong>ba yếu tố đầu vào</strong> nhằm phân loại và đánh giá kết quả học tập của từng sinh viên.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1.5px solid var(--border-color)',
            borderRadius: '1rem',
            padding: '2.5vh 2vw',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1vh'
          }}>
            <span style={{ fontSize: '4vh' }}>📝</span>
            <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '3vh', fontWeight: '700' }}>Điểm giữa kỳ</h4>
            <p style={{ margin: 0, fontSize: '2.2vh', color: 'var(--text-muted)', lineHeight: '1.4' }}>Phản ánh năng lực và quá trình học tập nửa đầu học kỳ</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1.5px solid var(--border-color)',
            borderRadius: '1rem',
            padding: '2.5vh 2vw',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1vh'
          }}>
            <span style={{ fontSize: '3.5vh' }}>📅</span>
            <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '3vh', fontWeight: '700' }}>Chuyên cần</h4>
            <p style={{ margin: 0, fontSize: '2.2vh', color: 'var(--text-muted)', lineHeight: '1.4' }}>Mức độ đi học đầy đủ và thái độ chuyên cần trên lớp</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1.5px solid var(--border-color)',
            borderRadius: '1rem',
            padding: '2.5vh 2vw',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1vh'
          }}>
            <span style={{ fontSize: '4vh' }}>🏠</span>
            <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '3vh', fontWeight: '700' }}>Bài tập về nhà</h4>
            <p style={{ margin: 0, fontSize: '2.2vh', color: 'var(--text-muted)', lineHeight: '1.4' }}>Việc tự giác hoàn thành đầy đủ các nhiệm vụ tự học</p>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(99, 102, 241, 0.1) 100%)',
          border: '1.5px solid rgba(99, 102, 241, 0.2)',
          borderRadius: '1rem',
          padding: '2vh 3vw',
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.05)'
        }}>
          <span style={{ fontSize: '5vh' }}>🎯</span>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <h4 style={{ margin: '0 0 0.5vh 0', color: 'var(--primary)', fontSize: '3vh', fontWeight: '700' }}>Cột Kết quả (Mục tiêu phân lớp)</h4>
            <p style={{ margin: 0, fontSize: '2.5vh', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Cột cuối cùng chính là <strong>kết quả thực tế</strong> của sinh viên trong năm học đó sau khi thi xong cuối kỳ và có điểm tổng kết (Giỏi, Trung bình khá hoặc Không đạt).
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    stage: 'explain',
    type: 'content',
    title: 'Thuật ngữ: Vectơ thuộc tính',
    content: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        height: '100%',
        padding: '3vh 2vw',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(99, 102, 241, 0.06) 100%)',
        borderRadius: '1.5rem',
        border: '1.5px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        margin: '2vh auto',
        maxWidth: '900px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '7vh', marginBottom: '2vh' }}>📈,📊,📉</div>
        <p style={{
          fontSize: '3vh',
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
          margin: 0,
          maxWidth: '700px'
        }}>
          Là vectơ chứa các <strong>nhãn kết quả</strong> của các mẫu dữ liệu có cùng thuộc tính.
        </p>
      </div>
    )
  },
  // {
  //   stage: 'explain',
  //   type: 'vector-visualizer',
  //   title: 'Minh họa: Vectơ thuộc tính',
  //   defaultAttr: 'Chuyên cần',
  //   defaultVal: 'Đi học đủ'
  // },
  {
    stage: 'explain',
    type: 'content',
    title: 'Thuật ngữ: Vectơ đơn vị',
    content: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        height: '100%',
        padding: '3vh 2vw',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.02) 0%, rgba(16, 185, 129, 0.06) 100%)',
        borderRadius: '1.5rem',
        border: '1.5px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        margin: '2vh auto',
        maxWidth: '900px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '7vh', marginBottom: '2vh' }}>✅,✅,✅,✅</div>
        <p style={{
          fontSize: '3vh',
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
          margin: 0,
          maxWidth: '700px'
        }}>
          Là vectơ thuộc tính mà tất cả phần tử đều có <strong>CÙNG</strong> một giá trị nhãn (đồng nhất).
        </p>
      </div>
    )
  },
  {
    stage: 'explain',
    type: 'content',
    title: 'Ví dụ minh họa',
    content: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        height: '100%',
        padding: '3vh 2vw',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(99, 102, 241, 0.06) 100%)',
        borderRadius: '1.5rem',
        border: '1.5px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        margin: '2vh auto',
        maxWidth: '900px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '7vh', marginBottom: '2vh' }}>✍️</div>
        <p style={{
          fontSize: '3vh',
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
          margin: 0,
          maxWidth: '900px'
        }}>
          Sinh viên lên bảng xác định các vectơ cho thuộc tính <strong>“Điểm giữa kỳ”</strong>
        </p>
      </div>
    )
  },
  {
    stage: 'explain',
    type: 'content',
    title: 'Ví dụ minh họa',
    content: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        height: '100%',
        padding: '3vh 2vw',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(99, 102, 241, 0.06) 100%)',
        borderRadius: '1.5rem',
        border: '1.5px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        margin: '2vh auto',
        maxWidth: '900px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '7vh', marginBottom: '2vh' }}>📝</div>
        <p style={{
          fontSize: '3vh',
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
          margin: 0,
          maxWidth: '900px'
        }}>
          Cả lớp làm trên phiếu dữ liệu để xác định các vectơ cho thuộc tính <strong>“Làm bài tập”</strong>
        </p>
        <CountdownTimer initialSeconds={120} />
      </div>
    )
  },
  {
    stage: 'explain',
    type: 'vector-visualizer',
    title: 'Minh họa: Vectơ thuộc tính và Vectơ đơn vị',
    defaultAttr: 'Làm bài tập',
    defaultVal: 'Có'
  },
  {
    stage: 'explain',
    type: 'content',
    title: 'Nguyên lý chọn nút của Thuật toán Quinlan',
    content: (
      <div>
        <p>Ý tưởng cốt lõi của thuật toán Quinlan cổ điển:</p>
        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)', margin: '1rem 0' }}>
          <p style={{ fontWeight: 'bold', color: 'var(--primary)', margin: 0 }}>Quy tắc tạo nút:</p>
          <p>1. Đánh giá tất cả các thuộc tính chưa được dùng.</p>
          <p>2. Xác định các vectơ thuộc tính mà chúng tạo ra.</p>
          <p>3. Chọn thuộc tính nào tạo ra <strong>nhiều vectơ đơn vị nhất</strong> để làm nút tiếp theo cho cây quyết định.</p>
          <p>Tiêu chí phụ:</p>
          <ul style={{ textAlign: 'left', listStyleType: 'disc', marginLeft: '2rem', fontSize: '2.5vh', color: 'var(--text-secondary)' }}>
            <li>Nếu có sự trùng lặp (nhiều thuộc tính tạo ra cùng số lượng vectơ đơn vị nhiều nhất), thuật toán sẽ chọn thuộc tính có <strong>tổng số lượng vectơ ít hơn.</strong></li>
            <li>Nếu tổng số lượng vectơ vẫn bằng nhau, thuật toán sẽ lựa chọn <strong>ngẫu nhiên</strong> giữa các thuộc tính đó.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    stage: 'explain',
    type: 'vector-visualizer',
    title: 'Hướng dẫn: Chọn Nút gốc cho Cây quyết định',
    defaultAttr: 'Chuyên cần',
    defaultVal: 'Đi học đủ'
  },
  {
    stage: 'explain',
    type: 'content',
    title: 'Thống kê số lượng vectơ đơn vị - Chọn Nút gốc',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh', width: '100%', maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
        <p style={{ margin: 0, fontSize: '2.2vh', color: 'var(--text-secondary)' }}>
          Dưới đây là bảng thống kê số lượng vectơ đơn vị được tạo ra bởi các thuộc tính ứng viên khi phân tích trên toàn bộ tập dữ liệu (16 mẫu):
        </p>

        <div style={{ background: '#ffffff', border: '1.5px solid var(--border-color)', borderRadius: '1rem', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '2.2vh' }}>
            <thead>
              <tr style={{ background: 'var(--primary-light)', color: 'var(--primary-hover)', borderBottom: '2px solid var(--border-color)', fontWeight: 'bold' }}>
                <th style={{ padding: '2vh 2vw', textAlign: 'left' }}>Thuộc tính ứng viên</th>
                <th style={{ padding: '2vh 2vw', textAlign: 'center' }}>Vectơ các nhánh con</th>
                <th style={{ padding: '2vh 2vw', textAlign: 'center', width: '180px' }}>Số vectơ đơn vị</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(79, 70, 229, 0.03)' }}>
                <td style={{ padding: '1.8vh 1vw', fontWeight: 'bold', color: 'var(--primary)' }}>Chuyên cần</td>
                <td style={{ padding: '1.8vh 1vw', fontSize: '1.8vh' }}>
                  • Đi học đủ: (4/8, 2/8, 2/8)<br />
                  • Thỉnh thoảng vắng: (0/4, 2/4, 2/4)<br />
                  • Thường xuyên vắng: <strong>(0/4, 0/4, 4/4)</strong> 🌟
                </td>
                <td style={{ padding: '1.8vh 1vw', textAlign: 'center', fontWeight: 'bold', fontSize: '2vh', color: 'var(--success)' }}>1</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1.8vh 1vw', fontWeight: 'bold' }}>Điểm giữa kỳ</td>
                <td style={{ padding: '1.8vh 1vw', fontSize: '1.8vh' }}>
                  • ≥ 5: (4/8, 2/8, 2/8)<br />
                  • &lt; 5: (0/8, 2/8, 6/8)
                </td>
                <td style={{ padding: '1.8vh 1vw', textAlign: 'center', fontWeight: 'bold', fontSize: '2vh' }}>0</td>
              </tr>
              <tr>
                <td style={{ padding: '1.8vh 1vw', fontWeight: 'bold' }}>Làm bài tập</td>
                <td style={{ padding: '1.8vh 1vw', fontSize: '1.8vh' }}>
                  • Có: (3/9, 3/9, 3/9)<br />
                  • Không: (1/7, 1/7, 5/7)
                </td>
                <td style={{ padding: '1.8vh 1vw', textAlign: 'center', fontWeight: 'bold', fontSize: '2vh' }}>0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.1) 100%)',
          border: '1.5px solid rgba(16, 185, 129, 0.2)',
          padding: '2vh 1.5vw',
          borderRadius: '0.75rem',
          color: 'var(--success-text)',
          fontWeight: '600',
          fontSize: '2.6vh',
          display: 'flex',
          alignItems: 'center',
          gap: '1vw'
        }}>
          <span>🎯</span>
          <span>
            <strong>Kết luận:</strong> Thuộc tính <strong>Chuyên cần</strong> được chọn làm <strong>nút gốc</strong> vì tạo ra nhiều vectơ đơn vị nhất (1 vectơ đơn vị tại nhánh <i>Thường xuyên vắng</i>).
          </span>
        </div>
      </div>
    ),
    showTree: false
  },

  // --- ELABORATE (11 to 22) ---
  {
    stage: 'elaborate',
    type: 'content',
    title: 'Áp dụng thuật toán Quinlan',
    content: (
      <div>
        <p>Sau khi đưa thuộc tính <strong>Chuyên cần</strong> vào nút gốc của cây quyết định:</p>
        <ul>
          <li>Nhánh <strong>Thường xuyên vắng</strong> chỉ chứa các bản ghi có kết quả = <strong>Không đạt</strong>. Với các giá trị nhãn: K, K, K, K, ta thu được vectơ đơn vị <strong>(0/4, 0/4, 4/4)</strong>. Nhánh này kết thúc tại nút lá <i>Không đạt</i>.</li>
          <li>Các nhánh <strong>Thỉnh thoảng vắng</strong> và <strong>Đi học đủ</strong> chứa nhiều nhãn kết quả học tập khác nhau. Chúng ta cần tiến hành phân nhánh tiếp!</li>
        </ul>
      </div>
    ),
    showTree: true
  },
  // Hoạt động 1 (Nhóm 1)
  {
    stage: 'elaborate',
    type: 'elaborate-h1',
    title: 'Hoạt động 1 - Bước 1: Nhánh Chuyên cần = Đi học đủ',
    treeState: (isRevealed) => isRevealed ? 'elaborate-2' : 'elaborate-1',
    showTree: true
  },
  // Hoạt động 1 - Bước 2
  {
    stage: 'elaborate',
    type: 'elaborate-h1-2',
    title: 'Hoạt động 1 - Bước 2: Hoàn thiện nhánh Đi học đủ',
    treeState: (isRevealed) => isRevealed ? 'elaborate-3' : 'elaborate-2',
    showTree: true
  },
  // Hoạt động 2 (Nhóm 2)
  {
    stage: 'elaborate',
    type: 'elaborate-h2',
    title: 'Hoạt động 2: Nhánh Chuyên cần = Thỉnh thoảng vắng',
    treeState: (isRevealed) => isRevealed ? 'full' : 'elaborate-3',
    showTree: true
  },

  // --- EVALUATE (23 to 28) ---
  {
    stage: 'evaluate',
    type: 'content',
    title: 'Đánh giá - Cây quyết định & Các luật',
    content: (
      <div className="rules-container">
        <p style={{ margin: '0 0 1vh 0' }}>Từ cây quyết định hoàn thiện, ta rút ra <strong>Tập luật quyết định (Decision Rules)</strong>:</p>
        <div className="rules-box">
          1. IF Chuyên cần = Thường xuyên vắng THEN Kết quả học tập = Không đạt <br />
          2. IF Chuyên cần = Thỉnh thoảng vắng AND Điểm giữa kỳ ≥ 5 THEN Kết quả học tập = Trung bình khá <br />
          3. IF Chuyên cần = Thỉnh thoảng vắng AND Điểm giữa kỳ &lt; 5 THEN Kết quả học tập = Không đạt <br />
          4. IF Chuyên cần = Đi học đủ AND Điểm giữa kỳ ≥ 5 THEN Kết quả học tập = Giỏi <br />
          5. IF Chuyên cần = Đi học đủ AND Điểm giữa kỳ &lt; 5 AND Làm bài tập = Có THEN Kết quả học tập = Trung bình khá <br />
          6. IF Chuyên cần = Đi học đủ AND Điểm giữa kỳ &lt; 5 AND Làm bài tập = Không THEN Kết quả học tập = Không đạt
        </div>
      </div>
    ),
  },
  {
    stage: 'evaluate',
    type: 'question',
    title: 'Đánh giá - Câu hỏi 1',
    question: {
      text: 'Thuật toán Quinlan dùng dữ liệu để làm gì đầu tiên?',
      options: [
        'A. Chọn ngẫu nhiên thuộc tính làm nút gốc.',
        'B. Chọn thuộc tính có số vectơ đơn vị lớn nhất để làm nút gốc.',
        'C. Xóa các record để làm sạch dữ liệu.',
        'D. Dự đoán kết quả theo các công thức của thuật toán.'
      ],
      correct: 1,
      id: 'evaluate-q1'
    }
  },
  {
    stage: 'evaluate',
    type: 'question',
    title: 'Đánh giá - Câu hỏi 2',
    question: {
      text: 'Sau khi xác định các vectơ, nếu hai thuộc tính có cùng số vectơ đơn vị, thuật toán sẽ làm gì?',
      options: [
        'A. Dừng quá trình tạo nút.',
        'B. Tiếp tục chọn thuộc tính khác và xác định các vectơ mới.',
        'C. Chọn thuộc tính có số lượng vectơ ít hơn làm nút.',
        'D. Ghép 2 thuộc tính đó thành một nhóm và tạo nút.'
      ],
      correct: 2,
      id: 'evaluate-q2'
    }
  },
  {
    stage: 'evaluate',
    type: 'question',
    title: 'Đánh giá - Câu hỏi 3',
    question: {
      text: 'Với bản ghi mới dưới đây, dựa vào cây quyết định và tập luật đã học, kết quả học tập dự đoán của sinh viên này sẽ là gì?',
      record: {
        'Chuyên cần': 'Thỉnh thoảng vắng',
        'Điểm giữa kỳ': '>=5',
        'Làm bài tập': 'Không'
      },
      options: ['Giỏi', 'Trung bình khá', 'Không đạt'],
      correct: 1,
      id: 'evaluate-q3'
    }
  },
  {
    stage: 'evaluate',
    type: 'evaluate-stats',
    title: 'Thống kê kết quả Đánh giá'
  },
  {
    stage: 'evaluate',
    type: 'content',
    title: 'Tổng kết',
    content: (
      <div>
        <h3 style={{ color: 'var(--primary)' }}>Củng cố bài học</h3>
        <p>Thuật toán Quinlan cổ điển sử dụng việc so sánh số lượng vectơ đơn vị để lần lượt chọn thuộc tính làm nút quyết định.</p>
        <p>Cấu trúc cây quyết định phụ thuộc trực tiếp vào đặc trưng của dữ liệu đầu vào.</p>
      </div>
    )
  },

  {
    stage: 'evaluate',
    type: 'content',
    title: 'Bài tập về nhà',
    content: (
      <div>
        <h3 style={{ color: 'var(--primary)' }}>Nhiệm vụ về nhà</h3>
        <ol style={{ paddingLeft: '1.2rem', lineHeight: '1.6' }}>
          <li>Giả sử thuộc tính Điểm giữa kỳ được chi tiết hóa thành &quot;&gt;=8&quot;, &quot;5 đến &lt;8&quot;, và &quot;&lt;5&quot;, hãy thực hiện lại thuật toán để xây dựng cây quyết định mới.</li>
          <li>Nếu ở bước chọn nút gốc, KHÔNG CÓ thuộc tính nào tạo được vectơ đơn vị thì thuật toán làm thế nào để chọn nút một cách khách quan nhất?</li>
        </ol>
      </div>
    )
  }
];

const STAGE_START_INDICES = {
  engage: 0,
  explore: 2,
  explain: 5,
  elaborate: 14,
  evaluate: 18
};

const FALLBACK_ROWS = [
  { STT: 1, 'Chuyên cần': 'Đi học đủ', 'Điểm giữa kỳ': '>=5', 'Làm bài tập': 'Có', 'Kết quả học tập': 'Giỏi' },
  { STT: 2, 'Chuyên cần': 'Đi học đủ', 'Điểm giữa kỳ': '>=5', 'Làm bài tập': 'Có', 'Kết quả học tập': 'Giỏi' },
  { STT: 3, 'Chuyên cần': 'Đi học đủ', 'Điểm giữa kỳ': '>=5', 'Làm bài tập': 'Không', 'Kết quả học tập': 'Giỏi' },
  { STT: 4, 'Chuyên cần': 'Đi học đủ', 'Điểm giữa kỳ': '<5', 'Làm bài tập': 'Có', 'Kết quả học tập': 'Trung bình khá' },
  { STT: 5, 'Chuyên cần': 'Đi học đủ', 'Điểm giữa kỳ': '<5', 'Làm bài tập': 'Có', 'Kết quả học tập': 'Trung bình khá' },
  { STT: 6, 'Chuyên cần': 'Đi học đủ', 'Điểm giữa kỳ': '<5', 'Làm bài tập': 'Không', 'Kết quả học tập': 'Không đạt' },
  { STT: 7, 'Chuyên cần': 'Thỉnh thoảng vắng', 'Điểm giữa kỳ': '>=5', 'Làm bài tập': 'Có', 'Kết quả học tập': 'Trung bình khá' },
  { STT: 8, 'Chuyên cần': 'Thỉnh thoảng vắng', 'Điểm giữa kỳ': '>=5', 'Làm bài tập': 'Không', 'Kết quả học tập': 'Trung bình khá' },
  { STT: 9, 'Chuyên cần': 'Thỉnh thoảng vắng', 'Điểm giữa kỳ': '<5', 'Làm bài tập': 'Có', 'Kết quả học tập': 'Không đạt' },
  { STT: 10, 'Chuyên cần': 'Thỉnh thoảng vắng', 'Điểm giữa kỳ': '<5', 'Làm bài tập': 'Không', 'Kết quả học tập': 'Không đạt' },
  { STT: 11, 'Chuyên cần': 'Thường xuyên vắng', 'Điểm giữa kỳ': '>=5', 'Làm bài tập': 'Có', 'Kết quả học tập': 'Không đạt' },
  { STT: 12, 'Chuyên cần': 'Thường xuyên vắng', 'Điểm giữa kỳ': '>=5', 'Làm bài tập': 'Không', 'Kết quả học tập': 'Không đạt' },
  { STT: 13, 'Chuyên cần': 'Thường xuyên vắng', 'Điểm giữa kỳ': '<5', 'Làm bài tập': 'Có', 'Kết quả học tập': 'Không đạt' },
  { STT: 14, 'Chuyên cần': 'Thường xuyên vắng', 'Điểm giữa kỳ': '<5', 'Làm bài tập': 'Không', 'Kết quả học tập': 'Không đạt' },
  { STT: 15, 'Chuyên cần': 'Đi học đủ', 'Điểm giữa kỳ': '>=5', 'Làm bài tập': 'Có', 'Kết quả học tập': 'Giỏi' },
  { STT: 16, 'Chuyên cần': 'Đi học đủ', 'Điểm giữa kỳ': '<5', 'Làm bài tập': 'Không', 'Kết quả học tập': 'Không đạt' }
];

function CountdownTimer({ initialSeconds = 120 }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isUrgent = seconds <= 15;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2vh',
      marginTop: '3vh'
    }}>
      <div 
        className={`timer-display ${isUrgent && seconds > 0 ? 'timer-pulse-critical' : ''}`}
        style={{
          position: 'relative',
          width: '18vh',
          height: '18vh',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.8)',
          border: '4px solid',
          borderColor: isUrgent && seconds > 0 ? '#ef4444' : 'var(--primary)',
          boxShadow: isUrgent && seconds > 0 
            ? '0 0 20px rgba(239, 68, 68, 0.4)' 
            : '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{
          fontSize: '5vh',
          fontWeight: '800',
          fontFamily: 'monospace',
          color: isUrgent && seconds > 0 ? '#ef4444' : 'var(--text-primary)',
          letterSpacing: '1px'
        }}>
          {formatTime(seconds)}
        </span>
        <span style={{
          fontSize: '1.5vh',
          color: isUrgent && seconds > 0 ? '#b91c1c' : 'var(--text-muted)',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          letterSpacing: '1px',
          marginTop: '-0.5vh'
        }}>
          {seconds === 0 ? 'Hết giờ!' : isActive ? 'Đang chạy' : 'Tạm dừng'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '1.5vw' }}>
        <button
          onClick={toggleTimer}
          style={{
            padding: '1.2vh 2.5vw',
            fontSize: '2vh',
            fontWeight: '600',
            borderRadius: '2rem',
            border: 'none',
            cursor: 'pointer',
            background: isActive ? 'var(--warning)' : 'var(--primary)',
            color: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5vw'
          }}
          className="btn-timer-toggle"
        >
          {isActive ? '⏸️ Tạm dừng' : '▶️ Bắt đầu'}
        </button>

        <button
          onClick={resetTimer}
          style={{
            padding: '1.2vh 2.5vw',
            fontSize: '2vh',
            fontWeight: '600',
            borderRadius: '2rem',
            border: '1.5px solid var(--border-color)',
            cursor: 'pointer',
            background: '#ffffff',
            color: 'var(--text-primary)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.2s ease'
          }}
          className="btn-timer-reset"
        >
          🔄 Đặt lại
        </button>
      </div>
    </div>
  );
}

function VectorExtractionVisualizer({ defaultAttr = 'Chuyên cần', defaultVal = 'Đi học đủ', isSlideshow = false, definition = null }) {
  const [selectedAttr, setSelectedAttr] = useState(defaultAttr);
  const [selectedVal, setSelectedVal] = useState(defaultVal);
  const [animationStep, setAnimationStep] = useState(0);

  const attributes = {
    'Chuyên cần': ['Đi học đủ', 'Thỉnh thoảng vắng', 'Thường xuyên vắng'],
    'Điểm giữa kỳ': ['>=5', '<5'],
    'Làm bài tập': ['Có', 'Không']
  };

  useEffect(() => {
    setAnimationStep(0);
    const t1 = setTimeout(() => setAnimationStep(1), 300);
    const t2 = setTimeout(() => setAnimationStep(2), 1000);
    const t3 = setTimeout(() => setAnimationStep(3), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [selectedAttr, selectedVal]);

  useEffect(() => {
    setSelectedAttr(defaultAttr);
    setSelectedVal(defaultVal);
  }, [defaultAttr, defaultVal]);

  const rows = FALLBACK_ROWS;
  const matchingRows = rows.filter(row => row[selectedAttr] === selectedVal);

  const getBadgeValue = (val) => {
    if (val === 'Giỏi') return 'G';
    if (val === 'Trung bình khá') return 'T';
    if (val === 'Không đạt') return 'K';
    return val;
  };

  const getBadgeColor = (val) => {
    if (val === 'Giỏi' || val === 'G') return '#10b981';
    if (val === 'Trung bình khá' || val === 'T') return '#f59e0b';
    if (val === 'Không đạt' || val === 'K') return '#ef4444';
    return '#94a3b8';
  };

  const firstOutcome = matchingRows[0] ? matchingRows[0]['Kết quả học tập'] : '';
  const isUnitVector = matchingRows.every(row => row['Kết quả học tập'] === firstOutcome);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '1.5rem', marginTop: '0.5rem', width: '100%', alignItems: 'start', maxHeight: isSlideshow ? '58vh' : 'auto' }}>
      <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
        {definition && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.04) 0%, rgba(99, 102, 241, 0.08) 100%)',
            border: '1.5px solid rgba(99, 102, 241, 0.15)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            fontSize: isSlideshow ? '1.8vh' : '0.875rem',
            lineHeight: '1.5',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.6rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <span style={{ fontSize: isSlideshow ? '2.2vh' : '1.1rem', marginTop: '-2px' }}>📖</span>
            <div>
              <strong style={{ color: 'var(--primary)' }}>Định nghĩa:</strong> {definition}
            </div>
          </div>
        )}

        <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--primary)', fontSize: isSlideshow ? '2.3vh' : '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>💡 Trích xuất Vectơ Minh Họa</span>
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.2rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
              1. Thuộc tính đang xét:
            </span>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {Object.keys(attributes).map(attr => (
                <button
                  key={attr}
                  className={`btn ${selectedAttr === attr ? 'primary' : ''}`}
                  style={{ padding: '0.35rem 0.7rem', fontSize: '0.85rem', borderRadius: '0.375rem' }}
                  onClick={() => {
                    setSelectedAttr(attr);
                    setSelectedVal(attributes[attr][0]);
                  }}
                >
                  {attr}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
              2. Giá trị của thuộc tính:
            </span>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {attributes[selectedAttr].map(val => (
                <button
                  key={val}
                  className={`btn ${selectedVal === val ? 'primary' : ''}`}
                  style={{ padding: '0.35rem 0.7rem', fontSize: '0.85rem', borderRadius: '0.375rem', borderColor: 'var(--primary-light)' }}
                  onClick={() => setSelectedVal(val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
          <p style={{ fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
            Kết quả trích xuất cho nhánh <span style={{ color: 'var(--primary)' }}>[{selectedAttr} = {selectedVal}]</span>:
          </p>

          <p style={{ fontSize: '0.85rem', margin: '0 0 0.8rem 0', color: 'var(--text-secondary)' }}>
            Các dòng mẫu thỏa mãn: <strong>{matchingRows.map(r => r.STT).join(', ')}</strong>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', margin: '0.8rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 'bold', fontSize: '0.95rem', minWidth: '120px', textAlign: 'left' }}>Các giá trị nhãn:</span>
              <div style={{
                display: 'flex',
                gap: '0.3rem',
                alignItems: 'center',
                background: '#ffffff',
                padding: '0.4rem 0.8rem',
                borderRadius: '0.5rem',
                border: '1.5px solid var(--border-color)',
                minHeight: '2.2rem'
              }}>
                {matchingRows.map((row, idx) => {
                  const visible = animationStep >= 3;
                  return (
                    <span key={row.STT} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      {idx > 0 && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>,</span>}
                      <span
                        style={{
                          display: 'inline-flex',
                          background: getBadgeColor(row['Kết quả học tập']),
                          color: 'white',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '0.85rem',
                          opacity: visible ? 1 : 0,
                          transform: visible ? 'scale(1)' : 'scale(0)',
                          transition: `all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${idx * 0.08}s`
                        }}
                      >
                        {getBadgeValue(row['Kết quả học tập'])}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 'bold', fontSize: '0.95rem', minWidth: '120px', textAlign: 'left' }}>Vectơ (G, T, K):</span>
              <div style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'var(--primary)',
                background: 'var(--primary-light)',
                padding: '0.4rem 0.8rem',
                borderRadius: '0.5rem',
                border: '1.5px solid var(--primary)',
                display: 'inline-block'
              }}>
                {(() => {
                  const total = matchingRows.length;
                  const gVal = matchingRows.filter(r => r['Kết quả học tập'] === 'Giỏi').length;
                  const tVal = matchingRows.filter(r => r['Kết quả học tập'] === 'Trung bình khá').length;
                  const kVal = matchingRows.filter(r => r['Kết quả học tập'] === 'Không đạt').length;
                  return animationStep >= 3 ? `(${gVal}/${total}, ${tVal}/${total}, ${kVal}/${total})` : '(...)';
                })()}
              </div>
              {animationStep >= 3 && (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  (có {matchingRows.filter(r => r['Kết quả học tập'] === 'Giỏi').length}G, {matchingRows.filter(r => r['Kết quả học tập'] === 'Trung bình khá').length}T, {matchingRows.filter(r => r['Kết quả học tập'] === 'Không đạt').length}K trên {matchingRows.length} mẫu)
                </span>
              )}
            </div>
          </div>

          {animationStep >= 3 && (
            <div style={{
              marginTop: '0.8rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              background: isUnitVector ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
              border: `1px solid ${isUnitVector ? '#a7f3d0' : '#fca5a5'}`,
              color: isUnitVector ? '#065f46' : '#991b1b',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              animation: 'fadeIn 0.3s ease-out'
            }}>
              <span>{isUnitVector ? '✅ Vectơ đơn vị (Đồng nhất)' : '❌ Không phải vectơ đơn vị'}</span>
            </div>
          )}
        </div>
      </div>

      <div className="table-responsive" style={{ background: '#ffffff', borderRadius: '0.75rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', maxHeight: isSlideshow ? '58vh' : '450px', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'center' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 5 }}>
              <th style={{ padding: '0.5rem 0.6rem' }}>STT</th>
              <th style={{ padding: '0.5rem 0.6rem', background: selectedAttr === 'Chuyên cần' ? 'rgba(99, 102, 241, 0.08)' : '' }}>Chuyên cần</th>
              <th style={{ padding: '0.5rem 0.6rem', background: selectedAttr === 'Điểm giữa kỳ' ? 'rgba(99, 102, 241, 0.08)' : '' }}>Điểm giữa kỳ</th>
              <th style={{ padding: '0.5rem 0.6rem', background: selectedAttr === 'Làm bài tập' ? 'rgba(99, 102, 241, 0.08)' : '' }}>Làm bài tập</th>
              <th style={{ padding: '0.5rem 0.6rem', fontWeight: 'bold' }}>Kết quả</th>
              <th style={{ padding: '0.5rem 0.2rem', width: '35px' }}>Trích</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isMatch = row[selectedAttr] === selectedVal;
              const isStep1 = animationStep >= 1;
              const isStep2 = animationStep >= 2;

              return (
                <tr
                  key={row.STT}
                  style={{
                    background: isMatch && isStep1 ? 'rgba(99, 102, 241, 0.05)' : '#ffffff',
                    borderLeft: isMatch && isStep1 ? '4px solid var(--primary)' : 'none',
                    borderBottom: '1px solid #f1f5f9',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <td style={{ padding: '0.4rem 0.6rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                    #{row.STT}
                  </td>
                  <td style={{ padding: '0.4rem 0.6rem', fontWeight: selectedAttr === 'Chuyên cần' ? 'bold' : 'normal' }}>
                    {row['Chuyên cần']}
                  </td>
                  <td style={{ padding: '0.4rem 0.6rem', fontWeight: selectedAttr === 'Điểm giữa kỳ' ? 'bold' : 'normal' }}>
                    {row['Điểm giữa kỳ']}
                  </td>
                  <td style={{ padding: '0.4rem 0.6rem', fontWeight: selectedAttr === 'Làm bài tập' ? 'bold' : 'normal' }}>
                    {row['Làm bài tập']}
                  </td>
                  <td style={{ padding: '0.4rem 0.6rem' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.2em 0.5em',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      background: isMatch && isStep1 ? getBadgeColor(row['Kết quả học tập']) + '15' : '#f1f5f9',
                      color: isMatch && isStep1 ? getBadgeColor(row['Kết quả học tập']) : 'var(--text-muted)',
                      border: `1.5px solid ${isMatch && isStep1 ? getBadgeColor(row['Kết quả học tập']) : '#e2e8f0'}`,
                      transition: 'all 0.3s ease'
                    }}>
                      {row['Kết quả học tập']}
                    </span>
                  </td>
                  <td style={{ padding: '0.4rem 0.2rem', verticalAlign: 'middle' }}>
                    {isMatch && isStep2 && (
                      <span style={{
                        display: 'inline-flex',
                        background: getBadgeColor(row['Kết quả học tập']),
                        color: 'white',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        animation: 'fadeIn 0.25s ease-out'
                      }}>
                        {getBadgeValue(row['Kết quả học tập'])}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function ElaborateActivity1({ isTeacher, isRevealed, isSlideshow, onReveal }) {
  const [inputs, setInputs] = useState({
    diemGkOver5Vector: '',
    diemGkOver5IsUnit: null,
    diemGkUnder5Vector: '',
    diemGkUnder5IsUnit: null,
    selectedNode: ''
  });
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (isRevealed) {
      setInputs({
        diemGkOver5Vector: '(4/4, 0/4, 0/4)',
        diemGkOver5IsUnit: true,
        diemGkUnder5Vector: '(0/4, 2/4, 2/4)',
        diemGkUnder5IsUnit: false,
        selectedNode: 'Điểm giữa kỳ'
      });
      setShowFeedback(true);
    } else {
      setInputs({
        diemGkOver5Vector: '',
        diemGkOver5IsUnit: null,
        diemGkUnder5Vector: '',
        diemGkUnder5IsUnit: null,
        selectedNode: ''
      });
      setShowFeedback(false);
    }
  }, [isRevealed]);

  const correct = {
    diemGkOver5Vector: '4/4,0/4,0/4',
    diemGkOver5IsUnit: true,
    diemGkUnder5Vector: '0/4,2/4,2/4',
    diemGkUnder5IsUnit: false,
    selectedNode: 'Điểm giữa kỳ'
  };

  const handleCheck = () => {
    setShowFeedback(true);
  };

  const handleReset = () => {
    setInputs({
      diemGkOver5Vector: '',
      diemGkOver5IsUnit: null,
      diemGkUnder5Vector: '',
      diemGkUnder5IsUnit: null,
      selectedNode: ''
    });
    setShowFeedback(false);
  };

  const normalize = (str) => {
    if (!str) return '';
    let clean = str.replace(/[()]/g, '').trim();
    clean = clean.replace(/[\s,]+/g, ',');
    return clean;
  };

  const isFieldCorrect = (field, val) => {
    if (field.endsWith('IsUnit')) {
      return val === correct[field];
    }
    if (field === 'selectedNode') {
      return val.trim().toLowerCase() === correct.selectedNode.toLowerCase();
    }
    return normalize(val) === correct[field];
  };

  const getStatusIndicator = (field, val) => {
    if (!showFeedback) return null;
    if (val === '' || val === null) return <span style={{ color: 'var(--error)', marginLeft: '0.5rem', fontSize: '0.85rem' }}>❌ Trống</span>;
    return isFieldCorrect(field, val)
      ? <span style={{ color: 'var(--success)', fontWeight: 'bold', marginLeft: '0.5rem', fontSize: '0.85rem' }}>✅ Đúng</span>
      : <span style={{ color: 'var(--error)', fontWeight: 'bold', marginLeft: '0.5rem', fontSize: '0.85rem' }}>❌ Sai</span>;
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5vh 1.5vw',
    marginTop: '1vh',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto'
  };

  const cardStyle = {
    background: '#ffffff',
    border: '1.5px solid var(--border-color)',
    borderRadius: '0.75rem',
    padding: '1.5vh 1.5vw',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2vh'
  };

  const labelStyle = {
    fontWeight: 'bold',
    fontSize: isSlideshow ? '1.8vh' : '0.85rem',
    color: 'var(--text-primary)'
  };

  const inputStyle = (field, val) => {
    const isErr = showFeedback && (val === '' || val === null || !isFieldCorrect(field, val));
    const isOk = showFeedback && val !== '' && val !== null && isFieldCorrect(field, val);
    return {
      padding: '0.5vh 0.6vw',
      borderRadius: '0.375rem',
      border: `1.5px solid ${isErr ? 'var(--error)' : isOk ? 'var(--success)' : 'var(--border-color)'}`,
      outline: 'none',
      fontSize: isSlideshow ? '1.8vh' : '0.85rem',
      width: '130px',
      boxSizing: 'border-box',
      background: isErr ? 'var(--error-bg)' : isOk ? 'var(--success-bg)' : '#ffffff',
      color: isErr ? 'var(--error-text)' : isOk ? 'var(--success-text)' : 'var(--text-primary)',
      transition: 'all 0.2s ease'
    };
  };

  const btnToggleStyle = (field, val, currentVal) => {
    const isSelected = val === currentVal;
    let bg = isSelected ? 'var(--primary)' : '#f1f5f9';
    let color = isSelected ? '#ffffff' : 'var(--text-secondary)';
    let border = '1px solid var(--border-color)';

    if (showFeedback && isSelected) {
      const isOk = isFieldCorrect(field, currentVal);
      bg = isOk ? 'var(--success)' : 'var(--error)';
      color = '#ffffff';
      border = `1px solid ${isOk ? 'var(--success)' : 'var(--error)'}`;
    }

    return {
      padding: '0.3vh 0.8vw',
      borderRadius: '0.25rem',
      border,
      background: bg,
      color,
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: isSlideshow ? '1.6vh' : '0.8rem',
      transition: 'all 0.15s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5vh',
      width: '100%',
      textAlign: 'left',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* Cột trái: Nhập vectơ */}
      <div style={{
        flex: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8vh',
        width: '100%',
        maxWidth: '580px'
      }}>
        <p style={{ fontSize: isSlideshow ? '1.8vh' : '0.9rem', margin: '0 0 0.5vh 0', color: 'var(--text-secondary)', textAlign: isSlideshow ? 'left' : 'center' }}>
          Khảo sát dữ liệu tại nhánh <strong>Chuyên cần = Đi học đủ</strong>. Xác định giá trị nhãn và tính toán <strong>Vectơ (G, T, K)</strong> có dạng <strong>(số G/tổng, số T/tổng, số K/tổng)</strong>.
        </p>

        <div style={containerStyle}>
          {/* Điểm giữa kỳ Card */}
          <div style={cardStyle}>
            <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: isSlideshow ? '2vh' : '0.9rem', fontWeight: '800', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.5vh', textAlign: 'center' }}>
              🔍 Khảo sát thuộc tính: Điểm giữa kỳ
            </h4>

            {/* Branch >= 5 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4vh' }}>
              <span style={labelStyle}>Nhánh: Điểm giữa kỳ ≥ 5 (Mẫu 1, 2, 3, 15)</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: isSlideshow ? '1.6vh' : '0.8rem', color: 'var(--text-secondary)' }}>Nhãn:</span>
                <span style={{ background: '#f1f5f9', padding: '0.2vh 0.5vw', borderRadius: '0.25rem', fontWeight: 'bold', fontSize: isSlideshow ? '1.6vh' : '0.8rem' }}>G, G, G, G</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5vw', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Nhập giá trị vectơ ở đây"
                  style={inputStyle('diemGkOver5Vector', inputs.diemGkOver5Vector)}
                  value={inputs.diemGkOver5Vector}
                  onChange={(e) => setInputs({ ...inputs, diemGkOver5Vector: e.target.value })}
                  disabled={isRevealed}
                />
                <span style={{ fontSize: isSlideshow ? '1.6vh' : '0.8rem', color: 'var(--text-secondary)' }}>Đơn vị?</span>
                <button
                  type="button"
                  style={btnToggleStyle('diemGkOver5IsUnit', true, inputs.diemGkOver5IsUnit)}
                  onClick={() => !isRevealed && setInputs({ ...inputs, diemGkOver5IsUnit: true })}
                >Có</button>
                <button
                  type="button"
                  style={btnToggleStyle('diemGkOver5IsUnit', false, inputs.diemGkOver5IsUnit)}
                  onClick={() => !isRevealed && setInputs({ ...inputs, diemGkOver5IsUnit: false })}
                >Không</button>
                {getStatusIndicator('diemGkOver5Vector', inputs.diemGkOver5Vector)}
                {getStatusIndicator('diemGkOver5IsUnit', inputs.diemGkOver5IsUnit)}
              </div>
            </div>

            {/* Branch < 5 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4vh', marginTop: '0.5vh' }}>
              <span style={labelStyle}>Nhánh: Điểm giữa kỳ &lt; 5 (Mẫu 4, 5, 6, 16)</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: isSlideshow ? '1.6vh' : '0.8rem', color: 'var(--text-secondary)' }}>Nhãn:</span>
                <span style={{ background: '#f1f5f9', padding: '0.2vh 0.5vw', borderRadius: '0.25rem', fontWeight: 'bold', fontSize: isSlideshow ? '1.6vh' : '0.8rem' }}>T, T, K, K</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5vw', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Nhập giá trị vectơ ở đây"
                  style={inputStyle('diemGkUnder5Vector', inputs.diemGkUnder5Vector)}
                  value={inputs.diemGkUnder5Vector}
                  onChange={(e) => setInputs({ ...inputs, diemGkUnder5Vector: e.target.value })}
                  disabled={isRevealed}
                />
                <span style={{ fontSize: isSlideshow ? '1.6vh' : '0.8rem', color: 'var(--text-secondary)' }}>Đơn vị?</span>
                <button
                  type="button"
                  style={btnToggleStyle('diemGkUnder5IsUnit', true, inputs.diemGkUnder5IsUnit)}
                  onClick={() => !isRevealed && setInputs({ ...inputs, diemGkUnder5IsUnit: true })}
                >Có</button>
                <button
                  type="button"
                  style={btnToggleStyle('diemGkUnder5IsUnit', false, inputs.diemGkUnder5IsUnit)}
                  onClick={() => !isRevealed && setInputs({ ...inputs, diemGkUnder5IsUnit: false })}
                >Không</button>
                {getStatusIndicator('diemGkUnder5Vector', inputs.diemGkUnder5Vector)}
                {getStatusIndicator('diemGkUnder5IsUnit', inputs.diemGkUnder5IsUnit)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cột phải: Chọn nút & Buttons */}
      <div style={{
        flex: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2vh',
        width: '100%',
        maxWidth: '580px',
        alignItems: 'stretch'
      }}>
        {/* Decision Node Selector */}
        <div style={{
          ...cardStyle,
          flexDirection: isSlideshow ? 'column' : 'row',
          alignItems: isSlideshow ? 'stretch' : 'center',
          justifyContent: 'space-between',
          padding: '1.2vh 1.5vw',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(99, 102, 241, 0.05) 100%)',
          border: '1.5px solid rgba(99, 102, 241, 0.15)',
          marginTop: '0.5vh',
          maxWidth: '100%',
          margin: '0.5vh auto 0 auto',
          width: '100%'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2vh', textAlign: isSlideshow ? 'center' : 'left', marginBottom: isSlideshow ? '0.5vh' : '0' }}>
            <span style={{ fontWeight: '800', fontSize: isSlideshow ? '1.9vh' : '0.9rem', color: 'var(--primary)' }}>
              🎯 Chọn nút quyết định tiếp theo:
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.5vw', alignItems: 'center', justifyContent: isSlideshow ? 'center' : 'flex-end' }}>
            <select
              style={{
                padding: '0.5vh 0.8vw',
                borderRadius: '0.375rem',
                border: `1.5px solid ${showFeedback && inputs.selectedNode !== 'Điểm giữa kỳ' ? 'var(--error)' : showFeedback ? 'var(--success)' : 'var(--border-color)'}`,
                fontSize: isSlideshow ? '1.8vh' : '0.85rem',
                outline: 'none',
                background: '#ffffff',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                width: isSlideshow ? '100%' : 'auto',
                maxWidth: isSlideshow ? '220px' : 'none'
              }}
              value={inputs.selectedNode}
              onChange={(e) => setInputs({ ...inputs, selectedNode: e.target.value })}
              disabled={isRevealed}
            >
              <option value="">-- Chọn thuộc tính --</option>
              <option value="Điểm giữa kỳ">Điểm giữa kỳ</option>
              <option value="Làm bài tập">Làm bài tập</option>
            </select>
            {getStatusIndicator('selectedNode', inputs.selectedNode)}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '0.5vh' }}>
          <button
            type="button"
            className="btn primary btn-sm"
            onClick={handleCheck}
            style={{ padding: '0.6vh 1.5vw', fontSize: isSlideshow ? '1.8vh' : '0.85rem', fontWeight: 'bold' }}
          >
            Check kết quả
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={handleReset}
            style={{ padding: '0.6vh 1.5vw', fontSize: isSlideshow ? '1.8vh' : '0.85rem', fontWeight: 'bold' }}
            disabled={isRevealed}
          >
            Làm lại
          </button>
          {isTeacher && !isRevealed && (
            <button
              type="button"
              className="btn btn-sm"
              style={{ background: 'var(--warning)', color: '#ffffff', borderColor: 'var(--warning)', padding: '0.6vh 1.5vw', fontSize: isSlideshow ? '1.8vh' : '0.85rem', fontWeight: 'bold' }}
              onClick={onReveal}
            >
              👁️ Hiện đáp án & Thêm nút
            </button>
          )}
        </div>

        {showFeedback && (
          <div style={{
            padding: '1vh 1.5vw',
            borderRadius: '0.5rem',
            background: isFieldCorrect('selectedNode', inputs.selectedNode) ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
            border: `1px solid ${isFieldCorrect('selectedNode', inputs.selectedNode) ? 'var(--success-border)' : 'var(--error-border)'}`,
            color: isFieldCorrect('selectedNode', inputs.selectedNode) ? 'var(--success-text)' : 'var(--error-text)',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: isSlideshow ? '1.7vh' : '0.85rem',
            animation: 'fadeIn 0.25s ease-out'
          }}>
            {isFieldCorrect('selectedNode', inputs.selectedNode)
              ? '🎉 Chính xác! Nút quyết định tiếp theo tại nhánh Đi học đủ là Điểm giữa kỳ.'
              : '❌ Chưa chính xác. Gợi ý: Hãy tính số vectơ đơn vị của từng thuộc tính.'}
          </div>
        )}
      </div>
    </div>
  );
}

function ElaborateActivity1Part2({ isTeacher, isRevealed, isSlideshow, onReveal }) {
  const [inputs, setInputs] = useState({
    baiTapYesVector: '',
    baiTapYesIsUnit: null,
    baiTapNoVector: '',
    baiTapNoIsUnit: null,
    selectedNode: ''
  });
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (isRevealed) {
      setInputs({
        baiTapYesVector: '(0/2, 2/2, 0/2)',
        baiTapYesIsUnit: true,
        baiTapNoVector: '(0/2, 0/2, 2/2)',
        baiTapNoIsUnit: true,
        selectedNode: 'Làm bài tập'
      });
      setShowFeedback(true);
    } else {
      setInputs({
        baiTapYesVector: '',
        baiTapYesIsUnit: null,
        baiTapNoVector: '',
        baiTapNoIsUnit: null,
        selectedNode: ''
      });
      setShowFeedback(false);
    }
  }, [isRevealed]);

  const correct = {
    baiTapYesVector: '0/2,2/2,0/2',
    baiTapYesIsUnit: true,
    baiTapNoVector: '0/2,0/2,2/2',
    baiTapNoIsUnit: true,
    selectedNode: 'Làm bài tập'
  };

  const handleCheck = () => {
    setShowFeedback(true);
  };

  const handleReset = () => {
    setInputs({
      baiTapYesVector: '',
      baiTapYesIsUnit: null,
      baiTapNoVector: '',
      baiTapNoIsUnit: null,
      selectedNode: ''
    });
    setShowFeedback(false);
  };

  const normalize = (str) => {
    if (!str) return '';
    let clean = str.replace(/[()]/g, '').trim();
    clean = clean.replace(/[\s,]+/g, ',');
    return clean;
  };

  const isFieldCorrect = (field, val) => {
    if (field.endsWith('IsUnit')) {
      return val === correct[field];
    }
    if (field === 'selectedNode') {
      return val.trim().toLowerCase() === correct.selectedNode.toLowerCase();
    }
    return normalize(val) === correct[field];
  };

  const getStatusIndicator = (field, val) => {
    if (!showFeedback) return null;
    if (val === '' || val === null) return <span style={{ color: 'var(--error)', marginLeft: '0.5rem', fontSize: '0.85rem' }}>❌ Trống</span>;
    return isFieldCorrect(field, val)
      ? <span style={{ color: 'var(--success)', fontWeight: 'bold', marginLeft: '0.5rem', fontSize: '0.85rem' }}>✅ Đúng</span>
      : <span style={{ color: 'var(--error)', fontWeight: 'bold', marginLeft: '0.5rem', fontSize: '0.85rem' }}>❌ Sai</span>;
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5vh 1.5vw',
    marginTop: '1vh',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto'
  };

  const cardStyle = {
    background: '#ffffff',
    border: '1.5px solid var(--border-color)',
    borderRadius: '0.75rem',
    padding: '1.5vh 1.5vw',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2vh'
  };

  const labelStyle = {
    fontWeight: 'bold',
    fontSize: isSlideshow ? '1.8vh' : '0.85rem',
    color: 'var(--text-primary)'
  };

  const inputStyle = (field, val) => {
    const isErr = showFeedback && (val === '' || val === null || !isFieldCorrect(field, val));
    const isOk = showFeedback && val !== '' && val !== null && isFieldCorrect(field, val);
    return {
      padding: '0.5vh 0.6vw',
      borderRadius: '0.375rem',
      border: `1.5px solid ${isErr ? 'var(--error)' : isOk ? 'var(--success)' : 'var(--border-color)'}`,
      outline: 'none',
      fontSize: isSlideshow ? '1.8vh' : '0.85rem',
      width: '130px',
      boxSizing: 'border-box',
      background: isErr ? 'var(--error-bg)' : isOk ? 'var(--success-bg)' : '#ffffff',
      color: isErr ? 'var(--error-text)' : isOk ? 'var(--success-text)' : 'var(--text-primary)',
      transition: 'all 0.2s ease'
    };
  };

  const btnToggleStyle = (field, val, currentVal) => {
    const isSelected = val === currentVal;
    let bg = isSelected ? 'var(--primary)' : '#f1f5f9';
    let color = isSelected ? '#ffffff' : 'var(--text-secondary)';
    let border = '1px solid var(--border-color)';

    if (showFeedback && isSelected) {
      const isOk = isFieldCorrect(field, currentVal);
      bg = isOk ? 'var(--success)' : 'var(--error)';
      color = '#ffffff';
      border = `1px solid ${isOk ? 'var(--success)' : 'var(--error)'}`;
    }

    return {
      padding: '0.3vh 0.8vw',
      borderRadius: '0.25rem',
      border,
      background: bg,
      color,
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: isSlideshow ? '1.6vh' : '0.8rem',
      transition: 'all 0.15s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5vh',
      width: '100%',
      textAlign: 'left',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* Cột trái: Nhập vectơ */}
      <div style={{
        flex: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8vh',
        width: '100%',
        maxWidth: '580px'
      }}>
        <p style={{ fontSize: isSlideshow ? '1.8vh' : '0.9rem', margin: '0 0 0.5vh 0', color: 'var(--text-secondary)', textAlign: isSlideshow ? 'left' : 'center' }}>
          Khảo sát dữ liệu tại nhánh <strong>Đi học đủ ➔ Điểm giữa kỳ &lt; 5</strong>. Xác định giá trị nhãn và tính toán <strong>Vectơ (G, T, K)</strong> có dạng <strong>(số G/tổng, số T/tổng, số K/tổng)</strong>.
        </p>

        <div style={containerStyle}>
          {/* Làm bài tập Card */}
          <div style={cardStyle}>
            <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: isSlideshow ? '2vh' : '0.9rem', fontWeight: '800', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.5vh', textAlign: 'center' }}>
              🔍 Khảo sát thuộc tính: Làm bài tập
            </h4>

            {/* Branch Có */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4vh' }}>
              <span style={labelStyle}>Nhánh: Làm bài tập = Có (Mẫu 4, 5)</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: isSlideshow ? '1.6vh' : '0.8rem', color: 'var(--text-secondary)' }}>Nhãn:</span>
                <span style={{ background: '#f1f5f9', padding: '0.2vh 0.5vw', borderRadius: '0.25rem', fontWeight: 'bold', fontSize: isSlideshow ? '1.6vh' : '0.8rem' }}>T, T</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5vw', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Nhập giá trị vectơ ở đây"
                  style={inputStyle('baiTapYesVector', inputs.baiTapYesVector)}
                  value={inputs.baiTapYesVector}
                  onChange={(e) => setInputs({ ...inputs, baiTapYesVector: e.target.value })}
                  disabled={isRevealed}
                />
                <span style={{ fontSize: isSlideshow ? '1.6vh' : '0.8rem', color: 'var(--text-secondary)' }}>Đơn vị?</span>
                <button
                  type="button"
                  style={btnToggleStyle('baiTapYesIsUnit', true, inputs.baiTapYesIsUnit)}
                  onClick={() => !isRevealed && setInputs({ ...inputs, baiTapYesIsUnit: true })}
                >Có</button>
                <button
                  type="button"
                  style={btnToggleStyle('baiTapYesIsUnit', false, inputs.baiTapYesIsUnit)}
                  onClick={() => !isRevealed && setInputs({ ...inputs, baiTapYesIsUnit: false })}
                >Không</button>
                {getStatusIndicator('baiTapYesVector', inputs.baiTapYesVector)}
                {getStatusIndicator('baiTapYesIsUnit', inputs.baiTapYesIsUnit)}
              </div>
            </div>

            {/* Branch Không */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4vh', marginTop: '0.5vh' }}>
              <span style={labelStyle}>Nhánh: Làm bài tập = Không (Mẫu 6, 16)</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: isSlideshow ? '1.6vh' : '0.8rem', color: 'var(--text-secondary)' }}>Nhãn:</span>
                <span style={{ background: '#f1f5f9', padding: '0.2vh 0.5vw', borderRadius: '0.25rem', fontWeight: 'bold', fontSize: isSlideshow ? '1.6vh' : '0.8rem' }}>K, K</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5vw', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Nhập giá trị vectơ ở đây"
                  style={inputStyle('baiTapNoVector', inputs.baiTapNoVector)}
                  value={inputs.baiTapNoVector}
                  onChange={(e) => setInputs({ ...inputs, baiTapNoVector: e.target.value })}
                  disabled={isRevealed}
                />
                <span style={{ fontSize: isSlideshow ? '1.6vh' : '0.8rem', color: 'var(--text-secondary)' }}>Đơn vị?</span>
                <button
                  type="button"
                  style={btnToggleStyle('baiTapNoIsUnit', true, inputs.baiTapNoIsUnit)}
                  onClick={() => !isRevealed && setInputs({ ...inputs, baiTapNoIsUnit: true })}
                >Có</button>
                <button
                  type="button"
                  style={btnToggleStyle('baiTapNoIsUnit', false, inputs.baiTapNoIsUnit)}
                  onClick={() => !isRevealed && setInputs({ ...inputs, baiTapNoIsUnit: false })}
                >Không</button>
                {getStatusIndicator('baiTapNoVector', inputs.baiTapNoVector)}
                {getStatusIndicator('baiTapNoIsUnit', inputs.baiTapNoIsUnit)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cột phải: Chọn nút & Buttons */}
      <div style={{
        flex: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2vh',
        width: '100%',
        maxWidth: '580px',
        alignItems: 'stretch'
      }}>
        {/* Decision Node Selector */}
        <div style={{
          ...cardStyle,
          flexDirection: isSlideshow ? 'column' : 'row',
          alignItems: isSlideshow ? 'stretch' : 'center',
          justifyContent: 'space-between',
          padding: '1.2vh 1.5vw',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(99, 102, 241, 0.05) 100%)',
          border: '1.5px solid rgba(99, 102, 241, 0.15)',
          marginTop: '0.5vh',
          maxWidth: '100%',
          margin: '0.5vh auto 0 auto',
          width: '100%'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2vh', textAlign: isSlideshow ? 'center' : 'left', marginBottom: isSlideshow ? '0.5vh' : '0' }}>
            <span style={{ fontWeight: '800', fontSize: isSlideshow ? '1.9vh' : '0.9rem', color: 'var(--primary)' }}>
              🎯 Chọn nút quyết định tiếp theo:
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.5vw', alignItems: 'center', justifyContent: isSlideshow ? 'center' : 'flex-end' }}>
            <select
              style={{
                padding: '0.5vh 0.8vw',
                borderRadius: '0.375rem',
                border: `1.5px solid ${showFeedback && inputs.selectedNode !== 'Làm bài tập' ? 'var(--error)' : showFeedback ? 'var(--success)' : 'var(--border-color)'}`,
                fontSize: isSlideshow ? '1.8vh' : '0.85rem',
                outline: 'none',
                background: '#ffffff',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                width: isSlideshow ? '100%' : 'auto',
                maxWidth: isSlideshow ? '220px' : 'none'
              }}
              value={inputs.selectedNode}
              onChange={(e) => setInputs({ ...inputs, selectedNode: e.target.value })}
              disabled={isRevealed}
            >
              <option value="">-- Chọn thuộc tính --</option>
              <option value="Điểm giữa kỳ">Điểm giữa kỳ</option>
              <option value="Làm bài tập">Làm bài tập</option>
            </select>
            {getStatusIndicator('selectedNode', inputs.selectedNode)}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '0.5vh' }}>
          <button
            type="button"
            className="btn primary btn-sm"
            onClick={handleCheck}
            style={{ padding: '0.6vh 1.5vw', fontSize: isSlideshow ? '1.8vh' : '0.85rem', fontWeight: 'bold' }}
          >
            Check kết quả
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={handleReset}
            style={{ padding: '0.6vh 1.5vw', fontSize: isSlideshow ? '1.8vh' : '0.85rem', fontWeight: 'bold' }}
            disabled={isRevealed}
          >
            Làm lại
          </button>
          {isTeacher && !isRevealed && (
            <button
              type="button"
              className="btn btn-sm"
              style={{ background: 'var(--warning)', color: '#ffffff', borderColor: 'var(--warning)', padding: '0.6vh 1.5vw', fontSize: isSlideshow ? '1.8vh' : '0.85rem', fontWeight: 'bold' }}
              onClick={onReveal}
            >
              👁️ Hiện đáp án & Thêm nút
            </button>
          )}
        </div>

        {showFeedback && (
          <div style={{
            padding: '1vh 1.5vw',
            borderRadius: '0.5rem',
            background: isFieldCorrect('selectedNode', inputs.selectedNode) ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
            border: `1px solid ${isFieldCorrect('selectedNode', inputs.selectedNode) ? 'var(--success-border)' : 'var(--error-border)'}`,
            color: isFieldCorrect('selectedNode', inputs.selectedNode) ? 'var(--success-text)' : 'var(--error-text)',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: isSlideshow ? '1.7vh' : '0.85rem',
            animation: 'fadeIn 0.25s ease-out'
          }}>
            {isFieldCorrect('selectedNode', inputs.selectedNode)
              ? '🎉 Chính xác! Nút quyết định tiếp theo tại nhánh Đi học đủ ➔ Điểm giữa kỳ < 5 là Làm bài tập.'
              : '❌ Chưa chính xác. Gợi ý: Tại nhánh con này, thuộc tính Làm bài tập phân tách hoàn hảo các mẫu thành (T, T) và (K, K) - cả hai đều là vectơ đơn vị.'}
          </div>
        )}
      </div>
    </div>
  );
}

function ElaborateActivity2({ isTeacher, isRevealed, isSlideshow, onReveal }) {
  const [inputs, setInputs] = useState({
    diemGkOver5Vector: '',
    diemGkOver5IsUnit: null,
    diemGkUnder5Vector: '',
    diemGkUnder5IsUnit: null,
    selectedNode: ''
  });
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (isRevealed) {
      setInputs({
        diemGkOver5Vector: '(0/2, 2/2, 0/2)',
        diemGkOver5IsUnit: true,
        diemGkUnder5Vector: '(0/2, 0/2, 2/2)',
        diemGkUnder5IsUnit: true,
        selectedNode: 'Điểm giữa kỳ'
      });
      setShowFeedback(true);
    } else {
      setInputs({
        diemGkOver5Vector: '',
        diemGkOver5IsUnit: null,
        diemGkUnder5Vector: '',
        diemGkUnder5IsUnit: null,
        selectedNode: ''
      });
      setShowFeedback(false);
    }
  }, [isRevealed]);

  const correct = {
    diemGkOver5Vector: '0/2,2/2,0/2',
    diemGkOver5IsUnit: true,
    diemGkUnder5Vector: '0/2,0/2,2/2',
    diemGkUnder5IsUnit: true,
    selectedNode: 'Điểm giữa kỳ'
  };

  const handleCheck = () => {
    setShowFeedback(true);
  };

  const handleReset = () => {
    setInputs({
      diemGkOver5Vector: '',
      diemGkOver5IsUnit: null,
      diemGkUnder5Vector: '',
      diemGkUnder5IsUnit: null,
      selectedNode: ''
    });
    setShowFeedback(false);
  };

  const normalize = (str) => {
    if (!str) return '';
    let clean = str.replace(/[()]/g, '').trim();
    clean = clean.replace(/[\s,]+/g, ',');
    return clean;
  };

  const isFieldCorrect = (field, val) => {
    if (field.endsWith('IsUnit')) {
      return val === correct[field];
    }
    if (field === 'selectedNode') {
      return val.trim().toLowerCase() === correct.selectedNode.toLowerCase();
    }
    return normalize(val) === correct[field];
  };

  const getStatusIndicator = (field, val) => {
    if (!showFeedback) return null;
    if (val === '' || val === null) return <span style={{ color: 'var(--error)', marginLeft: '0.5rem', fontSize: '0.85rem' }}>❌ Trống</span>;
    return isFieldCorrect(field, val)
      ? <span style={{ color: 'var(--success)', fontWeight: 'bold', marginLeft: '0.5rem', fontSize: '0.85rem' }}>✅ Đúng</span>
      : <span style={{ color: 'var(--error)', fontWeight: 'bold', marginLeft: '0.5rem', fontSize: '0.85rem' }}>❌ Sai</span>;
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5vh 1.5vw',
    marginTop: '1vh',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto'
  };

  const cardStyle = {
    background: '#ffffff',
    border: '1.5px solid var(--border-color)',
    borderRadius: '0.75rem',
    padding: '1.5vh 1.5vw',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2vh'
  };

  const labelStyle = {
    fontWeight: 'bold',
    fontSize: isSlideshow ? '1.8vh' : '0.85rem',
    color: 'var(--text-primary)'
  };

  const inputStyle = (field, val) => {
    const isErr = showFeedback && (val === '' || val === null || !isFieldCorrect(field, val));
    const isOk = showFeedback && val !== '' && val !== null && isFieldCorrect(field, val);
    return {
      padding: '0.5vh 0.6vw',
      borderRadius: '0.375rem',
      border: `1.5px solid ${isErr ? 'var(--error)' : isOk ? 'var(--success)' : 'var(--border-color)'}`,
      outline: 'none',
      fontSize: isSlideshow ? '1.8vh' : '0.85rem',
      width: '130px',
      boxSizing: 'border-box',
      background: isErr ? 'var(--error-bg)' : isOk ? 'var(--success-bg)' : '#ffffff',
      color: isErr ? 'var(--error-text)' : isOk ? 'var(--success-text)' : 'var(--text-primary)',
      transition: 'all 0.2s ease'
    };
  };

  const btnToggleStyle = (field, val, currentVal) => {
    const isSelected = val === currentVal;
    let bg = isSelected ? 'var(--primary)' : '#f1f5f9';
    let color = isSelected ? '#ffffff' : 'var(--text-secondary)';
    let border = '1px solid var(--border-color)';

    if (showFeedback && isSelected) {
      const isOk = isFieldCorrect(field, currentVal);
      bg = isOk ? 'var(--success)' : 'var(--error)';
      color = '#ffffff';
      border = `1px solid ${isOk ? 'var(--success)' : 'var(--error)'}`;
    }

    return {
      padding: '0.3vh 0.8vw',
      borderRadius: '0.25rem',
      border,
      background: bg,
      color,
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: isSlideshow ? '1.6vh' : '0.8rem',
      transition: 'all 0.15s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5vh',
      width: '100%',
      textAlign: 'left',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* Cột trái: Nhập vectơ */}
      <div style={{
        flex: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8vh',
        width: '100%',
        maxWidth: '580px'
      }}>
        <p style={{ fontSize: isSlideshow ? '1.8vh' : '0.9rem', margin: '0 0 0.5vh 0', color: 'var(--text-secondary)', textAlign: isSlideshow ? 'left' : 'center' }}>
          Khảo sát dữ liệu tại nhánh <strong>Chuyên cần = Thỉnh thoảng vắng</strong>. Xác định giá trị nhãn và tính toán <strong>Vectơ (G, T, K)</strong> có dạng <strong>(số G/tổng, số T/tổng, số K/tổng)</strong>.
        </p>

        <div style={containerStyle}>
          {/* Điểm giữa kỳ Card */}
          <div style={cardStyle}>
            <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: isSlideshow ? '2vh' : '0.9rem', fontWeight: '800', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.5vh', textAlign: 'center' }}>
              🔍 Khảo sát thuộc tính: Điểm giữa kỳ
            </h4>

            {/* Branch >= 5 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4vh' }}>
              <span style={labelStyle}>Nhánh: Điểm giữa kỳ ≥ 5 (Mẫu 7, 8)</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: isSlideshow ? '1.6vh' : '0.8rem', color: 'var(--text-secondary)' }}>Nhãn:</span>
                <span style={{ background: '#f1f5f9', padding: '0.2vh 0.5vw', borderRadius: '0.25rem', fontWeight: 'bold', fontSize: isSlideshow ? '1.6vh' : '0.8rem' }}>T, T</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5vw', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Nhập giá trị vectơ ở đây"
                  style={inputStyle('diemGkOver5Vector', inputs.diemGkOver5Vector)}
                  value={inputs.diemGkOver5Vector}
                  onChange={(e) => setInputs({ ...inputs, diemGkOver5Vector: e.target.value })}
                  disabled={isRevealed}
                />
                <span style={{ fontSize: isSlideshow ? '1.6vh' : '0.8rem', color: 'var(--text-secondary)' }}>Đơn vị?</span>
                <button
                  type="button"
                  style={btnToggleStyle('diemGkOver5IsUnit', true, inputs.diemGkOver5IsUnit)}
                  onClick={() => !isRevealed && setInputs({ ...inputs, diemGkOver5IsUnit: true })}
                >Có</button>
                <button
                  type="button"
                  style={btnToggleStyle('diemGkOver5IsUnit', false, inputs.diemGkOver5IsUnit)}
                  onClick={() => !isRevealed && setInputs({ ...inputs, diemGkOver5IsUnit: false })}
                >Không</button>
                {getStatusIndicator('diemGkOver5Vector', inputs.diemGkOver5Vector)}
                {getStatusIndicator('diemGkOver5IsUnit', inputs.diemGkOver5IsUnit)}
              </div>
            </div>

            {/* Branch < 5 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4vh', marginTop: '0.5vh' }}>
              <span style={labelStyle}>Nhánh: Điểm giữa kỳ &lt; 5 (Mẫu 9, 10)</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: isSlideshow ? '1.6vh' : '0.8rem', color: 'var(--text-secondary)' }}>Nhãn:</span>
                <span style={{ background: '#f1f5f9', padding: '0.2vh 0.5vw', borderRadius: '0.25rem', fontWeight: 'bold', fontSize: isSlideshow ? '1.6vh' : '0.8rem' }}>K, K</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5vw', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Nhập giá trị vectơ ở đây"
                  style={inputStyle('diemGkUnder5Vector', inputs.diemGkUnder5Vector)}
                  value={inputs.diemGkUnder5Vector}
                  onChange={(e) => setInputs({ ...inputs, diemGkUnder5Vector: e.target.value })}
                  disabled={isRevealed}
                />
                <span style={{ fontSize: isSlideshow ? '1.6vh' : '0.8rem', color: 'var(--text-secondary)' }}>Đơn vị?</span>
                <button
                  type="button"
                  style={btnToggleStyle('diemGkUnder5IsUnit', true, inputs.diemGkUnder5IsUnit)}
                  onClick={() => !isRevealed && setInputs({ ...inputs, diemGkUnder5IsUnit: true })}
                >Có</button>
                <button
                  type="button"
                  style={btnToggleStyle('diemGkUnder5IsUnit', false, inputs.diemGkUnder5IsUnit)}
                  onClick={() => !isRevealed && setInputs({ ...inputs, diemGkUnder5IsUnit: false })}
                >Không</button>
                {getStatusIndicator('diemGkUnder5Vector', inputs.diemGkUnder5Vector)}
                {getStatusIndicator('diemGkUnder5IsUnit', inputs.diemGkUnder5IsUnit)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cột phải: Chọn nút & Buttons */}
      <div style={{
        flex: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2vh',
        width: '100%',
        maxWidth: '580px',
        alignItems: 'stretch'
      }}>
        {/* Decision Node Selector */}
        <div style={{
          ...cardStyle,
          flexDirection: isSlideshow ? 'column' : 'row',
          alignItems: isSlideshow ? 'stretch' : 'center',
          justifyContent: 'space-between',
          padding: '1.2vh 1.5vw',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(99, 102, 241, 0.05) 100%)',
          border: '1.5px solid rgba(99, 102, 241, 0.15)',
          marginTop: '0.5vh',
          maxWidth: '100%',
          margin: '0.5vh auto 0 auto',
          width: '100%'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2vh', textAlign: isSlideshow ? 'center' : 'left', marginBottom: isSlideshow ? '0.5vh' : '0' }}>
            <span style={{ fontWeight: '800', fontSize: isSlideshow ? '1.9vh' : '0.9rem', color: 'var(--primary)' }}>
              🎯 Chọn nút quyết định tiếp theo:
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.5vw', alignItems: 'center', justifyContent: isSlideshow ? 'center' : 'flex-end' }}>
            <select
              style={{
                padding: '0.5vh 0.8vw',
                borderRadius: '0.375rem',
                border: `1.5px solid ${showFeedback && inputs.selectedNode !== 'Điểm giữa kỳ' ? 'var(--error)' : showFeedback ? 'var(--success)' : 'var(--border-color)'}`,
                fontSize: isSlideshow ? '1.8vh' : '0.85rem',
                outline: 'none',
                background: '#ffffff',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                width: isSlideshow ? '100%' : 'auto',
                maxWidth: isSlideshow ? '220px' : 'none'
              }}
              value={inputs.selectedNode}
              onChange={(e) => setInputs({ ...inputs, selectedNode: e.target.value })}
              disabled={isRevealed}
            >
              <option value="">-- Chọn thuộc tính --</option>
              <option value="Điểm giữa kỳ">Điểm giữa kỳ</option>
              <option value="Làm bài tập">Làm bài tập</option>
            </select>
            {getStatusIndicator('selectedNode', inputs.selectedNode)}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '0.5vh' }}>
          <button
            type="button"
            className="btn primary btn-sm"
            onClick={handleCheck}
            style={{ padding: '0.6vh 1.5vw', fontSize: isSlideshow ? '1.8vh' : '0.85rem', fontWeight: 'bold' }}
          >
            Check kết quả
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={handleReset}
            style={{ padding: '0.6vh 1.5vw', fontSize: isSlideshow ? '1.8vh' : '0.85rem', fontWeight: 'bold' }}
            disabled={isRevealed}
          >
            Làm lại
          </button>
          {isTeacher && !isRevealed && (
            <button
              type="button"
              className="btn btn-sm"
              style={{ background: 'var(--warning)', color: '#ffffff', borderColor: 'var(--warning)', padding: '0.6vh 1.5vw', fontSize: isSlideshow ? '1.8vh' : '0.85rem', fontWeight: 'bold' }}
              onClick={onReveal}
            >
              👁️ Hiện đáp án & Hoàn thiện cây
            </button>
          )}
        </div>

        {showFeedback && (
          <div style={{
            padding: '1vh 1.5vw',
            borderRadius: '0.5rem',
            background: isFieldCorrect('selectedNode', inputs.selectedNode) ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
            border: `1px solid ${isFieldCorrect('selectedNode', inputs.selectedNode) ? 'var(--success-border)' : 'var(--error-border)'}`,
            color: isFieldCorrect('selectedNode', inputs.selectedNode) ? 'var(--success-text)' : 'var(--error-text)',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: isSlideshow ? '1.7vh' : '0.85rem',
            animation: 'fadeIn 0.25s ease-out'
          }}>
            {isFieldCorrect('selectedNode', inputs.selectedNode)
              ? '🎉 Chính xác! Nút quyết định tiếp theo tại nhánh Thỉnh thoảng vắng là Điểm giữa kỳ (tạo ra 2 vectơ đơn vị giúp phân lớp hoàn toàn).'
              : '❌ Chưa chính xác. Gợi ý: Tại nhánh này Điểm giữa kỳ phân tách hoàn hảo thành (T, T) và (K, K) - cả hai đều là vectơ đơn vị.'}
          </div>
        )}
      </div>
    </div>
  );
}

const getTreeState = (slide, isRevealed) => {
  if (!slide) return 'full';
  if (typeof slide.treeState === 'function') {
    return slide.treeState(isRevealed);
  }
  return slide.treeState;
};

function App() {

  const [user, setUser] = useState(null);
  const isTeacher = user?.role === 'teacher';
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Real-time synchronization classroom state
  const [classState, setClassState] = useState({
    activeStage: 'engage',
    activeSlideIndex: 0,
    activeQuestionIndex: 0,
    slideshowActive: false,
    scores: { group1: 0, group2: 0 },
    exploreRecord: null,
    isRevealed: false,
    evaluateAnswers: {}
  });

  const [ws, setWs] = useState(null);
  const [dataset, setDataset] = useState(null);
  const [demoAccounts, setDemoAccounts] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [glowEffects, setGlowEffects] = useState([]);

  // Listen to score changes to trigger glow effects
  const prevScoresRef = useRef(null);
  useEffect(() => {
    if (!prevScoresRef.current) {
      prevScoresRef.current = { ...classState.scores };
      return;
    }

    const prevScores = prevScoresRef.current;
    const currentScores = classState.scores;

    ['group1', 'group2'].forEach(team => {
      const diff = (currentScores[team] || 0) - (prevScores[team] || 0);
      if (diff > 0) {
        const id = Date.now() + Math.random();
        setGlowEffects(prev => [...prev, { id, team, amount: diff }]);
        setTimeout(() => {
          setGlowEffects(prev => prev.filter(g => g.id !== id));
        }, 1000);
      }
    });

    prevScoresRef.current = { ...currentScores };
  }, [classState.scores]);

  const currentSlide = SLIDES[classState.activeSlideIndex] || SLIDES[0];
  const hasContent = !!(
    (currentSlide.type === 'content' && currentSlide.content) ||
    currentSlide.type === 'question' ||
    currentSlide.type === 'explore-game' ||
    currentSlide.type === 'elaborate-h1' ||
    currentSlide.type === 'elaborate-h1-2' ||
    currentSlide.type === 'elaborate-h2' ||
    currentSlide.type === 'vector-visualizer' ||
    currentSlide.type === 'evaluate-stats'
  );

  // Load dataset and demo users list for easy login help
  useEffect(() => {
    fetch('/api/dataset')
      .then(res => res.json())
      .then(data => setDataset(data))
      .catch(err => console.error('Error fetching dataset:', err));

    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        if (data && data.rows) {
          setDemoAccounts(data.rows);
        }
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  // WebSocket Sync Connection
  useEffect(() => {
    let socket;
    const connect = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      socket = new WebSocket(`${protocol}//${window.location.hostname}:5000`);

      socket.onopen = () => {
        console.log('WS synchronization channel opened');
        setWs(socket);
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'STATE_UPDATE') {
          setClassState(message.state);
          if (message.onlineUsers) {
            setOnlineUsers(message.onlineUsers);
          }
        }
      };

      socket.onclose = () => {
        console.log('WS connection lost. Reconnecting in 3s...');
        setWs(null);
        setTimeout(connect, 3000);
      };
    };

    connect();
    return () => socket && socket.close();
  }, []);

  // Identify user on connection / user state changes
  useEffect(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      if (user) {
        ws.send(JSON.stringify({
          type: 'USER_IDENTIFY',
          user: {
            username: user.username,
            fullname: user.fullname,
            role: user.role,
            group: user.group
          }
        }));
      } else {
        ws.send(JSON.stringify({
          type: 'USER_IDENTIFY',
          user: null
        }));
      }
    }
  }, [ws, user]);

  // Fullscreen state listeners
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const goFullscreen = () => {
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch((err) => console.log('Request fullscreen failed:', err));
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen().catch((err) => console.log('Request fullscreen failed:', err));
    } else if (docEl.mozRequestFullScreen) {
      docEl.mozRequestFullScreen().catch((err) => console.log('Request fullscreen failed:', err));
    } else if (docEl.msRequestFullscreen) {
      docEl.msRequestFullscreen().catch((err) => console.log('Request fullscreen failed:', err));
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => console.log('Exit fullscreen failed:', err));
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen().catch((err) => console.log('Exit fullscreen failed:', err));
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen().catch((err) => console.log('Exit fullscreen failed:', err));
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen().catch((err) => console.log('Exit fullscreen failed:', err));
    }
  };

  // Sync fullscreen state with slideshow state
  useEffect(() => {
    if (classState.slideshowActive) {
      const timer = setTimeout(() => {
        const isCurrentlyFullscreen = !!(
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
        );
        if (!isCurrentlyFullscreen) {
          goFullscreen();
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      if (isCurrentlyFullscreen) {
        exitFullscreen();
      }
    }
  }, [classState.slideshowActive]);

  // GV control state updates helper
  const sendStateUpdate = (updatedFields) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'TEACHER_UPDATE_STATE',
        state: { ...classState, ...updatedFields }
      }));
    }
  };

  const submitStudentAnswer = (questionId, selectedIdx) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'STUDENT_SUBMIT_ANSWER',
        username: user.username,
        fullname: user.fullname,
        questionId,
        selected: selectedIdx
      }));
    }
  };

  const renderInteractiveOptions = (question, isSlideshow = false) => {
    const isEvaluate = currentSlide.stage === 'evaluate';
    const isRevealed = classState.isRevealed;
    const correctIdx = question.correct;

    // Check if it is an essay question (has essayAnswer)
    if (question.essayAnswer) {
      if (!isRevealed) {
        return (
          <div style={{
            background: 'var(--bg-card)',
            border: '1.5px dashed var(--border-color)',
            borderRadius: '0.75rem',
            padding: isSlideshow ? '3vh' : '1.5rem',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: isSlideshow ? '2.2vh' : '1rem',
            fontWeight: 'bold',
            marginTop: '1.5vh'
          }}>
            💬 Câu hỏi thảo luận tự luận. Hãy suy nghĩ và phát biểu ý kiến trước lớp!
          </div>
        );
      } else {
        return (
          <div style={{
            background: 'var(--success-bg)',
            border: '1.5px solid var(--success)',
            borderRadius: '0.75rem',
            padding: isSlideshow ? '2.5vh 4vw' : '1.25rem 2rem',
            marginTop: '1.5vh',
            color: 'var(--success-text)',
            fontWeight: 'bold',
            fontSize: isSlideshow ? '2.6vh' : '1.15rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
            animation: 'fadeIn 0.5s ease'
          }}>
            🎯 Đáp án: {question.essayAnswer}
          </div>
        );
      }
    }

    // Read student selection from synced classState
    const studentSubmission = classState.studentSubmissions?.[question.id]?.[user.username];
    const studentSelectedIdx = studentSubmission !== undefined ? studentSubmission.selected : null;

    if (isEvaluate && !isTeacher) {
      // Student Interactive Answering Mode
      if (!isRevealed) {
        return (
          <div className="quiz-options-grid" style={{ marginTop: '1.5vh' }}>
            {question.options.map((opt, oIdx) => {
              const isCurrentSelection = studentSelectedIdx === oIdx;

              return (
                <button
                  key={oIdx}
                  type="button"
                  className="quiz-option-stats"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    cursor: 'pointer',
                    background: isCurrentSelection ? 'var(--primary-light)' : '#ffffff',
                    borderColor: isCurrentSelection ? 'var(--primary)' : 'var(--border-color)',
                    color: isCurrentSelection ? 'var(--primary-hover)' : 'var(--text-primary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: isSlideshow ? '1.2vh 1.8vw' : '0.75rem 1rem',
                    fontSize: isSlideshow ? '2.2vh' : '1rem',
                    fontWeight: '600',
                    transition: 'all 0.25s ease'
                  }}
                  onClick={() => submitStudentAnswer(question.id, oIdx)}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                      className="option-letter"
                      style={{
                        marginRight: '0.5rem',
                        background: isCurrentSelection ? 'var(--primary)' : '#f1f5f9',
                        color: isCurrentSelection ? 'white' : 'var(--text-secondary)',
                        width: isSlideshow ? '3.5vh' : '28px',
                        height: isSlideshow ? '3.5vh' : '28px',
                        fontSize: isSlideshow ? '1.8vh' : '0.85rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%'
                      }}
                    >
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    {opt}
                  </div>
                  {isCurrentSelection && <span style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>Đã chọn 🎯</span>}
                </button>
              );
            })}
          </div>
        );
      } else {
        // Answer Revealed for Student
        const isStudentCorrect = studentSelectedIdx === correctIdx;

        return (
          <div className="quiz-options-grid" style={{ marginTop: '1.5vh' }}>
            {question.options.map((opt, oIdx) => {
              const isCorrect = oIdx === correctIdx;
              const isSelected = oIdx === studentSelectedIdx;

              let bg = '#ffffff';
              let border = 'var(--border-color)';
              let color = 'var(--text-primary)';
              let suffix = null;

              if (isCorrect) {
                bg = 'var(--success-bg)';
                border = 'var(--success)';
                color = 'var(--success-text)';
                suffix = <span style={{ color: 'var(--success)' }}>✓ Đáp án đúng</span>;
              } else if (isSelected && !isStudentCorrect) {
                bg = 'var(--error-bg)';
                border = 'var(--error)';
                color = 'var(--error-text)';
                suffix = <span style={{ color: 'var(--error)' }}>✗ Lựa chọn của bạn</span>;
              }

              return (
                <div
                  key={oIdx}
                  className="quiz-option-stats"
                  style={{
                    background: bg,
                    borderColor: border,
                    color: color,
                    padding: isSlideshow ? '1.2vh 1.8vw' : '0.75rem 1rem',
                    fontSize: isSlideshow ? '2.2vh' : '1rem',
                    fontWeight: '600'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                      className="option-letter"
                      style={{
                        marginRight: '0.5rem',
                        background: isCorrect ? 'var(--success)' : isSelected ? 'var(--error)' : '#f1f5f9',
                        color: isCorrect || isSelected ? 'white' : 'var(--text-secondary)',
                        width: isSlideshow ? '3.5vh' : '28px',
                        height: isSlideshow ? '3.5vh' : '28px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%'
                      }}
                    >
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    {opt}
                  </div>
                  {suffix}
                </div>
              );
            })}
          </div>
        );
      }
    }

    // Teacher Mode or non-evaluate slide
    return (
      <div className="quiz-options-grid-teacher">
        {question.options.map((opt, oIdx) => {
          const isCorrect = oIdx === correctIdx;
          const showHighlight = isRevealed && isCorrect;

          return (
            <div
              key={oIdx}
              className="quiz-option-stats"
              style={{
                borderColor: showHighlight ? 'var(--success)' : 'var(--border-color)',
                background: showHighlight ? 'var(--success-bg)' : '#ffffff',
                color: showHighlight ? 'var(--success-text)' : 'var(--text-primary)',
                padding: isSlideshow ? '1.2vh 1.8vw' : '0.75rem 1rem',
                fontSize: isSlideshow ? '2.2vh' : '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  className="option-letter"
                  style={{
                    marginRight: '0.5rem',
                    background: showHighlight ? 'var(--success)' : '#f1f5f9',
                    color: showHighlight ? 'white' : 'var(--text-secondary)',
                    width: isSlideshow ? '3.5vh' : '28px',
                    height: isSlideshow ? '3.5vh' : '28px',
                    fontSize: isSlideshow ? '1.8vh' : '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%'
                  }}
                >
                  {String.fromCharCode(65 + oIdx)}
                </span>
                {opt}
              </div>
              {showHighlight && <span style={{ color: 'var(--success)' }}>✓ Đúng</span>}
            </div>
          );
        })}
      </div>
    );
  };

  const renderEvaluateAnswerLogger = (questionId) => {
    const submissions = classState.studentSubmissions?.[questionId] || {};

    // Fetch all student users from demoAccounts to see who hasn't submitted
    const studentUsers = demoAccounts.filter(u => u.role === 'student');
    const totalStudents = studentUsers.length;
    const submittedCount = Object.keys(submissions).length;

    if (isTeacher) {
      return (
        <div style={{ marginTop: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--primary)' }}>
              📊 Giám sát sinh viên nộp bài ({submittedCount}/{totalStudents}):
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              (Tự động đồng bộ từ thiết bị của SV)
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
            {studentUsers.map(s => {
              const sub = submissions[s.username];
              const hasSubmitted = sub !== undefined;

              let badgeBg = '#f1f5f9';
              let badgeColor = 'var(--text-secondary)';
              let badgeBorder = 'var(--border-color)';
              let label = 'Chưa nộp ⏳';

              if (hasSubmitted) {
                if (classState.isRevealed) {
                  // After reveal, show if correct or wrong
                  const isCorrect = sub.selected === currentSlide.question.correct;
                  badgeBg = isCorrect ? 'var(--success-bg)' : 'var(--error-bg)';
                  badgeColor = isCorrect ? 'var(--success-text)' : 'var(--error-text)';
                  badgeBorder = isCorrect ? 'var(--success-border)' : 'var(--error-border)';
                  label = isCorrect ? 'Đúng ✅' : 'Sai ❌';
                } else {
                  // Before reveal, just show submitted
                  badgeBg = 'var(--primary-light)';
                  badgeColor = 'var(--primary-hover)';
                  badgeBorder = 'var(--primary)';
                  label = 'Đã nộp 📥';
                }
              }

              return (
                <div
                  key={s.username}
                  style={{
                    background: badgeBg,
                    color: badgeColor,
                    border: `1px solid ${badgeBorder}`,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <span>{s.fullname}:</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // For students, we can show a nice personal submission status
    const hasSubmitted = submissions[user.username] !== undefined;
    return (
      <div style={{ marginTop: '1.5rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: hasSubmitted ? 'var(--success-bg)' : 'var(--warning-bg)', border: `1px solid ${hasSubmitted ? 'var(--success-border)' : 'var(--warning-border)'}`, color: hasSubmitted ? 'var(--success-text)' : 'var(--warning-text)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {hasSubmitted ? (
          <span>✓ Bạn đã gửi câu trả lời thành công. {classState.isRevealed ? '' : 'Đang chờ giáo viên hiện đáp án...'}</span>
        ) : (
          <span>⚠️ Hãy click chọn một đáp án phía trên để nộp câu trả lời của bạn!</span>
        )}
      </div>
    );
  };

  const renderEvaluateStatsContent = (isSlideshow = false) => {
    const evaluateQuestions = SLIDES.filter(s => s.stage === 'evaluate' && s.type === 'question');
    const studentUsers = demoAccounts.filter(u => u.role === 'student');

    // Calculate score for each student
    const studentStats = studentUsers.map(student => {
      let correctCount = 0;
      let incorrectCount = 0;
      let unansweredCount = 0;
      const questionDetails = [];

      evaluateQuestions.forEach(q => {
        const sub = classState.studentSubmissions?.[q.question.id]?.[student.username];
        if (sub === undefined) {
          unansweredCount++;
          questionDetails.push('unanswered');
        } else if (sub.selected === q.question.correct) {
          correctCount++;
          questionDetails.push('correct');
        } else {
          incorrectCount++;
          questionDetails.push('incorrect');
        }
      });

      return {
        username: student.username,
        fullname: student.fullname,
        correct: correctCount,
        incorrect: incorrectCount,
        unanswered: unansweredCount,
        total: evaluateQuestions.length,
        accuracy: evaluateQuestions.length > 0 ? Math.round((correctCount / evaluateQuestions.length) * 100) : 0,
        details: questionDetails
      };
    });

    // Sort students by correctCount desc, then by username
    studentStats.sort((a, b) => b.correct - a.correct || a.fullname.localeCompare(b.fullname));

    // Calculate class average accuracy
    const totalAnsweredCorrectly = studentStats.reduce((sum, s) => sum + s.correct, 0);
    const totalPossibleAnswers = studentStats.length * evaluateQuestions.length;
    const classAverage = totalPossibleAnswers > 0 ? Math.round((totalAnsweredCorrectly / totalPossibleAnswers) * 100) : 0;

    // Determine podium / top students
    const topScore = studentStats[0]?.correct || 0;
    const topStudents = studentStats.filter(s => s.correct === topScore && s.correct > 0);

    let topText = '';
    if (topStudents.length > 0) {
      topText = `🏆 Thủ khoa Đánh giá: ${topStudents.map(s => s.fullname).join(', ')} (${topScore}/${evaluateQuestions.length} câu đúng!)`;
    } else {
      topText = '📊 Hãy hoàn thành các câu hỏi để xem kết quả vinh danh!';
    }

    return (
      <div style={{ padding: isSlideshow ? '0.5vh 0' : '0', color: 'var(--text-primary)' }}>
        {/* Top Student Honor Banner */}
        <div style={{
          background: topScore > 0 ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-card)',
          border: `1.5px solid ${topScore > 0 ? 'var(--primary)' : 'var(--border-color)'}`,
          padding: isSlideshow ? '1vh 2vw' : '1rem',
          borderRadius: '0.75rem',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: isSlideshow ? '1.9vh' : '1.1rem',
          marginBottom: isSlideshow ? '1.5vh' : '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {topText}
        </div>

        {/* Overview Stats */}
        {isSlideshow ? (
          <div style={{
            display: 'flex',
            gap: '3vw',
            justifyContent: 'center',
            marginBottom: '1.5vh',
            fontSize: '1.7vh',
            background: 'var(--bg-app)',
            padding: '1vh 2vw',
            borderRadius: '0.5rem',
            border: '1px solid var(--border-color)',
            fontWeight: '600'
          }}>
            <div>Tổng số Sinh viên: <strong style={{ color: 'var(--primary)' }}>{studentStats.length}</strong></div>
            <div style={{ color: 'var(--border-color)' }}>|</div>
            <div>Số câu hỏi: <strong style={{ color: 'var(--primary)' }}>{evaluateQuestions.length}</strong></div>
            <div style={{ color: 'var(--border-color)' }}>|</div>
            <div>Độ chính xác trung bình: <strong style={{ color: 'var(--success)' }}>{classAverage}%</strong></div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#ffffff', border: '1.5px solid var(--border-color)', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tổng số Sinh viên</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--primary)' }}>{studentStats.length}</div>
            </div>
            <div style={{ background: '#ffffff', border: '1.5px solid var(--border-color)', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Số câu hỏi</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--primary)' }}>{evaluateQuestions.length}</div>
            </div>
            <div style={{ background: '#ffffff', border: '1.5px solid var(--border-color)', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Độ chính xác trung bình</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--success)' }}>{classAverage}%</div>
            </div>
          </div>
        )}

        {/* Student Performance Table */}
        <div style={{ background: '#ffffff', border: '1.5px solid var(--border-color)', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: isSlideshow ? '1.5vh' : '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid var(--border-color)', fontWeight: 'bold' }}>
                <th style={{ padding: isSlideshow ? '0.6vh 1vw' : '0.5rem 1rem', width: '60px', textAlign: 'center' }}>Hạng</th>
                <th style={{ padding: isSlideshow ? '0.6vh 1vw' : '0.5rem 1rem' }}>Sinh viên</th>
                <th style={{ padding: isSlideshow ? '0.6vh 1vw' : '0.5rem 1rem', textAlign: 'center' }}>Số câu đúng</th>
                <th style={{ padding: isSlideshow ? '0.6vh 1vw' : '0.5rem 1rem', textAlign: 'center' }}>Tỉ lệ đúng</th>
                {evaluateQuestions.map((_, qIdx) => (
                  <th key={qIdx} style={{ padding: isSlideshow ? '0.6vh 1vw' : '0.5rem 1rem', textAlign: 'center' }}>Câu {qIdx + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {studentStats.map((stat, idx) => {
                const isWinner = topScore > 0 && stat.correct === topScore;

                return (
                  <tr key={stat.username} style={{ borderBottom: '1px solid var(--border-color)', background: isWinner ? 'rgba(99, 102, 241, 0.02)' : 'transparent' }}>
                    <td style={{ padding: isSlideshow ? '0.5vh 1vw' : '0.5rem 1rem', textAlign: 'center', fontWeight: 'bold' }}>
                      {idx === 0 && topScore > 0 ? '🥇' : idx === 1 && stat.correct > 0 ? '🥈' : idx === 2 && stat.correct > 0 ? '🥉' : idx + 1}
                    </td>
                    <td style={{ padding: isSlideshow ? '0.5vh 1vw' : '0.5rem 1rem', fontWeight: '600' }}>
                      {stat.fullname} {isWinner && '👑'}
                    </td>
                    <td style={{ padding: isSlideshow ? '0.5vh 1vw' : '0.5rem 1rem', textAlign: 'center', fontWeight: 'bold', color: 'var(--success-text)' }}>
                      {stat.correct} / {stat.total}
                    </td>
                    <td style={{ padding: isSlideshow ? '0.5vh 1vw' : '0.5rem 1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: '600' }}>{stat.accuracy}%</span>
                        <div style={{ width: '50px', background: '#f1f5f9', height: '6px', borderRadius: '3px', overflow: 'hidden', display: isSlideshow ? 'none' : 'block' }}>
                          <div style={{ width: `${stat.accuracy}%`, background: 'var(--success)', height: '100%' }}></div>
                        </div>
                      </div>
                    </td>
                    {stat.details.map((detail, dIdx) => (
                      <td key={dIdx} style={{ padding: isSlideshow ? '0.5vh 1vw' : '0.5rem 1rem', textAlign: 'center' }}>
                        {detail === 'correct' ? (
                          <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>Đúng ✅</span>
                        ) : detail === 'incorrect' ? (
                          <span style={{ color: 'var(--error)', fontWeight: 'bold' }}>Sai ❌</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Login failed');
      }

      const userData = await res.json();
      setUser(userData);
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setLoginForm({ username: '', password: '' });
  };

  // Teacher navigation: Jump to stage
  const handleStageJump = (stage) => {
    const slideIdx = STAGE_START_INDICES[stage];
    sendStateUpdate({
      activeStage: stage,
      activeSlideIndex: slideIdx,
      isRevealed: false
    });
  };

  // Next / Back Slide controls
  const handleNextSlide = () => {
    if (classState.activeSlideIndex < SLIDES.length - 1) {
      const nextIdx = classState.activeSlideIndex + 1;
      sendStateUpdate({
        activeSlideIndex: nextIdx,
        activeStage: SLIDES[nextIdx].stage,
        isRevealed: false
      });
    }
  };

  const handlePrevSlide = () => {
    if (classState.activeSlideIndex > 0) {
      const prevIdx = classState.activeSlideIndex - 1;
      sendStateUpdate({
        activeSlideIndex: prevIdx,
        activeStage: SLIDES[prevIdx].stage,
        isRevealed: false
      });
    }
  };

  // Score adjustments
  const adjustScore = (team, delta) => {
    const updatedScores = { ...classState.scores };
    updatedScores[team] = Math.max(0, updatedScores[team] + delta);
    sendStateUpdate({ scores: updatedScores });
  };

  // Reset class
  const handleResetClass = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'TEACHER_RESET_CLASS' }));
    }
  };

  // Explore Game: Randomize PC troubleshooting sample
  const handleRandomizeExplore = () => {
    if (!dataset || !dataset.rows || dataset.rows.length === 0) return;

    let nextSTT = 13;
    if (classState.exploreRecord) {
      const currentSTT = Number(classState.exploreRecord.STT);
      if (currentSTT === 13) {
        nextSTT = 3;
      } else if (currentSTT === 3) {
        nextSTT = 5;
      } else if (currentSTT === 5) {
        // Sau đó bấm nút thì ko còn tác dụng nữa
        return;
      } else {
        nextSTT = 13;
      }
    }

    const selectedRecord = dataset.rows.find(row => Number(row.STT) === nextSTT) || dataset.rows[0];

    sendStateUpdate({
      exploreRecord: selectedRecord,
      isRevealed: false
    });
  };

  // Reveal Answer state toggler
  const handleRevealAnswer = () => {
    sendStateUpdate({ isRevealed: true });
  };

  // Handle arrow keys for slideshow navigation in fullscreen mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only allow the teacher to control slide navigation via keys
      if (!isTeacher) return;
      // Only activate in fullscreen / slideshow mode
      if (!classState.slideshowActive && !isFullscreen) return;
      // Do not trigger navigation if typing in inputs
      if (
        document.activeElement &&
        (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA' ||
          document.activeElement.tagName === 'SELECT' ||
          document.activeElement.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTeacher, classState.slideshowActive, isFullscreen, classState.activeSlideIndex]);

  if (!user) {
    return (
      <div className="login-wrapper">
        {/* Top Right Login Toggle Button */}
        <div className="landing-navbar">
          <button className="landing-login-btn" onClick={() => setShowLoginModal(true)}>
            🔑 Đăng nhập
          </button>
        </div>

        {/* Center Content */}
        <div className="landing-center-content">
          <p className="landing-sub-institute">TRƯỜNG CAO ĐẲNG KỸ THUẬT CAO THẮNG</p>
          <p className="landing-sub-department">KHOA CÔNG NGHỆ THÔNG TIN</p>
          <p className="landing-sub-major">BỘ MÔN PHẦN CỨNG VÀ MẠNG MÁY TÍNH</p>

          <h1 className="landing-main-title">HỘI GIẢNG 2026</h1>

          <div className="landing-author">
            <span className="author-prefix">Giảng viên:</span>
            <span className="author-name">Nguyễn Hoàng Việt</span>
          </div>
        </div>

        {/* Login Modal Overlay */}
        {showLoginModal && (
          <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
            <div className="login-card-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setShowLoginModal(false)} aria-label="Close modal">
                &times;
              </button>

              <h3 className="modal-title">Đăng nhập hệ thống</h3>

              {loginError && <div className="error-state" style={{ marginBottom: '1rem' }}>{loginError}</div>}

              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label">Tên đăng nhập</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ví dụ: nhviet, student1"
                    value={loginForm.username}
                    onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Nhập mật khẩu"
                    value={loginForm.password}
                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="login-btn">Đăng nhập</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Slideshow Fullscreen renderer
  const renderSlideshowOverlay = () => {
    if (!classState.slideshowActive) return null;

    const isEngageStage = currentSlide.stage === 'engage';

    return (
      <div className="slideshow-overlay">
        {/* Header */}
        <div className="slideshow-header">
          <div className="slideshow-title-lbl">
            🎬 {SLIDES[classState.activeSlideIndex].title} ({classState.activeSlideIndex + 1}/{SLIDES.length})
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {!isFullscreen && (
              <button
                className="exit-slideshow-btn"
                style={{ background: '#ecfdf5', color: '#059669', borderColor: '#a7f3d0' }}
                onClick={goFullscreen}
              >
                🖥️ Toàn Màn Hình
              </button>
            )}
            {isTeacher && (
              <button
                className="exit-slideshow-btn"
                onClick={() => sendStateUpdate({ slideshowActive: false })}
              >
                🚪 Thoát Trình Chiếu
              </button>
            )}
          </div>
        </div>

        {/* Slide Body */}
        <div className={`slideshow-body question-transition-container ${currentSlide.showTree && hasContent ? 'wide-layout' : ''}`} key={classState.activeSlideIndex}>
          <h2 className="slideshow-slide-heading">{currentSlide.title}</h2>

          {currentSlide.showTree && hasContent ? (
            <div className="slideshow-split-layout">
              <div className="slideshow-left-col">
                <div className="slideshow-slide-content" style={{ width: '100%' }}>
                  {currentSlide.type === 'content' && currentSlide.content}

                  {currentSlide.type === 'vector-visualizer' && (
                    <VectorExtractionVisualizer
                      defaultAttr={currentSlide.defaultAttr}
                      defaultVal={currentSlide.defaultVal}
                      isSlideshow={true}
                      definition={currentSlide.definition}
                    />
                  )}

                  {currentSlide.type === 'elaborate-h1' && (
                    <ElaborateActivity1
                      isTeacher={isTeacher}
                      isRevealed={classState.isRevealed}
                      isSlideshow={true}
                      onReveal={handleRevealAnswer}
                    />
                  )}

                  {currentSlide.type === 'elaborate-h1-2' && (
                    <ElaborateActivity1Part2
                      isTeacher={isTeacher}
                      isRevealed={classState.isRevealed}
                      isSlideshow={true}
                      onReveal={handleRevealAnswer}
                    />
                  )}

                  {currentSlide.type === 'elaborate-h2' && (
                    <ElaborateActivity2
                      isTeacher={isTeacher}
                      isRevealed={classState.isRevealed}
                      isSlideshow={true}
                      onReveal={handleRevealAnswer}
                    />
                  )}

                  {/* Questions Screen */}
                  {currentSlide.type === 'question' && (
                    <div>
                      <p style={{ fontWeight: '600', fontSize: '2.4vh', color: 'var(--text-primary)', marginBottom: '1.5vh', textAlign: 'left' }}>
                        {currentSlide.question.text}
                      </p>
                      {currentSlide.question.record && renderRecordTable(currentSlide.question.record, true)}

                      {/* Engage question show-hide logic */}
                      {isEngageStage && !classState.isRevealed ? (
                        <div style={{ textAlign: 'center', padding: '2vh', background: '#f8fafc', border: '1px dashed var(--border-color)', borderRadius: '0.75rem', color: 'var(--text-secondary)', fontSize: '2.2vh' }}>
                          ❓ Trả lời câu hỏi ôn tập thực tế. Click <strong>Hiện đáp án</strong> để kiểm tra.
                        </div>
                      ) : (
                        renderInteractiveOptions(currentSlide.question, true)
                      )}
                      {currentSlide.stage === 'evaluate' && renderEvaluateAnswerLogger(currentSlide.question.id, true)}
                    </div>
                  )}

                  {/* Explore Game Screen */}
                  {currentSlide.type === 'explore-game' && renderExploreGameContent(true)}

                  {/* Evaluate Stats Screen */}
                  {currentSlide.type === 'evaluate-stats' && renderEvaluateStatsContent(true)}
                </div>
              </div>
              <div className="slideshow-right-col">
                <DecisionTreeSVG highlightRecord={classState.isRevealed ? classState.exploreRecord : null} isSlideshow={true} activeSlideIndex={classState.activeSlideIndex} treeState={getTreeState(currentSlide, classState.isRevealed)} />
              </div>
            </div>
          ) : (
            <>
              {currentSlide.showTree && (
                <DecisionTreeSVG highlightRecord={classState.isRevealed ? classState.exploreRecord : null} isSlideshow={true} activeSlideIndex={classState.activeSlideIndex} treeState={getTreeState(currentSlide, classState.isRevealed)} />
              )}

              <div className="slideshow-slide-content" style={{ width: '100%' }}>
                {currentSlide.type === 'content' && currentSlide.content}

                {currentSlide.type === 'vector-visualizer' && (
                  <VectorExtractionVisualizer
                    defaultAttr={currentSlide.defaultAttr}
                    defaultVal={currentSlide.defaultVal}
                    isSlideshow={true}
                    definition={currentSlide.definition}
                  />
                )}

                {currentSlide.type === 'elaborate-h1' && (
                  <ElaborateActivity1
                    isTeacher={isTeacher}
                    isRevealed={classState.isRevealed}
                    isSlideshow={true}
                    onReveal={handleRevealAnswer}
                  />
                )}

                {currentSlide.type === 'elaborate-h1-2' && (
                  <ElaborateActivity1Part2
                    isTeacher={isTeacher}
                    isRevealed={classState.isRevealed}
                    isSlideshow={true}
                    onReveal={handleRevealAnswer}
                  />
                )}

                {currentSlide.type === 'elaborate-h2' && (
                  <ElaborateActivity2
                    isTeacher={isTeacher}
                    isRevealed={classState.isRevealed}
                    isSlideshow={true}
                    onReveal={handleRevealAnswer}
                  />
                )}

                {/* Questions Screen */}
                {currentSlide.type === 'question' && (
                  <div>
                    <p style={{ fontWeight: '600', fontSize: '2.4vh', color: 'var(--text-primary)', marginBottom: '1.5vh', textAlign: 'left' }}>
                      {currentSlide.question.text}
                    </p>
                    {currentSlide.question.record && renderRecordTable(currentSlide.question.record, true)}

                    {/* Engage question show-hide logic */}
                    {isEngageStage && !classState.isRevealed ? (
                      <div style={{ textAlign: 'center', padding: '2vh', background: '#f8fafc', border: '1px dashed var(--border-color)', borderRadius: '0.75rem', color: 'var(--text-secondary)', fontSize: '2.2vh' }}>
                        ❓ Trả lời câu hỏi ôn tập thực tế. Click <strong>Hiện đáp án</strong> để kiểm tra.
                      </div>
                    ) : (
                      renderInteractiveOptions(currentSlide.question, true)
                    )}
                    {currentSlide.stage === 'evaluate' && renderEvaluateAnswerLogger(currentSlide.question.id, true)}
                  </div>
                )}

                {/* Explore Game Screen */}
                {currentSlide.type === 'explore-game' && renderExploreGameContent(true)}

                {/* Evaluate Stats Screen */}
                {currentSlide.type === 'evaluate-stats' && renderEvaluateStatsContent(true)}
              </div>
            </>
          )}
        </div>

        {/* Footer controls for GV & SV */}
        <div className="slideshow-footer">
          <div className="score-card-group" style={{ gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ fontSize: '2vh', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5vw', position: 'relative' }}>
              🔴 Nhóm 1: <span style={{ color: '#ef4444', fontSize: '2.6vh' }}>{classState.scores.group1} điểm</span>
              {isTeacher && (
                <div style={{ display: 'flex', gap: '0.2vw' }}>
                  <button className="score-adjust-btn" style={{ padding: '0.2vh 0.6vw', fontSize: '1.6vh', cursor: 'pointer' }} onClick={() => adjustScore('group1', 1)}>+</button>
                  <button className="score-adjust-btn" style={{ padding: '0.2vh 0.6vw', fontSize: '1.6vh', cursor: 'pointer' }} onClick={() => adjustScore('group1', -1)}>-</button>
                </div>
              )}
              {glowEffects.filter(g => g.team === 'group1').map(g => (
                <div key={g.id} className={`glow-score-bubble glow-score-bubble-footer ${g.team}`}>+{g.amount}</div>
              ))}
            </div>
            <div style={{ fontSize: '2vh', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5vw', position: 'relative' }}>
              🔵 Nhóm 2: <span style={{ color: '#3b82f6', fontSize: '2.6vh' }}>{classState.scores.group2} điểm</span>
              {isTeacher && (
                <div style={{ display: 'flex', gap: '0.2vw' }}>
                  <button className="score-adjust-btn" style={{ padding: '0.2vh 0.6vw', fontSize: '1.6vh', cursor: 'pointer' }} onClick={() => adjustScore('group2', 1)}>+</button>
                  <button className="score-adjust-btn" style={{ padding: '0.2vh 0.6vw', fontSize: '1.6vh', cursor: 'pointer' }} onClick={() => adjustScore('group2', -1)}>-</button>
                </div>
              )}
              {glowEffects.filter(g => g.team === 'group2').map(g => (
                <div key={g.id} className={`glow-score-bubble glow-score-bubble-footer ${g.team}`}>+{g.amount}</div>
              ))}
            </div>
          </div>

          {isTeacher && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              {(currentSlide.type === 'question' || currentSlide.type === 'explore-game' || currentSlide.type === 'elaborate-h1' || currentSlide.type === 'elaborate-h1-2' || currentSlide.type === 'elaborate-h2') && !classState.isRevealed && (
                <button className="slideshow-nav-btn" style={{ background: 'var(--warning)' }} onClick={handleRevealAnswer}>
                  👁️ Hiện đáp án
                </button>
              )}
              <button
                className="slideshow-nav-btn secondary"
                onClick={handlePrevSlide}
                disabled={classState.activeSlideIndex === 0}
              >
                ◀ Trở Về
              </button>
              <button
                className="slideshow-nav-btn"
                onClick={handleNextSlide}
                disabled={classState.activeSlideIndex === SLIDES.length - 1}
              >
                Kế Tiếp ▶
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Helper renderer for displaying a record in a table format (e.g. for Question 3)
  const renderRecordTable = (record, isSlideshow = false) => {
    if (!record) return null;
    return (
      <div className="table-responsive" style={{ width: '100%', overflowX: 'auto', background: '#ffffff', borderRadius: '1rem', border: '1.5px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', margin: isSlideshow ? '1.5vh auto' : '1rem 0', maxWidth: '650px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: isSlideshow ? '2vh' : '0.95rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid var(--border-color)', fontWeight: 'bold' }}>
              <th style={{ padding: isSlideshow ? '1.5vh 1vw' : '0.75rem 1rem' }}>📅 Chuyên cần</th>
              <th style={{ padding: isSlideshow ? '1.5vh 1vw' : '0.75rem 1rem' }}>📝 Điểm giữa kỳ</th>
              <th style={{ padding: isSlideshow ? '1.5vh 1vw' : '0.75rem 1rem' }}>💻 Làm bài tập</th>
              <th style={{ padding: isSlideshow ? '1.5vh 1vw' : '0.75rem 1rem', background: 'rgba(99, 102, 241, 0.05)', color: 'var(--primary)', fontWeight: 'bold' }}>🎯 Kết quả học tập</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: '#ffffff' }}>
              <td style={{ padding: isSlideshow ? '1.8vh 1vw' : '0.75rem' }}>
                <span className={`badge ${record['Chuyên cần'] === 'Đi học đủ' ? 'success' : record['Chuyên cần'] === 'Thỉnh thoảng vắng' ? 'warning' : 'danger'}`} style={{ fontSize: isSlideshow ? '1.8vh' : '0.8rem', padding: '0.4em 0.9em' }}>
                  {record['Chuyên cần']}
                </span>
              </td>
              <td style={{ padding: isSlideshow ? '1.8vh 1vw' : '0.75rem' }}>
                <span className={`badge ${record['Điểm giữa kỳ'] === '>=5' ? 'success' : 'danger'}`} style={{ fontSize: isSlideshow ? '1.8vh' : '0.8rem', padding: '0.4em 0.9em' }}>
                  {record['Điểm giữa kỳ']}
                </span>
              </td>
              <td style={{ padding: isSlideshow ? '1.8vh 1vw' : '0.75rem' }}>
                <span className={`badge ${record['Làm bài tập'] === 'Có' ? 'success' : 'danger'}`} style={{ fontSize: isSlideshow ? '1.8vh' : '0.8rem', padding: '0.4em 0.9em' }}>
                  {record['Làm bài tập']}
                </span>
              </td>
              <td style={{ padding: isSlideshow ? '1.8vh 1vw' : '0.75rem', fontWeight: 'bold', background: 'rgba(99, 102, 241, 0.02)' }}>
                <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontWeight: 'normal', fontSize: isSlideshow ? '1.8vh' : '0.85rem' }}>❓ Cần dự đoán</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  // Helper renderer for Explore troubleshooting game
  function renderExploreGameContent(isSlideshow = false) {
    return (
      <div>
        <p style={{ fontSize: isSlideshow ? '2.1vh' : '1rem', marginBottom: '1vh' }}>
          Xem thuộc tính kết quả học tập bên dưới. Dự đoán xem kết quả học tập là <strong>Giỏi</strong>, <strong>Trung bình khá</strong> hay <strong>Không đạt</strong>?
        </p>

        {isTeacher && (
          <div style={{ marginBottom: '1rem' }}>
            <button className="btn primary" onClick={handleRandomizeExplore}>
              🎲 Chọn Mẫu Dữ Liệu Ngẫu Nhiên
            </button>
          </div>
        )}

        {classState.exploreRecord ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem', width: '100%' }}>
            {/* Table Representation */}
            <div className="table-responsive" style={{ width: '100%', overflowX: 'auto', background: '#ffffff', borderRadius: '1rem', border: '1.5px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: isSlideshow ? '2.1vh' : '0.95rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid var(--border-color)', fontWeight: 'bold' }}>
                    <th style={{ padding: isSlideshow ? '1.5vh 1.5vw' : '0.75rem 1rem' }}>📅 Chuyên cần</th>
                    <th style={{ padding: isSlideshow ? '1.5vh 1.5vw' : '0.75rem 1rem' }}>📝 Điểm giữa kỳ</th>
                    <th style={{ padding: isSlideshow ? '1.5vh 1.5vw' : '0.75rem 1rem' }}>💻 Làm bài tập</th>
                    <th style={{ padding: isSlideshow ? '1.5vh 1.5vw' : '0.75rem 1rem', background: 'rgba(99, 102, 241, 0.05)', color: 'var(--primary)', fontWeight: 'bold' }}>🎯 Kết quả học tập</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: '#ffffff' }}>
                    <td style={{ padding: isSlideshow ? '2vh 1.5vw' : '1rem' }}>
                      <span className={`badge ${classState.exploreRecord['Chuyên cần'] === 'Đi học đủ' ? 'success' : classState.exploreRecord['Chuyên cần'] === 'Thỉnh thoảng vắng' ? 'warning' : 'danger'}`} style={{ fontSize: isSlideshow ? '1.9vh' : '0.8rem', padding: '0.4em 0.9em' }}>
                        {classState.exploreRecord['Chuyên cần']}
                      </span>
                    </td>
                    <td style={{ padding: isSlideshow ? '2vh 1.5vw' : '1rem' }}>
                      <span className={`badge ${classState.exploreRecord['Điểm giữa kỳ'] === '>=5' ? 'success' : 'danger'}`} style={{ fontSize: isSlideshow ? '1.9vh' : '0.8rem', padding: '0.4em 0.9em' }}>
                        {classState.exploreRecord['Điểm giữa kỳ']}
                      </span>
                    </td>
                    <td style={{ padding: isSlideshow ? '2vh 1.5vw' : '1rem' }}>
                      <span className={`badge ${classState.exploreRecord['Làm bài tập'] === 'Có' ? 'success' : 'danger'}`} style={{ fontSize: isSlideshow ? '1.9vh' : '0.8rem', padding: '0.4em 0.9em' }}>
                        {classState.exploreRecord['Làm bài tập']}
                      </span>
                    </td>
                    <td style={{ padding: isSlideshow ? '2vh 1.5vw' : '1rem', fontWeight: 'bold', background: 'rgba(99, 102, 241, 0.02)' }}>
                      {classState.isRevealed ? (
                        <span className={`badge ${classState.exploreRecord['Kết quả học tập'] === 'Giỏi' ? 'success' : classState.exploreRecord['Kết quả học tập'] === 'Trung bình khá' ? 'warning' : 'danger'}`} style={{ fontSize: isSlideshow ? '1.9vh' : '0.8rem', padding: '0.4em 0.9em' }}>
                          {classState.exploreRecord['Kết quả học tập']}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontWeight: 'normal', fontSize: isSlideshow ? '1.9vh' : '0.85rem' }}>❓ Ẩn (Chờ GV)</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Actions / Results */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '0.5rem' }}>
              {isTeacher && !classState.isRevealed && (
                <button
                  className="btn"
                  style={{ background: 'var(--warning)', borderColor: 'var(--warning-border)', color: 'var(--warning-text)', padding: isSlideshow ? '1.2vh 2.5vw' : '0.5rem 1.5rem', fontSize: isSlideshow ? '2vh' : '0.9rem', fontWeight: 'bold' }}
                  onClick={handleRevealAnswer}
                >
                  👁️ Tiết lộ đáp án đúng
                </button>
              )}

              {classState.isRevealed ? (
                <div
                  className={`badge ${classState.exploreRecord['Kết quả học tập'] === 'Giỏi' ? 'success' : classState.exploreRecord['Kết quả học tập'] === 'Trung bình khá' ? 'warning' : 'danger'}`}
                  style={{
                    padding: isSlideshow ? '1.5vh 2.5vw' : '0.6rem 2rem',
                    fontSize: isSlideshow ? '2.2vh' : '1rem',
                    justifyContent: 'center',
                    animation: 'fadeIn 0.3s ease-out',
                    borderRadius: '0.5rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  Đáp án: {classState.exploreRecord['Kết quả học tập']}
                </div>
              ) : (
                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: isSlideshow ? '1.8vh' : '0.9rem' }}>
                  {!isTeacher && '⏳ Đang chờ giáo viên hiện đáp án...'}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ padding: '2rem', background: '#f8fafc', border: '1.5px dashed var(--border-color)', borderRadius: '0.75rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            {isTeacher ? 'Click nút để rút một mẫu dữ liệu ngẫu nhiên từ data.csv!' : 'Đang chờ giảng viên bốc mẫu dữ liệu...'}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Slideshow view takeover */}
      {renderSlideshowOverlay()}

      {/* Classroom Header */}
      <header className="app-header">
        <div className="brand">
          <div style={{ fontSize: '1.5rem' }}>🎓</div>
          <div>
            <h1 className="brand-title">Lớp Học Tương Tác: Thuật Toán Quinlan</h1>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Môn học: Cơ sở trí tuệ nhân tạo (Lớp: CD CNTT 24AI)
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="user-badge">
            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{user.fullname}</span>
            <span className="user-role-lbl">{isTeacher ? 'Giảng Viên' : `Sinh Viên`}</span>
          </div>
          <button className="btn danger btn-sm" onClick={handleLogout}>🚪 Thoát</button>
        </div>
      </header>

      {/* Student read-only mirror notice */}
      {!isTeacher && (
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', marginBottom: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🖥️ Chế độ gương: Màn hình đang đồng bộ với bài giảng của Giảng viên. Hãy cùng tham gia thảo luận trực tiếp tại lớp học!
        </div>
      )}

      {/* GV Controls Bar */}
      {isTeacher && (
        <section className="gv-controls-panel">
          <div className="gv-section-title">Bảng điều khiển Giảng viên</div>
          <div className="stage-tabs">
            <button
              className={`stage-tab-btn ${classState.activeStage === 'engage' ? 'active' : ''}`}
              onClick={() => handleStageJump('engage')}
            >
              1. Khởi động (Engage)
            </button>
            <button
              className={`stage-tab-btn ${classState.activeStage === 'explore' ? 'active' : ''}`}
              onClick={() => handleStageJump('explore')}
            >
              2. Đặt vấn đề (Explore)
            </button>
            <button
              className={`stage-tab-btn ${classState.activeStage === 'explain' ? 'active' : ''}`}
              onClick={() => handleStageJump('explain')}
            >
              3. Bài học (Explain)
            </button>
            <button
              className={`stage-tab-btn ${classState.activeStage === 'elaborate' ? 'active' : ''}`}
              onClick={() => handleStageJump('elaborate')}
            >
              4. Thực hành (Elaborate)
            </button>
            <button
              className={`stage-tab-btn ${classState.activeStage === 'evaluate' ? 'active' : ''}`}
              onClick={() => handleStageJump('evaluate')}
            >
              5. Đánh giá (Evaluate)
            </button>
          </div>

          <div className="gv-action-row">
            <button className="btn primary" onClick={() => sendStateUpdate({ slideshowActive: true })}>
              🎬 Mở Trình Chiếu (Slideshow)
            </button>
            <button className="btn" onClick={handlePrevSlide} disabled={classState.activeSlideIndex === 0}>
              ◀ Trước
            </button>
            <button className="btn" onClick={handleNextSlide} disabled={classState.activeSlideIndex === SLIDES.length - 1}>
              Sau ▶
            </button>
            <div style={{ flexGrow: 1 }} />
            <button className="btn danger" onClick={handleResetClass}>
              🔄 Reset Lớp Học
            </button>
          </div>
        </section>
      )}

      {/* Main Interactive Screen */}
      <div className="content-grid" style={{ gridTemplateColumns: isTeacher ? '3fr 1fr' : '1fr' }}>
        {/* Main Content Side */}
        <section className="main-content-card question-transition-container" key={classState.activeSlideIndex}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--primary)' }}>
              Phần: {classState.activeStage} (Slide {classState.activeSlideIndex + 1}/{SLIDES.length})
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Đồng bộ hoạt động thực tế
            </span>
          </div>

          <h2 className="slide-title">{currentSlide.title}</h2>

          <div className="slide-body">
            {currentSlide.showTree && hasContent ? (
              <div className="standard-split-layout">
                <div className="standard-left-col">
                  {currentSlide.type === 'content' && currentSlide.content}

                  {currentSlide.type === 'vector-visualizer' && (
                    <VectorExtractionVisualizer
                      defaultAttr={currentSlide.defaultAttr}
                      defaultVal={currentSlide.defaultVal}
                      isSlideshow={false}
                      definition={currentSlide.definition}
                    />
                  )}

                  {currentSlide.type === 'elaborate-h1' && (
                    <ElaborateActivity1
                      isTeacher={isTeacher}
                      isRevealed={classState.isRevealed}
                      isSlideshow={false}
                      onReveal={handleRevealAnswer}
                    />
                  )}

                  {currentSlide.type === 'elaborate-h1-2' && (
                    <ElaborateActivity1Part2
                      isTeacher={isTeacher}
                      isRevealed={classState.isRevealed}
                      isSlideshow={false}
                      onReveal={handleRevealAnswer}
                    />
                  )}

                  {currentSlide.type === 'elaborate-h2' && (
                    <ElaborateActivity2
                      isTeacher={isTeacher}
                      isRevealed={classState.isRevealed}
                      isSlideshow={false}
                      onReveal={handleRevealAnswer}
                    />
                  )}

                  {/* Questions screen (standard view) */}
                  {currentSlide.type === 'question' && (
                    <div style={{ marginTop: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                        <p style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '1.15rem', margin: 0 }}>
                          {currentSlide.question.text}
                        </p>
                        {isTeacher && !classState.isRevealed && (
                          <button
                            type="button"
                            className="btn"
                            style={{ background: 'var(--warning)', color: 'var(--text-primary)', fontWeight: 'bold' }}
                            onClick={handleRevealAnswer}
                          >
                            👁️ Hiện đáp án
                          </button>
                        )}
                      </div>

                      {currentSlide.question.record && renderRecordTable(currentSlide.question.record, false)}

                      {currentSlide.stage === 'engage' && !classState.isRevealed ? (
                        <div style={{ padding: '1rem', background: '#f8fafc', border: '1px dashed var(--border-color)', borderRadius: '0.5rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '1rem' }}>
                          ❓ Trả lời câu hỏi thực tế tại lớp.
                        </div>
                      ) : (
                        renderInteractiveOptions(currentSlide.question, false)
                      )}
                      {currentSlide.stage === 'evaluate' && renderEvaluateAnswerLogger(currentSlide.question.id, false)}
                    </div>
                  )}

                  {/* Explore troubleshooting game screen (standard view) */}
                  {currentSlide.type === 'explore-game' && (
                    <div>
                      {isTeacher && !classState.isRevealed && (
                        <div style={{ marginBottom: '1rem' }}>
                          <button
                            type="button"
                            className="btn"
                            style={{ background: 'var(--warning)', color: 'var(--text-primary)', fontWeight: 'bold' }}
                            onClick={handleRevealAnswer}
                          >
                            👁️ Hiện đáp án
                          </button>
                        </div>
                      )}
                      {renderExploreGameContent(false)}
                    </div>
                  )}

                  {/* Evaluate Stats Screen */}
                  {currentSlide.type === 'evaluate-stats' && renderEvaluateStatsContent(false)}
                </div>
                <div className="standard-right-col">
                  <DecisionTreeSVG highlightRecord={classState.isRevealed ? classState.exploreRecord : null} activeSlideIndex={classState.activeSlideIndex} treeState={getTreeState(currentSlide, classState.isRevealed)} />
                </div>
              </div>
            ) : (
              <>
                {currentSlide.showTree && (
                  <DecisionTreeSVG highlightRecord={classState.isRevealed ? classState.exploreRecord : null} activeSlideIndex={classState.activeSlideIndex} treeState={getTreeState(currentSlide, classState.isRevealed)} />
                )}

                {currentSlide.type === 'content' && currentSlide.content}

                {currentSlide.type === 'vector-visualizer' && (
                  <VectorExtractionVisualizer
                    defaultAttr={currentSlide.defaultAttr}
                    defaultVal={currentSlide.defaultVal}
                    isSlideshow={false}
                    definition={currentSlide.definition}
                  />
                )}

                {currentSlide.type === 'elaborate-h1' && (
                  <ElaborateActivity1
                    isTeacher={isTeacher}
                    isRevealed={classState.isRevealed}
                    isSlideshow={false}
                    onReveal={handleRevealAnswer}
                  />
                )}

                {currentSlide.type === 'elaborate-h1-2' && (
                  <ElaborateActivity1Part2
                    isTeacher={isTeacher}
                    isRevealed={classState.isRevealed}
                    isSlideshow={false}
                    onReveal={handleRevealAnswer}
                  />
                )}

                {currentSlide.type === 'elaborate-h2' && (
                  <ElaborateActivity2
                    isTeacher={isTeacher}
                    isRevealed={classState.isRevealed}
                    isSlideshow={false}
                    onReveal={handleRevealAnswer}
                  />
                )}

                {/* Questions screen (standard view) */}
                {currentSlide.type === 'question' && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                      <p style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '1.15rem', margin: 0 }}>
                        {currentSlide.question.text}
                      </p>
                      {isTeacher && !classState.isRevealed && (
                        <button
                          type="button"
                          className="btn"
                          style={{ background: 'var(--warning)', color: 'var(--text-primary)', fontWeight: 'bold' }}
                          onClick={handleRevealAnswer}
                        >
                          👁️ Hiện đáp án
                        </button>
                      )}
                    </div>

                    {currentSlide.question.record && renderRecordTable(currentSlide.question.record, false)}

                    {currentSlide.stage === 'engage' && !classState.isRevealed ? (
                      <div style={{ padding: '1rem', background: '#f8fafc', border: '1px dashed var(--border-color)', borderRadius: '0.5rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '1rem' }}>
                        ❓ Trả lời câu hỏi thực tế tại lớp.
                      </div>
                    ) : (
                      renderInteractiveOptions(currentSlide.question, false)
                    )}
                    {currentSlide.stage === 'evaluate' && renderEvaluateAnswerLogger(currentSlide.question.id, false)}
                  </div>
                )}

                {/* Explore troubleshooting game screen (standard view) */}
                {currentSlide.type === 'explore-game' && (
                  <div>
                    {isTeacher && !classState.isRevealed && (
                      <div style={{ marginBottom: '1rem' }}>
                        <button
                          type="button"
                          className="btn"
                          style={{ background: 'var(--warning)', color: 'var(--text-primary)', fontWeight: 'bold' }}
                          onClick={handleRevealAnswer}
                        >
                          👁️ Hiện đáp án
                        </button>
                      </div>
                    )}
                    {renderExploreGameContent(false)}
                  </div>
                )}

                {/* Evaluate Stats Screen */}
                {currentSlide.type === 'evaluate-stats' && renderEvaluateStatsContent(false)}
              </>
            )}
          </div>
        </section>

        {/* Sidebar Status/Tools (Only for Teacher) */}
        {isTeacher && (
          <section className="sidebar-card">
            {/* Scoreboard Widget */}
            <div className="sidebar-item">
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>Bảng điểm nhóm thi đua</h3>
              <div className="score-card-group">
                <div className="score-widget" style={{ position: 'relative' }}>
                  <div className="score-team-name" style={{ color: '#ef4444' }}>Nhóm 1</div>
                  <div className="score-number">{classState.scores.group1}</div>
                  <div className="score-btn-row">
                    <button className="score-adjust-btn" onClick={() => adjustScore('group1', 1)}>+1</button>
                    <button className="score-adjust-btn" onClick={() => adjustScore('group1', -1)}>-1</button>
                  </div>
                  {glowEffects.filter(g => g.team === 'group1').map(g => (
                    <div key={g.id} className={`glow-score-bubble ${g.team}`}>+{g.amount}</div>
                  ))}
                </div>

                <div className="score-widget" style={{ position: 'relative' }}>
                  <div className="score-team-name" style={{ color: '#3b82f6' }}>Nhóm 2</div>
                  <div className="score-number">{classState.scores.group2}</div>
                  <div className="score-btn-row">
                    <button className="score-adjust-btn" onClick={() => adjustScore('group2', 1)}>+1</button>
                    <button className="score-adjust-btn" onClick={() => adjustScore('group2', -1)}>-1</button>
                  </div>
                  {glowEffects.filter(g => g.team === 'group2').map(g => (
                    <div key={g.id} className={`glow-score-bubble ${g.team}`}>+{g.amount}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Student Login Status Widget */}
            <div className="sidebar-item">
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 0.75rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Quản lý Sinh viên</span>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '12px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary-hover)',
                  fontWeight: '700'
                }}>
                  {demoAccounts.filter(acc => acc.role === 'student').filter(s => onlineUsers.some(o => o.username === s.username)).length}
                  /
                  {demoAccounts.filter(acc => acc.role === 'student').length} Online
                </span>
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                maxHeight: '220px',
                overflowY: 'auto',
                paddingRight: '4px'
              }}>
                {demoAccounts.filter(acc => acc.role === 'student').map(student => {
                  const isOnline = onlineUsers.some(u => u.username === student.username);
                  return (
                    <div
                      key={student.username}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.75rem',
                        background: isOnline ? 'var(--success-bg)' : '#f8fafc',
                        border: '1px solid',
                        borderColor: isOnline ? 'var(--success-border)' : 'var(--border-color)',
                        fontSize: '0.85rem',
                        transition: 'var(--transition)'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{student.fullname}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          @{student.username} • Nhóm {student.group}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span className={isOnline ? 'online-dot' : 'offline-dot'} />
                        <span style={{
                          fontWeight: '600',
                          color: isOnline ? 'var(--success-text)' : 'var(--text-muted)'
                        }}>
                          {isOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* User details / help */}
            <div className="sidebar-item">
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Thông tin bài giảng</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>
                Lớp CD CNTT 24AI
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
