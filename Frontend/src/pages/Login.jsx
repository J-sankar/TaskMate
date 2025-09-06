import React, { useState } from 'react'
import Logo from '../components/Logo'
import styles from './Login.module.css'
import axios from 'axios'
import { login } from '../services/authServices'

import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      if (name === "email") {
        if (value.trim() === '') newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = "Not a valid email";
        else delete newErrors.email
      }
      if (name === "password") {
        const strongPasswordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!value.trim()) newErrors.password = 'Password is required'
        else if (value.trim().length < 6) newErrors.password = 'Password should have minimum six characters'
        else if (!strongPasswordRegex.test(value)) newErrors.password = "Invalid Password"
        else delete newErrors.password
      }
      return newErrors
    })
    setFormData({
      ...formData, [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return
    }
    try {
      const response = await login(formData)
      if(response.status === 200) {
        navigate('/dashboard')
      }
      
    } catch (error) {

          const err = await error.response?.data
     
          if (err.status === 404) {
            setErrors({email:err.error})
            return
          }
           if (err.status === 401){

            setErrors({password:err.error})
            return
          }
          
            console.log(error.message)
            return
      


    }

  }

  return (
    <div className=" min-h-[100vh] w-[100vw] flex justify-center bg-gray-100 ">
      <div className='bg-white my-[10%]  shadow-4xl w-[40vw] rounded-2xl transition-all duration-500 ease-in-out flex flex-col items-center gap-[20px] h-[70vh]'>

        <Logo classname='text-[50px]  text-violet-900 gap-[4px] pb-[40px] pt-[20px]' />
        <form onSubmit={handleSubmit} className='h-[70vh] pb-[20px] w-[90%] flex flex-col items-center justify-center gap-1.5 '>

          <div className={styles.field}>

            <input type="email" placeholder="" name="email" id="email" value={formData.email} onChange={handleChange} />
            <label htmlFor="email">Email</label>
            <div>
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>


          </div>
          <div className={styles.field}>


            <input type="password" placeholder="" name="password" id="password" value={formData.password} onChange={handleChange} />
            <label htmlFor="password">Password</label>
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          </div>
          <div className={`field flex justify-center ${styles.field}`}>
            <button type="submit" className='border-2 hover:bg-violet-900 hover:scale-104 transition-all ease-in duration-100 bg-violet-600 text-white rounded-2xl p w-[90%] h-[50%] text-[20px]'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
