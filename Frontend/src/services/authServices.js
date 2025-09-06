import axios from 'axios'
import {setDeviceId} from '../utils/device.js'


 export const login =  (data) =>{
    
   const deviceId =  setDeviceId()
    try {
       const response =  axios.post("http://localhost:3000/auth/login", {...data,deviceId}, {
          withCredentials: true
        }
        
      )
      return response
      
    } catch (error) {
       throw error.response?.data || { message: error.message };
 }
}