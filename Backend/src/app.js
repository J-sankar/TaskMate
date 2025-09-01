import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import errorHandler from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'
const app = express()
app.use(cookieParser())

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}))

app.use('/auth', authRouter)
app.get('/',(req,res)=>{
    res.send("HELLO  WORLD")
})
app.use(errorHandler)

  


export default app