import Joi from 'joi'

export const oauthSchema = Joi.object({
    email: Joi.string().email({minDomainSegments:2, tlds:['com','net']}).required(),
    firstname: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
    lastname:Joi.string().pattern(/^[A-Za-z\s]+$/).optional(),
    oauthId: Joi.string().alphanum().required(),
    oauthProvider: Joi.string().valid('GOOGLE','GITHUB').required()
})

export const signupSchema = Joi.object({
    email:  Joi.string().email({minDomainSegments:2, tlds:{allow:['com','net']}}).required(),
    firstname: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
    lastname: Joi.string().pattern(/^[A-Za-z\s]+$/).optional().allow(''),
    phoneno: Joi.string().pattern(/^\+?[0-9]{10,15}$/).optional(),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/).required()

})