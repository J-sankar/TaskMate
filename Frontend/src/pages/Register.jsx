import React from 'react'
import SignUp from '../components/SignUp'
import { useState } from 'react'

const Register = () => {
    const [method, setMethod] = useState(null)
    
        const OAuthSignUp = ()=>{
            setMethod("google")
            window.location.href = 'http://localhost:3000/auth/google/oauth/newuser'
        }
    
        const formSignUp = ()=>{
            setMethod("form")
         
        }
    
        

  return (
    <div>
        {     !method && (
            
            <div className="choiceBox">
            <h1>Sign Up</h1>
        
            <button className="google" onClick={OAuthSignUp}>Sign up using Google</button>
            <button className="signup" onClick={formSignUp}>Register New User</button>
       </div>
            )

    }
            {method === "form" && <SignUp/> }

    </div>
  )
}

export default Register
