import React, { useEffect, useRef } from 'react';
import './tooltip.css';

function ToolTip(props) {
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handlePosition = () => {
      if (tooltipRef.current) {
        const tooltipToggle = tooltipRef.current.querySelector('.tooltip-toggle');
        const { left, right } = tooltipToggle.getBoundingClientRect();
        const offset = 180; // Adjust based on tooltip width and desired edge distance

        // Check if near the right edge
        if (right > window.innerWidth - offset) {
          tooltipToggle.classList.add('left');
          tooltipToggle.classList.remove('below');
        } 
        // Check if near the left edge
        else if (left < offset) {
          tooltipToggle.classList.add('below');
          tooltipToggle.classList.remove('left');
        } 
        // Default positioning
        else {
          tooltipToggle.classList.remove('left');
          tooltipToggle.classList.remove('below');
        }
      }
    };

    handlePosition();
    window.addEventListener('resize', handlePosition);
    return () => window.removeEventListener('resize', handlePosition);
  }, []);

  return (
    <div className="container" ref={tooltipRef}>
      <div className="label">
        <span className="tooltip-toggle" aria-label={props.text} tabIndex="0">
          <svg viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg">
            <g fillRule="evenodd">
              <path fill="black" d="M13.5 27C20.956 27 27 20.956 27 13.5S20.956 0 13.5 0 0 6.044 0 13.5 6.044 27 13.5 27zm0-2C7.15 25 2 19.85 2 13.5S7.15 2 13.5 2 25 7.15 25 13.5 19.85 25 13.5 25z"/>
              <path fill="black" d="M12.05 7.64c0-.228.04-.423.12-.585.077-.163.185-.295.32-.397.138-.102.298-.177.48-.227.184-.048.383-.073.598-.073.203 0 .398.025.584.074.186.05.35.126.488.228.14.102.252.234.336.397.084.162.127.357.127.584 0 .22-.043.412-.127.574-.084.163-.196.297-.336.4-.14.106-.302.185-.488.237-.186.053-.38.08-.584.08-.215 0-.414-.027-.597-.08-.182-.05-.342-.13-.48-.235-.135-.104-.243-.238-.32-.4-.08-.163-.12-.355-.12-.576zm-1.02 11.517c.134 0 .275-.013.424-.04.148-.025.284-.08.41-.16.124-.082.23-.198.313-.35.085-.15.127-.354.127-.61v-5.423c0-.238-.042-.43-.127-.57-.084-.144-.19-.254-.318-.332-.13-.08-.267-.13-.415-.153-.148-.024-.286-.036-.414-.036h-.21v-.95h4.195v7.463c0 .256.043.46.127.61.084.152.19.268.314.35.125.08.263.135.414.16.15.027.29.04.418.04h.21v.95H10.82v-.95h.21z"/>
            </g>
          </svg>
        </span>
        <span className="label-text">{props.title}</span>
      </div>
    </div>
  );
}

export default ToolTip;
