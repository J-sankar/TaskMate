
const errorHandler = (err,req,res,next)=>{
    console.log(err)
    const status = err.status || 500 
    const message = err.message || "Something went wrong. Please try again"
       res.status(status).json({
        success: false,
        error: message,
    });
    
}
export default errorHandler