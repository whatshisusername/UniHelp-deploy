// created for authentication checking if user is logged/logout
import { ApiError } from "../utils/ApiError.js";
import  asyncHandler  from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";




export const verifyJWT = asyncHandler(async(req,_,next)=> {

    try{
        // get cookies from req
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token){
            throw new ApiError(401, "Unauthorized request")
        }
        console.log(token)

        // if token is there it will be encoded by jwt decode it

        console.log("inside jwtverify")

        const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        console.log("out jwt")
        // decodedtoken will have fields like id,email,password,username created in generateaccesstoken in user.model

        // getting user from database
        const user = await User.findById(decodedtoken?._id).select("-password -refreshToken")

        // this means there is no user not exists
        if (!user){
            throw new ApiError(401, "Invalid Access Token")
        }

        // if we get user we add a new object user in req req.user this will have user email,username,password,etc
        // so when logout req is hit as no form data comes in that req this middleware will add user details in logout req
        req.user=user
        console.log("sucess verifyjwt")
        next()
}
    catch(error){
        throw new ApiError(401, error?.message || "Invalid access token")
    }

}

)