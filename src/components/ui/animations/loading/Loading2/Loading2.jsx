import React from 'react';
import './Loading2.css'

function Loading2({ size = 1 }) {
  const width = 24 * size;
  const height = 30 * size;
  const rectWidth = 4 * size;
  const rectHeight = 10 * size;
  const spacing = 8 * size;

  return (
    <div className="loading-2-container">
      <div className="loader loader--style8" title="7">
      <svg
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        width={`${width}px`}
        height={`${height}px`}
        viewBox={`0 0 ${width} ${height}`}
        xmlSpace="preserve"
      >
        <rect
          x="0"
          y={10 * size}
          width={rectWidth}
          height={rectHeight}
          fill="#333"
          opacity="0.2"
        >
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="0.2; 1; .2"
            begin="0s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="height"
            attributeType="XML"
            values={`${rectHeight}; ${rectHeight * 2}; ${rectHeight}`}
            begin="0s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values={`${10 * size}; ${5 * size}; ${10 * size}`}
            begin="0s"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={spacing}
          y={10 * size}
          width={rectWidth}
          height={rectHeight}
          fill="#333"
          opacity="0.2"
        >
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="0.2; 1; .2"
            begin="0.15s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="height"
            attributeType="XML"
            values={`${rectHeight}; ${rectHeight * 2}; ${rectHeight}`}
            begin="0.15s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values={`${10 * size}; ${5 * size}; ${10 * size}`}
            begin="0.15s"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={spacing * 2}
          y={10 * size}
          width={rectWidth}
          height={rectHeight}
          fill="#333"
          opacity="0.2"
        >
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="0.2; 1; .2"
            begin="0.3s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="height"
            attributeType="XML"
            values={`${rectHeight}; ${rectHeight * 2}; ${rectHeight}`}
            begin="0.3s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values={`${10 * size}; ${5 * size}; ${10 * size}`}
            begin="0.3s"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
    </div>
    
  );
}

export default Loading2;
