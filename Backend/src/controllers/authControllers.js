import { env } from "../config/env.js"
import axios from 'axios'
import { verify_IdToken } from "../utils/verifiytokens.js"
import { oauthSchema } from "../validation/userValidation.js"
import { createOauthUser, createUser, updateRefreshToken,findUser} from "../services/userServices.js"
import { createAccessToken, createRefreshToken } from "../utils/createTokens.js"
import { getDeviceId } from "../utils/deviceId.js"
import setRefreshTokenInCookie from "../utils/cookie.js"
import { verifyPassword } from "../services/passwordServices.js"
import { verifyRefreshToken } from "../utils/verifiytokens.js"




export const authGoogle = async (req, res) => {
    const redirectUri = "https://accounts.google.com/o/oauth2/v2/auth"
    const params = new URLSearchParams({
        client_id: env.CLIENT_ID,
        redirect_uri: env.GOOGLE_CALLBACK_URI,
        response_type: "code",
        access_type: "offline",
        scope: 'openid email profile',
        prompt: 'consent',
    })
    res.redirect(`${redirectUri}?${params.toString()}`)
}

export const googleCallBack = async (req, res, next) => {
    const code = req.query.code
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
        const deviceId = getDeviceId(req, res)
      
        const accessToken = createAccessToken(insertedUser)
        const refreshToken = createRefreshToken(insertedUser, deviceId)
        await updateRefreshToken(refreshToken,insertedUser.email,deviceId)
        setRefreshTokenInCookie(res, refreshToken)

        return res.status(201).json({message:`New user signed up ,user id : ${insertedUser.userId}` ,accessToken})

       


    } catch (err) {
        next(err)
    }
}

export const signup = async (req, res, next) => {
    try{

        const newUser = await createUser(req.body)
        const deviceId = getDeviceId(req, res)
        const accessToken = createAccessToken(newUser)
        const refreshToken = createRefreshToken(newUser, deviceId)
        await updateRefreshToken(refreshToken,newUser.email,deviceId)
        setRefreshTokenInCookie(res, refreshToken)
        
    
        return res.status(201).json({ message: 'New user Signed Up', accessToken,email:newUser.email })
    }catch(error){
        next(error)
    }



} 

export const login = async(req,res,next)=>{
    const {email, password} = req.body 
    try {
        
        const user = await findUser(email)
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
         const deviceId = getDeviceId(req, res)
        const accessToken = createAccessToken(user)
        let refreshToken = req.cookies.refreshToken
        if (refreshToken) {
            const payload = verifyRefreshToken(refreshToken)

            if (!payload) 

                refreshToken = null
    
        }
        if (!refreshToken){

            refreshToken = createRefreshToken(user, deviceId)
            await updateRefreshToken(refreshToken,user.email,deviceId)
            setRefreshTokenInCookie(res, refreshToken)
        }
        console.log(`Login Successfull\n accesstoken: ${accessToken}\nRefreshtoken:${refreshToken}\ndeviceId:${deviceId}`)
        
        return res.status(200).json({message:'Login Successfull', accessToken})
    } catch (error) {
        next(error)
    }

}