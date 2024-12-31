import React from 'react';
import './styles/UserDashboard.css'; 
import logo from '@/assets/flirtmaster-logo.png'

const SplashScreen = () => {
  const handleGetStarted = () => {
    // Navigation logic can be implemented later when routing is set up
    console.log('Get Started clicked');
  };

  return (
    <div className="splash-screen">
      {/* Header */}
      <div className="splash-header">
        <img 
          src={logo}
          alt="FlirtMaster" 
          className="splash-logo"
        />
        <button className="menu-button">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M3 12H21M3 6H21M3 18H21" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="splash-content">
        {/* AI Powered Badge */}
        <div className="ai-badge">
          <span className="fire-icon">🔥</span>
          <span>AI powered</span>
        </div>

        {/* Title Section */}
        <h1 className="splash-title">
          Texts to Dates
          <span className="highlight">Made Super Easy!</span>
        </h1>

        {/* Description */}
        <p className="splash-description">
          Boost your texting skills with women now!
          Get more dates with the #1 texting assistant.
          Avoid beeing ghosted or stuck in your texts
        </p>

        {/* Chat Images */}
        <div className="chat-images">
          <div className="phone-mockup">
            <img 
              src="/placeholder.svg?height=400&width=200" 
              alt="Phone with chat messages"
              className="phone-image"
            />
          </div>
          <div className="chat-bubbles">
            <img 
              src="/placeholder.svg?height=400&width=200" 
              alt="Chat conversation examples"
              className="bubbles-image"
            />
          </div>
        </div>

        {/* Let's Go Button */}
        <button 
          className="move-on-button splash-cta"
          onClick={handleGetStarted}
        >
          LET'S GO!
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;