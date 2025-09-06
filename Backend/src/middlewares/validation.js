import { loginSchema, signupSchema } from "../validation/auth.validation.js"

export const signUpRequestBodyValidator = (req,res, next)=>{
    const {error} = signupSchema.validate(req.body,{ abortEarly: false })
    if (error){
        const err = new Error(error.details.map(d=>d.message).join(','))
        err.status = 400
        return next(err)
    }
    next()
}

export const loginRequestBodyValidator = (req,res,next)=>{
    const {error} = loginSchema.validate(req.body,{ abortEarly: false })
    if (error){
        const err = new Error(error.details.map(d=>d.message).join(','))
        err.status = 400
        return next(err)
    }
    next()

}
