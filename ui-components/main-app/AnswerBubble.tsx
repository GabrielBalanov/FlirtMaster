import React from 'react';
import './styles/AnswerBubble.css';

interface AnswerBubbleProps {
  text: string;
  onCopy?: () => void;
}

const AnswerBubble: React.FC<AnswerBubbleProps> = ({ text, onCopy }) => {
  const handleCopy = () => {
    if (onCopy) {
      onCopy();
    }
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="answer-bubble">
      <p className="answer-text">{text}</p>
      <button onClick={handleCopy} className="copy-button" aria-label="Copy text">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>
  );
};

export default AnswerBubble;