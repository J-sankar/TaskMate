import { env } from "../config/env.js";
import { v4 as uuidv4 } from 'uuid'

export const getDeviceId = (req, res) => {
    let id = req.cookies.deviceId
    if (!id) {
        id = uuidv4()
        res.cookie('deviceId', id, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 14 * 24 * 60 * 60 * 1000
        })
    }
    return id
}