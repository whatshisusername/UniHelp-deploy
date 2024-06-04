// this is created so that it can be used again and again act as wrapper
// it will take a function as input and perform that function

const asyncHandler = ( requestHandler )=>{
   return (req,res,next)=>{
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
   }    
} 

export default asyncHandler

// another syntax

// const asyncHandler=(fn)=>{
//     async(req,res,next)=>{
//         try{
//             await fn(req,res,next);
//         }
//         catch (error) {
//         res.status(err.code || 500).json({success: false,
//                         message: err.message})
//     }}

// }