import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import './dashboardLayout.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatList from '../../components/chatList/ChatList'

const DashboardLayout = () => {
  const {userId,isLoaded}= useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in')
    }
  }, [isLoaded, userId, navigate])

  if(!isLoaded) 
  return <div className='loading'>Loading...</div>

  return (
    <div className='dashboardLayout'>
      <div className="menu"><ChatList/></div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  )
}

export default DashboardLayout
