
import jwt from 'jsonwebtoken'

import { env } from '../config/env.js'


export const createRefreshToken = (user,deviceId) => {
    const refreshToken = jwt.sign(
        {
            id: user.userId,
            deviceId

        }, env.REFRESH_SECRET,
        { expiresIn: '14d' }

    )
    return refreshToken
}

export const createAccessToken = (user) =>{
    const accessToken = jwt.sign(
        {id:user.userId,email:user.email,role:user.role,status:user.status},
        env.ACCESS_SECRET,
        {expiresIn:'15min'}
    )
    return accessToken
}