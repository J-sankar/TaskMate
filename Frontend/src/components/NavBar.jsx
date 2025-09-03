import React from 'react'
import styles from './NavBar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './Logo'

const NavBar = () => {
  const navigate = useNavigate()
 
  return (
    <nav className='flex justify-around items-center h-[10vh] w-[100vw]  bg-gradient-to-l from-blue-500 via-indigo-600 to-violet-800' >
      <Logo classname='gap-5x grow-3' size='text-4xl'/>
      <ul className=' bg-inherit grow-2 gap-2 flex text- justify-around items-center'>
        <li>

        <Link to= '/signup' className={styles.link}>Sign Up/Login</Link>
        </li>
        <li>
          <Link to="/services" className={styles.link}>Services</Link>
        </li>
      </ul>
      <div  className=' grow-2 p-1'>

      <button className='border-2 px-5 py-1.5 rounded-[8px] hover:scale-110 transition-all ease-out duration-300' >Tasks</button>
      </div>
    </nav>
  )
}

export default NavBar
