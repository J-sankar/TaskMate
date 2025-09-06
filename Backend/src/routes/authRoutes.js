import { Router } from "express";
import { authGoogle , googleCallBack, login, signup} from "../controllers/authControllers.js";
import {loginRequestBodyValidator, signUpRequestBodyValidator} from "../middlewares/validation.js";

const authRouter = new Router()

authRouter.post('/signup',signUpRequestBodyValidator,signup)

authRouter.get('/google/oauth/newuser', authGoogle)
authRouter.get('/google/callback', googleCallBack)
authRouter.post('/login',loginRequestBodyValidator, login)



export default authRouter