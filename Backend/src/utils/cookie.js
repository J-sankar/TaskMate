import { env } from "../config/env.js";

export const setRefreshTokenInCookie = (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken,
        {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: 'strict',
            path:'/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    )
}
export const setAccessTokenInCookie = (res,accessToken)=>{
    res.cookie('accessToken', accessToken,
        {
            httpOnly:true,
            secure:env.NODE_ENV === 'production',
            sameSite: 'strict',
            path:'/',
             maxAge:  15 * 60 * 1000
        }
    )
}


