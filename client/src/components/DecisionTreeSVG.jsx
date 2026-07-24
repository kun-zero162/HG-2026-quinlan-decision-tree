import React from 'react';

function DecisionTreeSVG({ highlightRecord, isSlideshow, activeSlideIndex, treeState: propTreeState }) {
  // Determine tree build state based on activeSlideIndex or direct prop
  let treeState = 'full';
  if (propTreeState) {
    treeState = propTreeState;
  } else if (activeSlideIndex !== undefined) {
    if (activeSlideIndex >= 12 && activeSlideIndex <= 18) {
      treeState = 'elaborate-1';
    } else if (activeSlideIndex >= 19 && activeSlideIndex <= 22) {
      treeState = 'elaborate-2';
    }
  }

  // Determine which paths/nodes to highlight based on the highlightRecord values.
  const activeNodes = new Set();
  const activeLinks = new Set();

  if (highlightRecord) {
    // Root is always active
    activeNodes.add('root');

    const chuyenCan = highlightRecord['Chuyên cần'];
    if (chuyenCan === 'Thường xuyên vắng') {
      activeLinks.add('root-right');
      activeNodes.add('leaf-fail-1');
    } else if (chuyenCan === 'Thỉnh thoảng vắng') {
      activeLinks.add('root-middle');
      activeNodes.add('node-diem-mid');

      const diemGk = highlightRecord['Điểm giữa kỳ'];
      if (diemGk === '>=5') {
        activeLinks.add('diem-mid-left');
        activeNodes.add('leaf-tb-1');
      } else if (diemGk === '<5') {
        activeLinks.add('diem-mid-right');
        activeNodes.add('leaf-fail-2');
      }
    } else if (chuyenCan === 'Đi học đủ') {
      activeLinks.add('root-left');
      activeNodes.add('node-diem-left');

      const diemGk = highlightRecord['Điểm giữa kỳ'];
      if (diemGk === '>=5') {
        activeLinks.add('diem-left-left');
        activeNodes.add('leaf-kha-1');
      } else if (diemGk === '<5') {
        activeLinks.add('diem-left-right');
        activeNodes.add('node-baitap');

        const baiTap = highlightRecord['Làm bài tập'];
        if (baiTap === 'Có') {
          activeLinks.add('baitap-left');
          activeNodes.add('leaf-tb-2');
        } else if (baiTap === 'Không') {
          activeLinks.add('baitap-right');
          activeNodes.add('leaf-fail-3');
        }
      }
    }
  }

  const renderNode = (id, x, y, label, type = 'decision') => {
    const isActive = activeNodes.has(id) || !highlightRecord;
    
    if (type === 'decision') {
      // Attribute nodes drawn as diamonds (hình thoi)
      return (
        <g key={id}>
          <polygon
            points={`${x},${y - 34} ${x + 85},${y} ${x},${y + 34} ${x - 85},${y}`}
            fill="#ffffff"
            stroke={isActive ? '#8b5cf6' : '#e2e8f0'}
            strokeWidth={isActive ? 3 : 2}
            style={{ transition: 'all 0.3s ease' }}
          />
          <text
            x={x}
            y={y + 5}
            textAnchor="middle"
            fill={isActive ? '#1e293b' : '#94a3b8'}
            fontWeight="bold"
            fontSize="14px"
          >
            {label}
          </text>
        </g>
      );
    } else if (type === 'placeholder') {
      // Dashed diamond placeholder
      const parts = label.split('|');
      const nodeText = parts[0] || '?';
      const subText = parts[1] || '';

      return (
        <g key={id}>
          <polygon
            points={`${x},${y - 30} ${x + 75},${y} ${x},${y + 30} ${x - 75},${y}`}
            fill="#f8fafc"
            stroke="#94a3b8"
            strokeWidth={2}
            strokeDasharray="4,4"
          />
          <text
            x={x}
            y={y + 7}
            textAnchor="middle"
            fill="#64748b"
            fontWeight="bold"
            fontSize="20px"
          >
            {nodeText}
          </text>
          {subText && (
            <g>
              <rect
                x={x - 75}
                y={y + 36}
                width={150}
                height={20}
                rx={4}
                fill="#fef2f2"
                stroke="#fca5a5"
                strokeWidth={1}
              />
              <text
                x={x}
                y={y + 50}
                textAnchor="middle"
                fill="#ef4444"
                fontWeight="bold"
                fontSize="11px"
              >
                {subText}
              </text>
            </g>
          )}
        </g>
      );
    } else {
      // Leaf node drawn as rounded rect (capsule)
      const isKha = label === 'Giỏi' || label === 'Khá giỏi';
      const isTb = label === 'Trung bình khá';
      const isRot = label === 'Không đạt' || label === 'Rớt môn';
      
      let activeColor = '#ef4444'; // Fail (Không đạt / Rớt môn)
      let activeBg = 'rgba(239, 68, 68, 0.05)';
      
      if (isKha) {
        activeColor = '#10b981'; // Success (Giỏi / Khá giỏi)
        activeBg = 'rgba(16, 185, 129, 0.08)';
      } else if (isTb) {
        activeColor = '#f59e0b'; // Warning (Trung bình khá)
        activeBg = 'rgba(245, 158, 11, 0.08)';
      }

      return (
        <g key={id}>
          <rect
            x={x - 70}
            y={y - 25}
            width={140}
            height={50}
            rx={25}
            fill={isActive ? activeBg : '#ffffff'}
            stroke={isActive ? activeColor : '#e2e8f0'}
            strokeWidth={isActive ? 3 : 2}
            style={{ transition: 'all 0.3s ease' }}
          />
          <text
            x={x}
            y={y + 5}
            textAnchor="middle"
            fill={isActive ? activeColor : '#94a3b8'}
            fontWeight="bold"
            fontSize="14px"
          >
            {label}
          </text>
        </g>
      );
    }
  };

  const renderLink = (id, x1, y1, x2, y2, label, labelWidth = 70, offset = {x: 0, y: 0}, yOffset1 = 34, yOffset2 = 34) => {
    const isActive = activeLinks.has(id) || !highlightRecord;
    const midX = (x1 + x2) / 2 + offset.x;
    const midY = (y1 + y2) / 2 + offset.y;

    return (
      <g key={id}>
        <line
          x1={x1}
          y1={y1 + yOffset1}
          x2={x2}
          y2={y2 - yOffset2}
          stroke={isActive ? '#8b5cf6' : '#cbd5e1'}
          strokeWidth={isActive ? 3 : 1.5}
          strokeDasharray={highlightRecord && !isActive ? '4,4' : 'none'}
          style={{ transition: 'all 0.3s ease' }}
        />
        <rect
          x={midX - labelWidth / 2}
          y={midY - 12}
          width={labelWidth}
          height={24}
          rx={4}
          fill="#ffffff"
          stroke={isActive ? '#8b5cf6' : '#cbd5e1'}
          strokeWidth={1}
        />
        <text
          x={midX}
          y={midY + 5}
          textAnchor="middle"
          fill={isActive ? '#8b5cf6' : '#94a3b8'}
          fontSize="12px"
          fontWeight={isActive ? 'bold' : 'normal'}
        >
          {label}
        </text>
      </g>
    );
  };

  return (
    <div className={isSlideshow ? "tree-wrapper-slideshow" : "tree-wrapper-standard"}>
      <svg viewBox="20 0 1080 480" className={isSlideshow ? "tree-svg-slideshow" : "tree-svg-standard"} {...(!isSlideshow ? { width: 1080, height: 480 } : {})}>
        {/* Links */}
        {renderLink('root-left', 560, 50, 240, 170, 'Đi học đủ', 75, {x: -25, y: -10}, 34, (treeState === 'elaborate-1' ? 30 : 34))}
        {renderLink('root-middle', 560, 50, 600, 170, 'Thỉnh thoảng vắng', 125, {x: 10, y: 15}, 34, (treeState === 'full' ? 34 : 30))}
        {renderLink('root-right', 560, 50, 960, 170, 'Thường xuyên vắng', 130, {x: 35, y: -10}, 34, 25)}
        
        {treeState !== 'elaborate-1' && (
          <>
            {renderLink('diem-left-left', 240, 170, 110, 290, '≥5', 45, {x: -15, y: 0}, 34, 25)}
            {renderLink('diem-left-right', 240, 170, 360, 290, '<5', 45, {x: 15, y: 0}, 34, (treeState === 'elaborate-3' || treeState === 'full' ? 34 : 30))}
          </>
        )}
        
        {treeState === 'full' && (
          <>
            {renderLink('diem-mid-left', 600, 170, 540, 290, '≥5', 45, {x: -15, y: 0}, 34, 25)}
            {renderLink('diem-mid-right', 600, 170, 700, 290, '<5', 45, {x: 15, y: 0}, 34, 25)}
          </>
        )}
        
        {(treeState === 'elaborate-3' || treeState === 'full') && (
          <>
            {renderLink('baitap-left', 360, 290, 300, 410, 'Có', 45, {x: -15, y: 0}, 34, 25)}
            {renderLink('baitap-right', 360, 290, 480, 410, 'Không', 55, {x: 15, y: 0}, 34, 25)}
          </>
        )}

        {/* Nodes */}
        {renderNode('root', 560, 50, 'Chuyên cần?')}
        
        {/* Right branch leaf */}
        {renderNode('leaf-fail-1', 960, 170, 'Không đạt', 'leaf')}
        
        {/* Left branch */}
        {treeState === 'elaborate-1' && renderNode('placeholder-left', 240, 170, '?|Mẫu: 1,2,3,4,5,6,15,16', 'placeholder')}
        {treeState !== 'elaborate-1' && (
          <>
            {renderNode('node-diem-left', 240, 170, 'Điểm giữa kỳ?')}
            {renderNode('leaf-kha-1', 110, 290, 'Giỏi', 'leaf')}
            
            {treeState === 'elaborate-2' && renderNode('placeholder-left-right', 360, 290, '?|Mẫu: 4,5,6,16', 'placeholder')}
            {(treeState === 'elaborate-3' || treeState === 'full') && (
              <>
                {renderNode('node-baitap', 360, 290, 'Làm bài tập?')}
                {renderNode('leaf-tb-2', 300, 410, 'Trung bình khá', 'leaf')}
                {renderNode('leaf-fail-3', 480, 410, 'Không đạt', 'leaf')}
              </>
            )}
          </>
        )}
        
        {/* Middle branch */}
        {treeState !== 'full' && renderNode('placeholder-mid', 600, 170, '?|Mẫu: 7,8,9,10', 'placeholder')}
        {treeState === 'full' && (
          <>
            {renderNode('node-diem-mid', 600, 170, 'Điểm giữa kỳ?')}
            {renderNode('leaf-tb-1', 540, 290, 'Trung bình khá', 'leaf')}
            {renderNode('leaf-fail-2', 700, 290, 'Không đạt', 'leaf')}
          </>
        )}
      </svg>
    </div>
  );
}

export default DecisionTreeSVG;
