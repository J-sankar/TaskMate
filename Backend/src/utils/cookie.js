import { env } from "../config/env.js";

export const setRefreshTokenInCookie = (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken,
        {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 14 * 24 * 60 * 60 * 1000
        }
    )
}
export const setAccessTokenInCookie = (res,accessToken)=>{
    res.cookie('accessToken', accessToken,
        {
            httpOnly:true,
            secure:env.NODE_ENV === 'production',
            sameSite: 'strict',
             maxAge:  15 * 60 * 1000
        }
    )
}


