import React from 'react'
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate()
 
  return (
    <div>
      <nav className="group navbar flex justify-around fixed h-18  top-0 left-0 w-full bg-gradient-to-l from-blue-400 via-indigo-700 to-violet-700 ">
        <div className="pl-10 logo flex grow-3 justify-center items-center h-16 gap-4">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-3xl font-bold">TaskMate</span>
        </div>
        <ul className='flex grow-2 justify-center  items-center gap-10'>
          <li>
            <Link to='/services'>Services</Link></li>

          <li><Link to="/signup">Sign up/Log in</Link></li>
        </ul>
        <div className=" btn flex justify-start grow-2 items-center">

          <button className=' border-b-white border-2 bg-transparent rounded-lg hover:scale-110 transition-all ease-in 300ms   text-white pl-5 pr-5 pt-1 pb-1'>Create Task</button>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
