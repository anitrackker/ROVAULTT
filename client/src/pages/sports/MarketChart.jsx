import React from 'react';
import { motion } from 'framer-motion';

export const MarketChart = ({ data, outcomes, activeIdx = 0 }) => {
  if (!data || data.length === 0 || !outcomes || outcomes.length === 0) {
    return <div className="chart-empty" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '280px', color: '#5d6b8b', fontSize: '14px' }}>No chart data</div>;
  }

  const width = 900;
  const height = 300;
  const padding = 40;
  const rightPadding = 180;

  // Collect all prices for vertical auto-scaling
  const pricesList = [];
  data.forEach(d => {
    if (d.prices) {
      d.prices.forEach(p => pricesList.push(p));
    } else if (d.price !== undefined) {
      pricesList.push(d.price);
      pricesList.push(100 - d.price);
    }
  });
  const actualMin = pricesList.length > 0 ? Math.min(...pricesList) : 0;
  const actualMax = pricesList.length > 0 ? Math.max(...pricesList) : 100;

  // Wider margin (10%) for more vertical separation between lines
  const marginPct = Math.max(8, (actualMax - actualMin) * 0.25);
  const minPrice = Math.max(0, Math.floor(actualMin - marginPct));
  const maxPrice = Math.min(100, Math.ceil(actualMax + marginPct));

  // Dynamic grid ticks
  const gridValues = [];
  const range = maxPrice - minPrice;
  const step = range / 4;
  for (let i = 0; i <= 4; i++) {
    gridValues.push(Math.round(minPrice + step * i));
  }

  const getOutcomeColor = (idx) => {
    if (outcomes.length === 2) {
      return idx === 0 ? '#10b981' : '#ef4444';
    }
    if (outcomes.length === 3) {
      if (idx === 0) return '#3b82f6'; // Home (Blue)
      if (idx === 1) return '#94a3b8'; // Draw (Grey)
      return '#eab308'; // Away (Gold)
    }
    const colors = ['#10b981', '#3b82f6', '#fbbf24', '#a855f7', '#ec4899', '#f97316'];
    return colors[idx % colors.length];
  };

  // Smooth cubic bezier path
  const getBezierPath = (pts) => {
    if (!pts || pts.length === 0) return '';
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 3;
      const cpY1 = p0.y;
      const cpX2 = p0.x + 2 * (p1.x - p0.x) / 3;
      const cpY2 = p1.y;
      d += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${p1.x},${p1.y}`;
    }
    return d;
  };

  // Build points for each outcome line
  const outcomeLines = outcomes.map((outcome, outcomeIdx) => {
    const points = data.map((d, i) => {
      let price = 50;
      if (d.prices && d.prices[outcomeIdx] !== undefined) {
        price = d.prices[outcomeIdx];
      } else if (outcomeIdx === 0) {
        price = d.price || 50;
      } else if (outcomeIdx === 1) {
        price = 100 - (d.price || 50);
      }
      
      const x = padding + (i / (data.length - 1)) * (width - padding - rightPadding);
      const y = height - padding - ((price - minPrice) / (maxPrice - minPrice)) * (height - padding * 2);
      return { x, y, price };
    });

    const pathD = getBezierPath(points);
    const areaD = points.length > 0 
      ? `${pathD} L ${points[points.length - 1].x},${height - padding} L ${points[0].x},${height - padding} Z` 
      : '';
    const color = getOutcomeColor(outcomeIdx);
    const isActive = activeIdx === outcomeIdx;

    return { name: outcome.name, points, pathD, areaD, color, isActive };
  });

  // Anti-collision: sort labels by y position and spread them if too close
  const labelData = outcomeLines.map((line, idx) => {
    if (line.points.length === 0) return null;
    const endPoint = line.points[line.points.length - 1];
    return { idx, name: line.name, price: endPoint.price, x: endPoint.x, y: endPoint.y, color: line.color, isActive: line.isActive };
  }).filter(Boolean);

  labelData.sort((a, b) => a.y - b.y);
  const MIN_LABEL_GAP = 22;
  for (let i = 1; i < labelData.length; i++) {
    if (labelData[i].y - labelData[i - 1].y < MIN_LABEL_GAP) {
      labelData[i].y = labelData[i - 1].y + MIN_LABEL_GAP;
    }
  }

  return (
    <div className="market-chart-container" style={{ position: 'relative', width: '100%', height: '280px' }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          {outcomeLines.map((line, idx) => (
            <linearGradient key={idx} id={`gradient-outcome-${idx}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={line.color} stopOpacity={line.isActive ? 0.15 : 0.03} />
              <stop offset="100%" stopColor={line.color} stopOpacity={0} />
            </linearGradient>
          ))}
          <filter id="label-bg">
            <feFlood floodColor="#0d0f17" floodOpacity="0.85" result="bg" />
            <feMerge>
              <feMergeNode in="bg" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid Lines */}
        {gridValues.map((val, i) => {
          const y = height - padding - ((val - minPrice) / (maxPrice - minPrice)) * (height - padding * 2);
          return (
            <g key={i}>
              <line x1={padding} y1={y} x2={width - rightPadding} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <text x={4} y={y + 4} fill="#4a5578" fontSize="10" fontFamily="monospace">{val}%</text>
            </g>
          );
        })}

        {/* Area fills (only for active line) */}
        {outcomeLines.map((line, idx) => (
          line.isActive ? (
            <motion.path
              key={`area-${idx}`}
              d={line.areaD}
              fill={`url(#gradient-outcome-${idx})`}
              animate={{ d: line.areaD }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          ) : null
        ))}

        {/* Line paths */}
        {outcomeLines.map((line, idx) => (
          <motion.path
            key={`line-${idx}`}
            d={line.pathD}
            fill="none"
            stroke={line.color}
            strokeWidth={line.isActive ? "3" : "1.8"}
            strokeOpacity={line.isActive ? 1 : 0.6}
            strokeDasharray={line.isActive ? "none" : "6,3"}
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ d: line.pathD }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        ))}

        {/* End dots and labels with collision avoidance */}
        {labelData.map((label) => {
          const line = outcomeLines[label.idx];
          const endPoint = line.points[line.points.length - 1];
          // Truncate long names for label display
          const displayName = label.name.length > 18 ? label.name.substring(0, 18) + '…' : label.name;
          return (
            <g key={`label-${label.idx}`}>
              {/* Dot at end of line */}
              <motion.circle
                cx={endPoint.x}
                cy={endPoint.y}
                r={label.isActive ? "4" : "3"}
                fill={label.color}
                animate={{ cx: endPoint.x, cy: endPoint.y }}
                transition={{ duration: 0.4 }}
              />
              {/* Connecting line from dot to label (if label was shifted) */}
              {Math.abs(label.y - endPoint.y) > 3 && (
                <line 
                  x1={endPoint.x} y1={endPoint.y} 
                  x2={endPoint.x + 8} y2={label.y} 
                  stroke={label.color} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2,2" 
                />
              )}
              {/* Label text */}
              <text
                x={endPoint.x + 12}
                y={label.y + 5}
                fill={label.color}
                fontSize={label.isActive ? "14" : "13"}
                fontWeight={label.isActive ? "700" : "600"}
                fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
              >
                {displayName} {Math.round(label.price)}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
