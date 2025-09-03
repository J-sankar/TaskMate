import {OAuth2Client} from 'google-auth-library'
import { env } from '../config/env.js'
import jwt from 'jsonwebtoken'

const client = new OAuth2Client(env.CLIENT_ID)

export const verify_IdToken = async (idToken)=>{
    try{

        const token =  await client.verifyIdToken({
            idToken: idToken,
            audience: env.CLIENT_ID
        })
        const payload = token.payload
        return payload
        }catch(err){
            throw err

        }


}

export const verifyRefreshToken = (refreshToken)=>{
    try {
        const payload = jwt.verify(refreshToken, env.REFRESH_SECRET)
        return payload
    } catch (error) {
        return null 
    }
}