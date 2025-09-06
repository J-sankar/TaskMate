
import jwt from 'jsonwebtoken'

import { env } from '../config/env.js'


export const createRefreshToken = (user,deviceId) => {
    try {
        
        const refreshToken = jwt.sign(
            {
                id: user.userId,
                deviceId
    
            }, env.REFRESH_SECRET,
            { expiresIn: '14d' }
    
        )
        const tokenCreatedAt = new Date()
        return {refreshToken,tokenCreatedAt}
    } catch (error) {
        throw new Error("Failed to create refresh token")
    }
}

export const createAccessToken = (user) =>{
    try {
        
        const accessToken = jwt.sign(
            {id:user.userId,role:user.role},
            env.ACCESS_SECRET,
            {expiresIn:'15min'}
        )
        return accessToken
    } catch (error) {
        throw new Error("failed to create access token")
    }
}