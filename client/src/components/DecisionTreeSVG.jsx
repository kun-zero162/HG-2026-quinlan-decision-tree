import React from 'react';

function DecisionTreeSVG({ highlightRecord, isSlideshow, activeSlideIndex, treeState: propTreeState }) {
  // Determine tree build state based on activeSlideIndex or direct prop
  let treeState = 'full';
  if (propTreeState) {
    treeState = propTreeState;
  } else if (activeSlideIndex !== undefined) {
    if (activeSlideIndex >= 13 && activeSlideIndex <= 18) {
      treeState = 'elaborate-1';
    } else if (activeSlideIndex >= 19 && activeSlideIndex <= 22) {
      treeState = 'elaborate-2';
    } else if (activeSlideIndex >= 23 && activeSlideIndex <= 25) {
      treeState = 'elaborate-3';
    }
  }

  // Determine which paths/nodes to highlight based on the highlightRecord values.
  let hasCustomHighlight = false;
  const activeNodes = new Set();
  const activeLinks = new Set();

  if (activeSlideIndex === 16 && treeState === 'elaborate-2') {
    hasCustomHighlight = true;
    activeNodes.add('root');
    activeLinks.add('root-left');
    activeNodes.add('node-diem-left');
    activeLinks.add('diem-left-left');
    activeNodes.add('leaf-kha-1');
  } else if (activeSlideIndex === 17 && treeState === 'elaborate-3') {
    hasCustomHighlight = true;
    activeNodes.add('root');
    activeLinks.add('root-left');
    activeNodes.add('node-diem-left');
    activeLinks.add('diem-left-left');
    activeNodes.add('leaf-kha-1');
    activeLinks.add('diem-left-right');
    activeNodes.add('node-baitap');
    activeLinks.add('baitap-left');
    activeNodes.add('leaf-tb-2');
    activeLinks.add('baitap-right');
    activeNodes.add('leaf-fail-3');
  } else if (activeSlideIndex === 18 && treeState === 'full') {
    hasCustomHighlight = true;
    // Add all nodes to light up the entire tree
    activeNodes.add('root');
    activeNodes.add('node-diem-left');
    activeNodes.add('leaf-kha-1');
    activeNodes.add('node-baitap');
    activeNodes.add('leaf-tb-2');
    activeNodes.add('leaf-fail-3');
    activeNodes.add('node-diem-mid');
    activeNodes.add('leaf-tb-1');
    activeNodes.add('leaf-fail-2');
    activeNodes.add('leaf-fail-1');

    // Add all links to light up the entire tree
    activeLinks.add('root-left');
    activeLinks.add('diem-left-left');
    activeLinks.add('diem-left-right');
    activeLinks.add('baitap-left');
    activeLinks.add('baitap-right');
    activeLinks.add('root-middle');
    activeLinks.add('diem-mid-left');
    activeLinks.add('diem-mid-right');
    activeLinks.add('root-right');
  } else if (highlightRecord) {
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
    const isActive = hasCustomHighlight ? activeNodes.has(id) : (activeNodes.has(id) || !highlightRecord);

    if (type === 'decision') {
      // Attribute nodes drawn as diamonds (hình thoi) - Enlarged
      return (
        <g key={id}>
          <polygon
            points={`${x},${y - 45} ${x + 110},${y} ${x},${y + 45} ${x - 110},${y}`}
            fill="#ffffff"
            stroke={isActive ? '#8b5cf6' : '#e2e8f0'}
            strokeWidth={isActive ? 3 : 2}
            style={{ transition: 'all 0.3s ease' }}
          />
          <text
            x={x}
            y={y + 6}
            textAnchor="middle"
            fill={isActive ? '#1e293b' : '#94a3b8'}
            fontWeight="bold"
            fontSize="18px"
          >
            {label}
          </text>
        </g>
      );
    } else if (type === 'placeholder') {
      // Dashed diamond placeholder - Enlarged
      const parts = label.split('|');
      const nodeText = parts[0] || '?';
      const subText = parts[1] || '';

      return (
        <g key={id}>
          <polygon
            points={`${x},${y - 40} ${x + 100},${y} ${x},${y + 40} ${x - 100},${y}`}
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
            fontSize="22px"
          >
            {nodeText}
          </text>
          {subText && (
            <g>
              <rect
                x={x - 100}
                y={y + 46}
                width={200}
                height={24}
                rx={4}
                fill="#fef2f2"
                stroke="#fca5a5"
                strokeWidth={1}
              />
              <text
                x={x}
                y={y + 62}
                textAnchor="middle"
                fill="#ef4444"
                fontWeight="bold"
                fontSize="13px"
              >
                {subText}
              </text>
            </g>
          )}
        </g>
      );
    } else {
      // Leaf node drawn as rounded rect (capsule) - Enlarged
      const isKha = label === 'Giỏi' || label === 'Khá giỏi' || label === 'Lên lớp';
      const isTb = label === 'Trung bình khá';
      const isRot = label === 'Không đạt' || label === 'Rớt môn' || label === 'Không lên lớp';

      let activeColor = '#ef4444'; // Fail (Không đạt / Rớt môn / Không lên lớp)
      let activeBg = 'rgba(239, 68, 68, 0.05)';

      if (isKha) {
        activeColor = '#10b981'; // Success (Giỏi / Khá giỏi / Lên lớp)
        activeBg = 'rgba(16, 185, 129, 0.08)';
      } else if (isTb) {
        activeColor = '#f59e0b'; // Warning (Trung bình khá)
        activeBg = 'rgba(245, 158, 11, 0.08)';
      }

      return (
        <g key={id}>
          <rect
            x={x - 90}
            y={y - 30}
            width={180}
            height={60}
            rx={30}
            fill={isActive ? activeBg : '#ffffff'}
            stroke={isActive ? activeColor : '#e2e8f0'}
            strokeWidth={isActive ? 3 : 2}
            style={{ transition: 'all 0.3s ease' }}
          />
          <text
            x={x}
            y={y + 6}
            textAnchor="middle"
            fill={isActive ? activeColor : '#94a3b8'}
            fontWeight="bold"
            fontSize="18px"
          >
            {label}
          </text>
        </g>
      );
    }
  };

  const renderLink = (id, x1, y1, x2, y2, label, labelWidth = 70, offset = { x: 0, y: 0 }, yOffset1 = 34, yOffset2 = 34) => {
    const isActive = hasCustomHighlight ? activeLinks.has(id) : (activeLinks.has(id) || !highlightRecord);
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
      <svg viewBox="20 0 1080 800" className={isSlideshow ? "tree-svg-slideshow" : "tree-svg-standard"} {...(!isSlideshow ? { width: 1080, height: 800 } : {})}>
        {/* Links */}
        {renderLink('root-left', 560, 80, 240, 280, 'Đi học đủ', 75, { x: -25, y: -10 }, 45, (treeState === 'elaborate-1' ? 40 : 45))}
        {renderLink('root-middle', 560, 80, 660, 280, 'Thỉnh thoảng vắng', 125, { x: 10, y: 15 }, 45, (treeState === 'full' ? 45 : 40))}
        {renderLink('root-right', 560, 80, 960, 280, 'Thường xuyên vắng', 130, { x: 35, y: -10 }, 45, 30)}

        {treeState !== 'elaborate-1' && (
          <>
            {renderLink('diem-left-left', 240, 280, 110, 480, '≥5', 45, { x: -15, y: 0 }, 45, 30)}
            {renderLink('diem-left-right', 240, 280, 360, 480, '<5', 45, { x: 15, y: 0 }, 45, (treeState === 'elaborate-3' || treeState === 'full' ? 45 : 40))}
          </>
        )}

        {treeState === 'full' && (
          <>
            {renderLink('diem-mid-left', 660, 280, 560, 480, '≥5', 45, { x: -15, y: 0 }, 45, 30)}
            {renderLink('diem-mid-right', 660, 280, 760, 480, '<5', 45, { x: 15, y: 0 }, 45, 30)}
          </>
        )}

        {(treeState === 'elaborate-3' || treeState === 'full') && (
          <>
            {renderLink('baitap-left', 360, 480, 250, 680, 'Có', 45, { x: -15, y: 0 }, 45, 30)}
            {renderLink('baitap-right', 360, 480, 470, 680, 'Không', 55, { x: 15, y: 0 }, 45, 30)}
          </>
        )}

        {/* Nodes */}
        {renderNode('root', 560, 80, 'Chuyên cần?')}

        {/* Right branch leaf */}
        {renderNode('leaf-fail-1', 960, 280, 'Không lên lớp', 'leaf')}

        {/* Left branch */}
        {treeState === 'elaborate-1' && renderNode('placeholder-left', 240, 280, '?|Mẫu: 1,2,3,4,5,6,15,16', 'placeholder')}
        {treeState !== 'elaborate-1' && (
          <>
            {renderNode('node-diem-left', 240, 280, 'Điểm giữa kỳ?')}
            {renderNode('leaf-kha-1', 110, 480, 'Lên lớp', 'leaf')}

            {treeState === 'elaborate-2' && renderNode('placeholder-left-right', 360, 480, '?|Mẫu: 4,5,6,16', 'placeholder')}
            {(treeState === 'elaborate-3' || treeState === 'full') && (
              <>
                {renderNode('node-baitap', 360, 480, 'Làm bài tập?')}
                {renderNode('leaf-tb-2', 250, 680, 'Lên lớp', 'leaf')}
                {renderNode('leaf-fail-3', 470, 680, 'Không lên lớp', 'leaf')}
              </>
            )}
          </>
        )}

        {/* Middle branch */}
        {treeState !== 'full' && renderNode('placeholder-mid', 660, 280, '?|Mẫu: 7,8,9,10', 'placeholder')}
        {treeState === 'full' && (
          <>
            {renderNode('node-diem-mid', 660, 280, 'Điểm giữa kỳ?')}
            {renderNode('leaf-tb-1', 560, 480, 'Lên lớp', 'leaf')}
            {renderNode('leaf-fail-2', 760, 480, 'Không lên lớp', 'leaf')}
          </>
        )}
      </svg>
    </div>
  );
}

export default DecisionTreeSVG;
