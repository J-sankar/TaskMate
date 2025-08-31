import { signupSchema } from "../validation/uservalidation.js";

const responseValidator = (req,res, next)=>{
    const {error} = signupSchema.validate(req.body,{ abortEarly: false })
    if (error){
        const err = new Error(error.details.map(d=>d.message).join(','))
        err.status = 400
        return next(err)
    }
    next()
}
export default responseValidator