import React from 'react'
import { useEffect } from 'react'
import DashboardNavbar from '../components/Dashboard/DashboardNavbar'
import Sidebar from '../components/Dashboard/Sidebar'
import MainSection from '../components/Dashboard/MainSection'

const Dashboard = () => {
 
  
  return (
    
    <div className='flex gap-1.5 min-h-screen px-2.5 py-1.5 bg-white'>
      <Sidebar />
      <div className='flex flex-col flex-1'>

      <DashboardNavbar />
      <MainSection className/>
      </div>
     
    </div>
  )
}

export default Dashboard
