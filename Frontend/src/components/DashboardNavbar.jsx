import React from 'react'
import {NotificationsNoneOutlined,SearchOutlined} from '@mui/icons-material'
import styles from './Dashboardnavbar.module.css'

const  DashboardNavbar = () => {
  return (
    <div className='flex justify-between items-center px-5  h-[10vh] rounded-2xl w-screen bg-gray-100'>
      <div className="searchbox border-none bg-white px-2 rounded-4xl flex justify-between items-center shadow-4 ">
        <SearchOutlined className='text-gray-500'/>
        <input type="text" placeholder='Search Tasks' className="ml-2 border-none  outline-none border-0 w-full h-full  bg-transparent  placeholder-gray-400" style={{ boxShadow: 'none', border: 'none' }}/>
      </div>
     
    <div className="flexbox flex justify-center items center gap-1.5">

     <NotificationsNoneOutlined className='bg-white ml-5 border-none shadow-md w-10 h-10 rounded-2xl' fontSize='medium'/>

      
     <div className="profile bg-white ">Your Profile</div>
    </div>
    </div>
  )
}

export default DashboardNavbar

