import React from 'react'
import './chatPage.css'
import NewPrompt from '../../components/newPrompt/NewPrompt'

const ChatPage = () => {
  
  return (
    <div className='chatPage'>
      <div className="wrapper">
        <div className="chat">
          <div className="message">Test message</div>
          <div className="message user">User</div>
          <div className="message">Test message</div>
          <div className="message user">User</div>
          <div className="message">Test message</div>
          <div className="message user">User</div>
          <div className="message">Test message</div>
          <div className="message user">User</div>
          <div className="message">Test message</div>
          <div className="message user">User</div>
          <NewPrompt/>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
