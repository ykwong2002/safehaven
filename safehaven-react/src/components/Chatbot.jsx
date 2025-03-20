import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: `Hi there, I'm Shelby! 😊 Think of me as your safe space to let it all out.  

I'm here to listen - whether you want to vent, share what's been on your mind, or just chat about anything at all. No judgments, no pressure, just a friendly ear whenever you need one.  

Take your time - this is your moment, and I'm here to support you. What's on your mind?`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: inputMessage }]);
    setInputMessage('');
    // Here you would typically make an API call to your chatbot backend
    // For now, we'll just simulate a response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "I hear you, and I'm here to support you. Would you like to tell me more about what's on your mind?" 
      }]);
    }, 1000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileUploaded(true);
      // Here you would typically handle the file upload
    }
  };

  return (
    <>
      <button 
        id="chatbot-toggler" 
        onClick={onClose}
        className={isOpen ? 'show' : ''}
      >
        <span className="material-symbols-rounded">hearing</span>
        <span className="material-symbols-rounded">close</span>
      </button>

      <div className={`chatbot-popup ${isOpen ? 'show' : ''}`}>
        <div className="chat-header">
          <div className="header-info">
            <svg className="chatbot-logo" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
              <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
            </svg>
            <h2 className="logo-text">Shelby</h2>
          </div>
          <button id="close-chatbot" className="material-symbols-rounded" onClick={onClose}>
            keyboard_arrow_down
          </button>
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}-message`}>
              {message.type === 'bot' && (
                <svg className="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                  <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
                </svg>
              )}
              <div className="message-text">{message.content}</div>
            </div>
          ))}
        </div>

        <div className="chat-footer">
          <form onSubmit={handleSubmit} className="chat-form">
            <textarea
              placeholder="Message..."
              className="message-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              required
            />
            <div className="chat-controls">
              <button
                type="button"
                id="emoji-picker"
                className="material-symbols-outlined"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                sentiment_satisfied
              </button>

              <div className={`file-upload-wrapper ${fileUploaded ? 'file-uploaded' : ''}`}>
                <input
                  type="file"
                  accept="images/*"
                  id="file-input"
                  onChange={handleFileUpload}
                  hidden
                />
                <button
                  type="button"
                  id="file-upload"
                  className="material-symbols-rounded"
                  onClick={() => document.getElementById('file-input').click()}
                >
                  attach_file
                </button>
                {fileUploaded && (
                  <button
                    type="button"
                    id="file-cancel"
                    className="material-symbols-rounded"
                    onClick={() => setFileUploaded(false)}
                  >
                    close
                  </button>
                )}
              </div>
              
              <button type="submit" id="send-message" className="material-symbols-rounded">
                arrow_upward
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot; 