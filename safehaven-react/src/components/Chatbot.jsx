import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaMicrophone, FaSmile, FaTimes } from 'react-icons/fa';
import { getGeminiResponse } from '../services/gemini';
import './Chatbot.css';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hi! I\'m Shelby, your mental health companion. How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleEmojiSelect = (emoji) => {
    setInputMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    const trimmedMessage = inputMessage.trim();
    setInputMessage('');
    
    if (trimmedMessage) {
      setMessages(prev => [...prev, { type: 'user', content: trimmedMessage }]);
      setIsLoading(true);

      try {
        const botResponse = await getGeminiResponse(trimmedMessage);
        setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
      } catch (error) {
        console.error('Error getting response:', error);
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: "I apologize, but I'm having trouble processing your message right now. Would you like to try again?" 
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages(prev => [...prev, { type: 'user', content: `[File uploaded: ${file.name}]` }]);
    }
  };

  return (
    <div className="chatbot-popup">
      <div className="chatbot-header">
        <h2>Chat with Shelby</h2>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chatbot-input">
        <div className="input-wrapper">
          <div className="emoji-picker-container" ref={emojiPickerRef}>
            <button 
              type="button" 
              className="emoji-button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <FaSmile />
            </button>
            {showEmojiPicker && (
              <div className="emoji-picker">
                {['😊', '😢', '😌', '😔', '😤', '😡', '😴', '😫', '😰', '😨'].map((emoji, index) => (
                  <span 
                    key={index} 
                    className="emoji-option"
                    onClick={() => handleEmojiSelect(emoji)}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <button 
            type="button" 
            className="file-upload-button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            <FaMicrophone />
          </button>
          <button 
            type="submit" 
            className="send-button"
            disabled={isLoading}
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot; 