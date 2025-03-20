import React, { useState } from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import Chatbot from './components/Chatbot'
import './App.css'

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  const handleToggleChatbot = () => {
    setIsChatbotOpen(prev => !prev)
  }

  return (
    <div className="app">
      <Navbar />
      <About onOpenChatbot={handleToggleChatbot} />
      <Chatbot isOpen={isChatbotOpen} onClose={handleToggleChatbot} />
    </div>
  )
}

export default App
