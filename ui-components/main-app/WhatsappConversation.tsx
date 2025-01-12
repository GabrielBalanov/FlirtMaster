import React from 'react';
import './styles/WhatsappConversation.css';

interface Message {
  id: number;
  text: string;
  isSent: boolean;
  timestamp: string;
}

interface WhatsappConversationProps {
  messages: Message[];
  onSend?: (message: string) => void;
}

const WhatsappConversation: React.FC<WhatsappConversationProps> = ({ 
  messages = [],
  onSend 
}) => {
  const [newMessage, setNewMessage] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() && onSend) {
      onSend(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="whatsapp-container">
      <div className="whatsapp-header">
        <div className="contact-info">
          <div className="contact-avatar">
            <img src="/placeholder.svg?height=40&width=40" alt="Contact" />
          </div>
          <div className="contact-details">
            <div className="contact-name">Sarah</div>
            <div className="contact-status">online</div>
          </div>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.isSent ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              {message.text}
              <span className="message-timestamp">{message.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <textarea
          className="message-input amplify-textarea"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={1}
        />
        <button 
          className="send-button move-on-button"
          onClick={handleSend}
          disabled={!newMessage.trim()}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M22 2L11 13" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M22 2L15 22L11 13L2 9L22 2Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WhatsappConversation;