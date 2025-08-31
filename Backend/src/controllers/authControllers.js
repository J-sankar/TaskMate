import { env } from "../config/env.js"
import axios from 'axios'
import { verify_IdToken } from "../utils/verifiytokens.js"
import { oauthSchema } from "../validation/uservalidation.js"
import { createOauthUser } from "../services/userServices.js"



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
                headers: { "Content-type": "application/json" },
            }
        )
        const { access_token, id_token, refresh_token } = coderesponse.data
        const userDetails = await verify_IdToken(id_token)

        const newUser = { email: userDetails.email, firstname: userDetails.given_name ,lastname:userDetails.family_name, oauthId: userDetails.sub, oauthProvider: 'GOOGLE' }
        const { error } = oauthSchema.validate(newUser)

        if (error) {
            const err = new Error(error.details.map(d => d.message).join(','))
            
            
            err.status = 400
            return next(err)
        }
        const insertedUser = await createOauthUser(newUser,refresh_token)
        console.log(insertedUser)
        
        
        res.redirect("http://localhost:5173/dashboard")


    } catch (err) {
        next(err)
    }
}

export const signup = (req,res,next)=>{
    console.log(req.body)
    return res.status(200).json({message:'obtained user data'})
    
} 