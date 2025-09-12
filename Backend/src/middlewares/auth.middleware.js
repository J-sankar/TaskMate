import { findUserById} from "../services/userServices.js"
import { verifyAccessToken } from "../utils/verifiyTokens.js"

const authMiddleware = async (req, res, next)=>{
    const accessToken = req.cookies.accessToken
    if (!accessToken){
        const err = new Error("Unauthorized")
        err.status = 401
        return next(err)
    }
    try {
        const payload = verifyAccessToken(accessToken)
        if (!payload){
            const err = new Error("Unauthorized")
            err.status = 401
            return next(err)
        }
        const user = await findUserById(payload.id)
        if (!user) {
            const err = new Error("User not found")
            err.status = 404
            return next(err)
        }
        req.user = user
        next()
    } catch (error) {
        return next(error)
    }
}
export default authMiddleware