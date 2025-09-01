import bcrypt from 'bcrypt'

export const hashPassword = async (password)=>{
    try{
        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    }
    catch(err){
        console.log("Password Hashing failed: ", err.message)
        return false 
            
    }    
}

export const verifyPassword = async (hashedPassword,password)=>{
    try {
        
        const isMatch = await bcrypt.compare(password,hashedPassword)
       return isMatch
        
    } catch (err) {
        console.log("Password verification failed: ",err.message)
        return false
    }


}