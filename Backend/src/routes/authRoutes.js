import { Router } from "express";
import { authGoogle , googleCallBack, login, signup} from "../controllers/authControllers.js";
import responseValidator from "../middlewares/signupValidation.js";

const authRouter = new Router()

authRouter.post('/signup',responseValidator,signup)

authRouter.get('/google/oauth/newuser', authGoogle)
authRouter.get('/google/callback', googleCallBack)
authRouter.post('/login', login )



export default authRouter