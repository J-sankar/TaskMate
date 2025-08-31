import {OAuth2Client} from 'google-auth-library'
import { env } from '../config/env.js'

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