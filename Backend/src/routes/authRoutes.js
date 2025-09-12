import { Router } from "express";
import { authGoogle , googleCallBack, login, logout, refresh, signup} from "../controllers/authControllers.js";
import {loginRequestBodyValidator, signUpRequestBodyValidator} from "../middlewares/validation.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = new Router()

authRouter.post('/signup',signUpRequestBodyValidator,signup)

authRouter.get('/google/oauth/newuser', authGoogle)
authRouter.get('/google/callback', googleCallBack)
authRouter.post('/login',loginRequestBodyValidator, login)
authRouter.post('/refresh',authMiddleware,refresh)
authRouter.post('/logout',authMiddleware,logout)



export default authRouter