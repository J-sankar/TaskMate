import React from 'react'
import { useEffect } from 'react'
import DashboardNavbar from '../components/dashboardNavbar'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
 
  
  return (
    <div className='flex gap-1.5 justify-center p-2 bg-white'>
      <Sidebar />
      <DashboardNavbar />
     
    </div>
  )
}

export default Dashboard
