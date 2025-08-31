import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const SignUp = () => {
    
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneno: ''

    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData
            , [name]: value
        })
        // Field-level validation
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors }
            if (name === "name") {
                if (!value.trim()) newErrors.name = "Name is required"
                else delete newErrors.name
            }
            if (name === "email") {
                if (!value) newErrors.email = "Email is required";
                else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = "Not a valid email";
                else delete newErrors.email
            }
            if (name === "phoneno") {
                if (value && !/^(\+\d{1,3})?\d{10}$/.test(value))
                    newErrors.phoneno = "Please enter valid phone number";
                else delete newErrors.phoneno
            }
            if (name === "password") {
                const strongPasswordRegex =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
                if (!value) newErrors.password = "Password is required";
                else if (value.length < 6)
                    newErrors.password = "Password should contain minimum 6 characters";
                else if (!strongPasswordRegex.test(value))
                    newErrors.password = "Not a valid password";
                else delete newErrors.password
            }

            return newErrors
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Full form validation on submit
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Not a valid email";
        if (formData.phoneno && !/^(\+\d{1,3})?\d{10}$/.test(formData.phoneno))
            newErrors.phoneno = "Please enter valid phone number";
        const strongPasswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6)
            newErrors.password = "Password should contain minimum 6 characters";
        else if (!strongPasswordRegex.test(formData.password))
            newErrors.password = "Not a valid password";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        const user = {}
        const name = formData.name.split(" ")
        user.firstname = name[0]
        user.lastname = name.slice(1).join(" ")
        user.email = formData.email
        if(formData.phoneno) user.phoneno = formData.phoneno
        user.password = formData.password

        try {
            const response = await axios.post('http://localhost:3000/auth/signup', user)
            console.log("OK:",response.data)
        } catch (error) {
            console.log(error.message)
        }


    }




    return (
        <>
            <h1>Sign Up</h1>

            <form onSubmit={handleSubmit}>
                <div className="field1">


                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />

                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                </div>
                <div className="field2">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
                        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    </div>
                </div>
                <div className="field3">


                    <label htmlFor="phoneno">Phone Number</label>
                    <input type="text" name="phoneno" id="phoneno" value={formData.phoneno} onChange={handleChange} />
                    {errors.phoneno && <p style={{ color: "red" }}>{errors.phoneno}</p>}

                </div>
                <div className="field3">


                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                </div>

                <div className="btn">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </>
    )
}


export default SignUp
