import { env } from "../config/env.js"
import axios from 'axios'
import { verify_IdToken } from "../utils/verifiyTokens.js"
import { oauthSchema } from "../validation/auth.validation.js"
import { createOauthUser, createUser, insertRefreshToken, findUserbyEmail, findUserbyId} from "../services/userServices.js"
import { createAccessToken, createRefreshToken } from "../utils/createTokens.js"
import {setAccessTokenInCookie, setRefreshTokenInCookie} from "../utils/cookie.js"
import { verifyPassword } from "../services/passwordServices.js"
import { verifyRefreshToken } from "../utils/verifiyTokens.js"





export const authGoogle = async (req, res) => {
    const deviceId = req.query.state
    const redirectUri = "https://accounts.google.com/o/oauth2/v2/auth"
    const params = new URLSearchParams({
        client_id: env.CLIENT_ID,
        redirect_uri: env.GOOGLE_CALLBACK_URI,
        response_type: "code",
        access_type: "offline",
        scope: 'openid email profile',
        prompt: 'consent',
        state:deviceId
    })
    res.redirect(`${redirectUri}?${params.toString()}`)
}

export const googleCallBack = async (req, res, next) => {
    const {code, state:deviceId} = req.query
    if (!code) {
        const error = new Error("No code provided by google")
        error.status = 400
        return next(error)
    }

    try {
        const coderesponse = await axios.post("https://oauth2.googleapis.com/token", {
            code,
            client_id: env.CLIENT_ID,
            client_secret: env.CLIENT_SECRET,
            redirect_uri: env.GOOGLE_CALLBACK_URI,
            grant_type: "authorization_code",

        },
            {
                headers: { "Content-type": "application/x-www-form-urlencoded" },
            }
        )
        const { access_token, id_token, refresh_token } = coderesponse.data
        const userDetails = await verify_IdToken(id_token)
        console.log(userDetails)
        

        const newUser = { email: userDetails.email, firstname: userDetails.given_name, lastname: userDetails.family_name, oauthId: userDetails.sub, oauthProvider: 'GOOGLE' }
        const { error } = oauthSchema.validate(newUser)

        if (error) {
            const err = new Error(error.details.map(d => d.message).join(','))


            err.status = 400
            return next(err)
        }
        const insertedUser = await createOauthUser(newUser, refresh_token)
        
      
        const accessToken = createAccessToken(insertedUser)
        const {refreshToken,tokenCreatedAt} = createRefreshToken(insertedUser, deviceId)
        await insertRefreshToken(refreshToken,insertedUser.userId,deviceId,tokenCreatedAt)
        setRefreshTokenInCookie(res, refreshToken)
        setAccessTokenInCookie(res, accessToken)

        res.redirect(`http://localhost:5173/dashboard`)


    } catch (err) {
        next(err)
    }
}

export const signup = async (req, res, next) => {
    try{

        const newUser = await createUser(req.body)
        return res.status(201).json({ success:true ,message: 'New user Signed Up',email:newUser.email })
    }catch(error){
        next(error)
    }

} 

export const login = async(req,res,next)=>{
    res.clearCookie('refreshToken')
    const {email, password,deviceId} = req.body 
    try {
        
        const user = await findUserbyEmail(email)
        if (!user) {
            const err = new Error("Email does not exist")
            err.status = 404
            return next(err)
        }
        const isMatch = await verifyPassword(user.password,password)
        if (!isMatch) {
            const err = new Error ("Incorrect password")
            err.status = 401
            return next(err)
        }
        // const deviceId = getDeviceId()
        const accessToken = createAccessToken(user)
       
         const {refreshToken,tokenCreatedAt} = createRefreshToken(user, deviceId)
        await insertRefreshToken(refreshToken,user.userId,deviceId,tokenCreatedAt)
        setRefreshTokenInCookie(res, refreshToken)
        setAccessTokenInCookie(res,accessToken)
        
        console.log(`Login Successfull\n accesstoken: ${accessToken}\nRefreshtoken:${refreshToken}\ndeviceId:${deviceId}`)
        
        return res.status(200).json({success:true,message:'Login Successfull', accessToken})
    } catch (error) {
        next(error)
    }

}

export const refresh = async (req,res,next)=>{
    const refreshToken = req.cookies.refreshToken 
    if (!refreshToken) return next({ message: "Refresh token not found", status: 400 });
    try {
        const payload = verifyRefreshToken(refreshToken)
        if (!payload){
            
            const err = new Error("Invalid or expired refresh token")
            err.status = 401
            return next(err)
        }
        const user = await findUserbyId(payload.id)
        if (!user) {
           const err = new Error("User not found")
            err.status = 404
            return next(err)
        }
        const newAccessToken = createAccessToken(user)
        return res.status(200).json({accessToken:newAccessToken})
    } catch (error) {
        next(error)
    }
}


export const logout = async (req,res,next)=>{
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken){
        const err = new Error("Refresh token not found")
        err.status = 401
        return next(err)
    }
    const payload = verifyRefreshToken(refreshToken)
    if (!payload){
            
            const err = new Error("Invalid or expired refresh token")
            err.status = 401
            return next(err)
        }
    const deviceId =  getDeviceId()
    res.clearCookie(refreshToken)

}