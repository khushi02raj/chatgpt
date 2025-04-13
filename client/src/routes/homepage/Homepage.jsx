import React from 'react'
import './homepage.css'
import { Link } from 'react-router-dom'
const Homepage = () => {
  return (
    <div className='homepage'>
      <img src='/orbital.png' alt='orbital' className='orbital' />
      <div className="left">
        <h1>Introducing ChatGPT</h1>
        <h2>What can I help with?</h2>
        <Link to="/sign-in">
          Get Started
        </Link>
        
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg">
              {/* <img src="/bg.png" alt="bg" className='bgImg' /> */}
            </div>
          </div>
          <img src="/bot.png" alt="bot" className='bot' />
        </div>
      </div>
    </div>
  )
}

export default Homepage
