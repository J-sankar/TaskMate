import React from 'react'
import Logo from '../Logo'
import { Link, useNavigate } from 'react-router-dom'
import styles from  './Sidebar.module.css'
import {GridViewOutlined,AssignmentOutlined, GroupsOutlined,CalendarMonthOutlined,AnalyticsOutlined,SettingsOutlined,SupportOutlined,LogoutOutlined} from '@mui/icons-material'
import axios from 'axios'



const Sidebar = () => {
  const navigate = useNavigate()
  const handleClick = async ()=>{
    try {
      
      const response = await axios.post('http://localhost:3000/auth/logout',{},{
        withCredentials:true
      })
      console.log(response.data)
      if(response.status == 200){
        navigate('/')
      }


    } catch (error) {
       console.log(error.message)
    }
  }
  return (
    <div className='shadow-violet-700 flex flex-col items-baseline px-4 py-9 justify-baseline gap-7 h-screen w-[20vw] rounded-2xl  bg-gray-100 '>
      <Logo classname='flex justify-center  align-baseline items-center gap-5 mr-10 ' size='text-xl'/>

      <div className="menu flex flex-col pb-1.5 gap-2 w-[80%] items-baseline  align-baseline" style={styles.menu}>
        <p className={styles.para}>MENU</p>
        
     
        <Link 
  className='group hover:scale-110 transition-transform duration-300 ease-in-out flex items-center gap-2 text-gray-500' 
  to='/dashboard'
>
  <GridViewOutlined fontSize='small' className='group-hover:text-violet-900 group-hover:font-semibold' />  
  <span className='group-hover:font-semibold group-hover:text-black'>Dashboard</span>
</Link>

<Link 
  className='group hover:scale-110 transition-transform duration-300 ease-in-out flex items-center gap-2 text-gray-500' 
  to='/dashboard'
>
  <AssignmentOutlined fontSize='small' className='group-hover:text-violet-900 group-hover:font-semibold' />  
  <span className='group-hover:font-semibold group-hover:text-black'>Tasks</span>
</Link>

<Link 
  className='group hover:scale-110 transition-transform duration-300 ease-in-out flex items-center gap-2 text-gray-500' 
  to='/tasks'
>
  <GroupsOutlined fontSize='small' className='group-hover:text-violet-900 group-hover:font-semibold' />  
  <span className='group-hover:font-semibold group-hover:text-black'>Team</span>
</Link>

<Link 
  className='group hover:scale-110 transition-transform duration-300 ease-in-out flex items-center gap-2 text-gray-500' 
  to='/calendar'
>
  <CalendarMonthOutlined fontSize='small' className='group-hover:text-violet-900 group-hover:font-semibold' />  
  <span className='group-hover:font-semibold group-hover:text-black'>Calendar</span>
</Link>

<Link 
  className='group hover:scale-110 transition-transform duration-300 ease-in-out flex items-center gap-2 text-gray-500' 
  to='/analytics'
>
  <AnalyticsOutlined fontSize='small' className='group-hover:text-violet-900 group-hover:font-semibold' />  
  <span className='group-hover:font-semibold group-hover:text-black'>Analytics</span>
</Link>
      </div>
      <div className="menu flex flex-col  gap-2 w-[80%]  align-baseline" style={styles.menu}>
        <p className={styles.para}>GENERAL</p>
       <Link 
  className='group hover:scale-110 transition-transform duration-300 ease-in-out flex items-center gap-2 text-gray-500' 
  to='/settings'
>
  <SettingsOutlined fontSize='small' className='group-hover:text-violet-900 group-hover:font-semibold' />  
  <span className='group-hover:font-semibold group-hover:text-black'>Setting</span>
</Link>

<Link 
  className='group hover:scale-110 transition-transform duration-300 ease-in-out flex items-center gap-2 text-gray-500' 
  to='/help'
>
  <SupportOutlined fontSize='small' className='group-hover:text-violet-900 group-hover:font-semibold' />  
  <span className='group-hover:font-semibold group-hover:text-black'>Help</span>
</Link>

<button onClick={handleClick}
  className='group hover:scale-110 transition-transform duration-300 ease-in-out flex items-center gap-2 text-gray-500' 
  to='/logout'
>
  <LogoutOutlined fontSize='small' className='group-hover:text-violet-900 group-hover:font-semibold' />  
  <span className='group-hover:font-semibold group-hover:text-black'>Logout</span>
</button>


      </div>
<div className="highligh w-[90%] mt-4 grow-2 m-3 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-800 text-white text-3xl flex justify-baseline items-center p-4"> hello</div>
    </div>
  )
}

export default Sidebar
