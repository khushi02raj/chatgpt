import React from 'react'
import './dashboardPage.css'

const DashboardPage = () => {
  return (
    <div className='dashboardPage'>
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />
          <span>Lama AI</span>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a new Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form>
          <input type="text" 
          placeholder='Ask me anything...' />
          <button >
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default DashboardPage
