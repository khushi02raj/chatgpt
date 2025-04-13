import React from 'react'
import './chatList.css'
import { Link } from 'react-router-dom'

const ChatList = () => {
  return (
    <div className='chatList'>
      <span className='title'>DASHBOARD</span>
      <Link to='/dashboard' className='link'></Link>
      <Link to='/' >Explore Lama AI</Link>
      <Link to='/' >Contact</Link>
      <hr/>
      <div className="list">
        <Link to='/' className='link'></Link>
        <Link to='/' className='link'></Link>   
        <Link to='/' className='link'>Chat</Link>
      </div>
      <hr/>
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to Lama AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  )
}

export default ChatList
