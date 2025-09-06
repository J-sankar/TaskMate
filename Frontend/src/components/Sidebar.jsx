import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import styles from  './Sidebar.module.css'
import {GridViewOutlined,AssignmentOutlined, GroupsOutlined,CalendarMonthOutlined,AnalyticsOutlined,SettingsOutlined,SupportOutlined,LogoutOutlined} from '@mui/icons-material'




const Sidebar = () => {
  return (
    <div className='flex flex-col items-baseline px-4 py-9 justify-baseline gap-7 h-screen w-[20vw] rounded-2xl  bg-gray-100 shadow-gray-400'>
      <Logo classname='flex justify-center  align-baseline items-center gap-5 mr-10 ' size='text-xl'/>

      <div className="menu flex flex-col pb-1.5 gap-2 w-[80%] items-baseline  align-baseline" style={styles.menu}>
        <p style={styles}>MENU</p>
        
       <Link className={styles.link}  to='/dashboard' ><GridViewOutlined fontSize='small'/>  Dashboard</Link>
       <Link className={styles.link} to='/dashboard'><AssignmentOutlined fontSize='small'/> Tasks</Link>
       <Link className={styles.link} to='/tasks'><GroupsOutlined fontSize='small'/> Team</Link>
       <Link  className={styles.link} to='/calendar'><CalendarMonthOutlined fontSize='small'/> Calendar</Link>
       <Link className={styles.link} to='/analytics'><AnalyticsOutlined fontSize='small'/> Analytics</Link>
      </div>
      <div className="menu flex flex-col  gap-2 w-[80%]  align-baseline" style={styles.menu}>
        <p style={styles.p}>GENERAL</p>
       <Link className={styles.link} to='/setings'><SettingsOutlined fontSize='small'/> Setting</Link>
       <Link className={styles.link} to='/help'><SupportOutlined fontSize='small'/> Help</Link>
       <Link  className={styles.link} to='/logout'><LogoutOutlined fontSize='small'/>  Logout</Link>

      </div>
    </div>
  )
}

export default Sidebar
