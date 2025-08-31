import dotenv from 'dotenv'


dotenv.config()
export  const  env ={
    PORT  : process.env.PORT,
    DATABASE_URL : process.env.DATABASE_URL,
    CLIENT_ID : process.env.CLIENT_ID,
    CLIENT_SECRET:process.env.CLIENT_SECRET,
    GOOGLE_CALLBACK_URI :process.env.GOOGLE_CALLBACK_URI,

    ACCESSS_SECRET : process.env.ACCESSS_SECRET,
    REFRESH_SECRET : process.env.REFRESH_SECRET,
}