import { useState, useRef, useEffect } from 'react'
import { Menu, PlusCircle, Info, Image, FileText, Lightbulb, MoreHorizontal, Camera, Folder, Globe, Mic, Send, Plus } from 'lucide-react'
import './styles/Dashboard.css';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
};

const UserBubble = ({ text }: { text: string }) => (
  <div className="flex justify-end mb-2 sm:mb-4">
    <div className="max-w-[80%] sm:max-w-[70%] p-2 sm:p-3 rounded-lg bg-gradient-to-r from-[#a6f2de] to-[#00c88f] text-black text-sm sm:text-base">
      {text}
    </div>
  </div>
);

const AIBubble = ({ text }: { text: string }) => (
  <div className="flex justify-start mb-2 sm:mb-4">
    <div className="max-w-[80%] sm:max-w-[70%] p-2 sm:p-3 rounded-lg bg-[#d5d5d6] text-black text-sm sm:text-base">
      {text}
    </div>
  </div>
);

export default function ChatInterface() {
  const [message, setMessage] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [conversation, setConversation] = useState<Message[]>([])
  const chatEndRef = useRef<HTMLDivElement>(null)

  const handlePlusClick = () => {
    setShowOptions(true)
    setIsFocused(true)
  }

  const handleBlur = () => {
    setShowOptions(false)
    setIsFocused(false)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const newUserMessage: Message = {
        id: Date.now(),
        text: message,
        sender: 'user'
      }
      setConversation(prev => [...prev, newUserMessage])
      setMessage('')

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          text: `AI response to: "${message}"`,
          sender: 'ai'
        }
        setConversation(prev => [...prev, aiResponse])
      }, 1000)
    }
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation])

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#2f427a] to-[#1a1d28] text-[#a4d4cb] font-sans flex flex-col p-2 sm:p-4">
      {/* Status Bar */}
      <div className="flex justify-between items-center p-2 text-xs">
        <span>6:59</span>
        <div className="flex items-center space-x-1">
          <span>VoLTE</span>
          <span>56%</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center p-2 sm:p-4">
        <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        <button className="bg-[#3d5a8f] text-white px-2 py-1 sm:px-4 sm:py-1 rounded-full flex items-center text-xs sm:text-sm">
          <PlusCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          Get Plus
        </button>
        <MoreHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Memory Toggle */}
      <div className="flex items-center justify-center space-x-2 text-[#a4d4cb] mb-4">
        <span className="text-lg">Memory off</span>
        <Info className="w-5 h-5" />
      </div>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto px-4 py-2">
        {conversation.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-8 text-center">What can I help with?</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mx-auto">
              <button className="bg-[#2f427a] text-white p-3 rounded-lg flex items-center">
                <Image className="w-5 h-5 mr-2" />
                Create image
              </button>
              <button className="bg-[#2f427a] text-white p-3 rounded-lg flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Summarize text
              </button>
              <button className="bg-[#2f427a] text-white p-3 rounded-lg flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Make a plan
              </button>
              <button className="bg-[#2f427a] text-white p-3 rounded-lg flex items-center">
                <MoreHorizontal className="w-5 h-5 mr-2" />
                More
              </button>
            </div>
          </div>
        ) : (
          conversation.map(msg => 
            msg.sender === 'user' 
              ? <UserBubble key={msg.id} text={msg.text} />
              : <AIBubble key={msg.id} text={msg.text} />
          )
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-2 sm:p-4">
        {showOptions && (
          <div className="flex justify-start space-x-2 sm:space-x-4 mb-2">
            <button className="bg-[#3d5a8f] p-1 sm:p-2 rounded-full">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-[#a4d4cb]" />
            </button>
            <button className="bg-[#3d5a8f] p-1 sm:p-2 rounded-full">
              <Image className="w-4 h-4 sm:w-5 sm:h-5 text-[#a4d4cb]" />
            </button>
            <button className="bg-[#3d5a8f] p-1 sm:p-2 rounded-full">
              <Folder className="w-4 h-4 sm:w-5 sm:h-5 text-[#a4d4cb]" />
            </button>
            <button className="bg-[#3d5a8f] p-1 sm:p-2 rounded-full">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#a4d4cb]" />
            </button>
          </div>
        )}
        <div className="flex justify-between items-center bg-[#2f427a] rounded-full p-1 sm:p-2">
          {!showOptions && (
            <button 
              className="bg-[#3d5a8f] p-1 sm:p-2 rounded-full mr-1 sm:mr-2"
              onClick={handlePlusClick}
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-[#a4d4cb]" />
            </button>
          )}
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            className="bg-transparent text-white flex-grow mx-1 sm:mx-2 text-sm sm:text-base focus:outline-none"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button 
            className="bg-[#a4d4cb] p-1 sm:p-2 rounded-full"
            onClick={handleSendMessage}
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5 text-[#2f427a]" />
          </button>
        </div>
      </div>
    </div>
  )
}