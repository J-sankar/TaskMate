import React from 'react'
import SignUp from '../components/SignUp'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import Logo from '../components/Logo'
import styles from './Register.module.css'
import { setDeviceId } from '../utils/device'

const Register = () => {
    
    
    const [method, setMethod] = useState(null)
    const [height, setHeight] = useState('60vh')

    const OAuthSignUp = () => {
        const deviceId = setDeviceId()
        setMethod("google")
        window.location.href = `http://localhost:3000/auth/google/oauth/newuser?state=${encodeURIComponent(deviceId)}`

    }

    const formSignUp = () => {
        setMethod("form")
        setHeight('95vh')

    }
    


    return (
        <div className=" min-h-[100vh] w-[100vw] flex justify-center bg-gray-100   ">
            <div  className='bg-white my-[10%]  shadow-4xl w-[40vw] rounded-2xl transition-all duration-500 ease-in-out flex flex-col items-center gap-[20px]' style={{height}}>
            <Logo classname='text-[50px] text-violet-900 gap-[4px] pb-[40px] pt-[20px]' />
                {(!method) &&

                    <div className='opacity-100 choosemethod w-[100%] h-[80%] text-white flex  flex-col gap-2.5 items-center  font-[600]  rounded-[10px] '>
                        <button onClick={formSignUp} className={`${styles.btn} bg-violet-600 hover:bg-violet-800`}>Sign up Here</button>
                        <button onClick={OAuthSignUp} className={`${styles.btn} text-gray-700 bg-white border-2 border-gray-600 hover:border-gray-800 hover:text-gray-800`}>Sign up using Google</button>
                        <div className=' text-gray-600 text-[15px] px-[12px] flex justify-center gap-[5px] '>Already a User ?
                            <Link to="/login" className='underline hover:text-violet-900 hover:underline'>  Login Here</Link>
                        </div>

                    </div>
                }
                {
                    (method === 'form') &&
                 <SignUp/>
                }
                
            </div>
        </div>
    )
}

export default Register
