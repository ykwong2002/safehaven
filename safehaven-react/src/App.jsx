import React, { useState } from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import Chatbot from './components/Chatbot'
import './App.css'

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  const handleOpenChatbot = () => {
    setIsChatbotOpen(true)
  }

  const handleCloseChatbot = () => {
    setIsChatbotOpen(false)
  }

  return (
    <div className="app">
      <Navbar />
      <About onOpenChatbot={handleOpenChatbot} />
      <Chatbot isOpen={isChatbotOpen} onClose={handleCloseChatbot} />
    </div>
  )
}

export default App
