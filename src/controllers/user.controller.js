import asyncHandler from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'
const generateAccessandRefreshToken = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


const registerUser = asyncHandler(async (req,res)=>{
    // get user details from front end
    // validate user details got  from front end
    //check if user already exists :do this by checking username ,email else donot create user if not unqiue
    // check if avatar is sent by user and uploaded by multer on our local public/temp folder else ask for details again
    // if avatar exists add it to cloudinary ,check if successfully added to cloudinary 
    // create user object add all details in mongodb
    // check for user creation in db
    // remove password and  refresh token from response sent by mongodb
    // return response


    // get user details from front end ,from body this through express
    const {registrationId,email,fullname,password,semester,branch,userrole}=req.body;

    // console.log(req.body)
    //  validate user details got  from front end

    // must be not empty
    if (fullname===""){
        return res.status(404).json(
            new ApiError(404,"fullname is required",["fullname is required"])
         )
    }
    // must be not empty
    if (semester===""){
        return res.status(404).json(
            new ApiError(404,"semester is required",["semester is required"])
         )
    }
    if (branch===""){
        return res.status(404).json(
            new ApiError(404,"branch is required",["branch is required"])
         )
    }
    if (registrationId===""){
        return res.status(404).json(new ApiError(404,"registrationId is required",['registrationId is required']))
    }
    if (email===""){
        return res.status(404).json(new ApiError(404,"email is required",['email is required']))
    }

    if (userrole===""){
        return res.status(404).json(new ApiError(404,"user-role is required",['user-role is required']))
    }
    // validate email have @ 
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailregex.test(email)===false){
        return res.status(404).json(new ApiError(404,"email s invalid",['email is invalid']));
        
    }
    if (password===""){
        return res.status(404).json(new ApiError(404,"password is required",["password is required"]));
    }
    // validate password check 8 letters,A,a,etc
    const passwordregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (passwordregex.test(password)===false){
        return res.status(404).json(new ApiError(404,"password must be 8 letters,A,a,@",["password must be 8 letters,A,a,@"]));
        
    }



    //check if user already exists :do this by checking username ,email else donot create user if not unqiue
    // we check this in database where User collection(model) is created which stores all users
    // checking either user with same username exists or email

    const existuser = await User.findOne({
        $or:[{email},{registrationId}]}
    )

    if(existuser){
        return res.status(404).json(new ApiError(409,"already user exists with same registrationId||email",["already user exists with same registrationId||email"]));
    }

    
    // check if avatar is sent by user and uploaded by multer on our local public/temp folder else ask for details again

    // this is given by multer
    // console.log(req.files)
    const avatarLocalPath=req.file.path;

    

    if (!avatarLocalPath){
        return res.status(404).json(new ApiError(400,"avatar is required",["avatar is required"]));
    }

    // upload on cloudinary

     const avatarCloudinaryPath = await uploadOnCloudinary(avatarLocalPath);
    

    //  console.log(avatarCloudinaryPath)

     if (!avatarCloudinaryPath){
        return res.status(404).json(new ApiError(400,"avatar is required",["avatar is required"]));
     }

    //  add user details to database

    const user = await User.create({
        registrationId:registrationId,
        email,
        fullname,
        semester:Number(semester),
        branch:branch,
        password,
        userrole:userrole,
        avatar:avatarCloudinaryPath.url || ""})

    // check for user creation in db
    // remove password and  refresh token from response sent by mongodb

    // checking if just added user in database exits or not also if exists remove its password and refreshToken
    // select method selects all fields of that model "-varibale" from this that variable will be deselected
    const createduser = await User.findById(user._id).select(
        "-password -refreshToken"
    )    
    if (!createduser){

        return res.status(404).json(new ApiError(500,"something went wrong while adding user to database",["something went wrong while adding user to database"]));
    }

     // return response
     return res.status(201).json(
        new ApiResponse(200,createduser,"user registered successfully")
     )




    
})

const checkuserexists = asyncHandler(async(req,res)=>{

    const {registrationId}= req.body
    if (registrationId===""){
        return res.status(404).json(new ApiError(404,"registrationId is required",['registrationId is required']))
    }

    const existuser = await User.findOne({registrationId:registrationId
})

    if(existuser){
        return res.status(404).json(new ApiError(409,"already user exists with same username||email",["already user exists with same username||email"]));
    }
     
    return res.status(200).json(new ApiResponse(200,{},"okay"))

})

const loginUser = asyncHandler(async (req,res)=>{

    // steps
    //front end will send userdata ie username/email and password from body as a request
    // get data from request body
    // check if data is empty or not 
    // check if user exists in db of requested username/email  if not apierror
    // if exists check request password and db password  
    // if password match generate access and refresh tokens if not apierror
    // send it to client in form of cookies  and also apiresponse that user has successfully logged in


    //front end will send userdata ie username/email and password from body as a request
    // get data from request body

    const {registrationId,password} = req.body;

   console.log(registrationId,password)
    if (!registrationId) {
        return res.status(404).json(
            new ApiError(404,"Registration-ID is required",["Registration-ID is required"])
         )
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

    if (!password){
        return res.status(404).json(
            new ApiError(404,"password is required",["password is required"])
         )
    }


    // if username||email and password we got from body check if user with that details exists in db

    const userindb = await User.findOne({
        registrationId:registrationId
    })

    if (!userindb){
        return res.status(404).json(
            new ApiError(404,"user with registraion-id donot exists",["user with registraion-id donot exists"])
         )
    }

    // if user is in db check password
    // we use the method ispasswordcorrect defined by us user.model.js
    // this method can only be accessed by object of usermodel ie userindb we object got
    const isPasswordValid = await userindb.isPasswordCorrect(password)

    if (!isPasswordValid){
        return res.status(404).json(
            new ApiError(404,"password is invalid",["password is invalid"])
         )
        
    }
    if (registrationId != userindb.registrationId)
    {
        return res.status(404).json(
            new ApiError(404,"registraion-id is invalid",["registraion-id is invalid"])
         )

    }


    // password match generate tokens
    console.log("going acess token")

    const {accessToken,refreshToken}= await generateAccessandRefreshToken(userindb._id)

    console.log("return acess token","refresh",refreshToken,"accesstoken",accessToken)
    
    const loggedinuser = await User.findById(userindb._id).select("-password -refreshToken")

    console.log(loggedinuser)

    // making cookies
    // doing this cookie is just readable by frontend cannot modify it,server can modify it
    const options ={
        httpOnly:true,
        secure:true
    }

    // .cookie used to add cookie in response
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedinuser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )




})










const logoutUser = asyncHandler(async (req,res)=>{

    // as auth.middlware add user in req so we can get user details

    // we deleting refreshToken for that user as it is going to logout
    await User.findByIdAndUpdate(
        req.user._id,
        {$set:
        {refreshToken:""}
    }
    ,{
        new:true
    }

    )

    // also deleting its cookies as about to logout
    const options ={
        httpOnly:true,
        secure:true
    }
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"user sucessfully logged out")
    )
})



const refreshAccessToken = asyncHandler(async(req,res)=>{

    // get the refresh token from cookie from which request coming
    const incomingrefreshtoken = req.cookies.refreshToken || req.body.refreshToken

    // if incoming refresh is invalid
    
    if (!incomingrefreshtoken){
        throw new ApiError(401,"unauthrized access")
    }

    try{

    // if incomingrefreshtoken is valid ,decode it
    console.log("going jwt")
    const decodedtoken =jwt.verify(incomingrefreshtoken,process.env.REFRESH_TOKEN_SECRET);
    console.log("out jwt")
    // as refreshtoken was created by passing userid the decoded token will have userid
    const user = await User.findById(decodedtoken?._id)

    // if usernot exists
    if (!user){
        throw new ApiError(401,"invalid refresh token");
    }

    // if user exists check match of incomingrefreshtoken and refreshtoken saved for user in database
    // if not match

    if (incomingrefreshtoken != user.refreshToken){
        throw new ApiError(401, "Refresh token is expired or used as not match in db")
    }

    // if match
    const options = {
        httpOnly: true,
        secure: true
    }

    // as match generate again accesstoken and refresh token as access token is expired
    const {accessToken, refreshToken} = await generateAccessandRefreshToken(user._id);

    console.log(accessToken,"newrefresh",refreshToken)
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {accessToken,refreshToken},
            "Access token refreshed"
        )
    )}
    catch(error){
        throw new ApiError(401, error?.message || "Invalid refresh token")

    }


})


const changePassword = asyncHandler(async(req,res)=>{

    // as changing password so need to check current user logged or not done using our middleware auth
    // taking oldpass,newpass from body as front end will send details in body

    const {oldpassword,newpassword} = req.body

    // getting user that is changing the password as middleware hitted before this changepassword ishit
    
    const user = await User.findById(req.user?._id)

    // checking old password send by user and password in db

    const ispasswordcorrect = await user.isPasswordCorrect(oldpassword)

    if (!ispasswordcorrect){
        throw new ApiError(400,"invalid old password")
    }

    // if match  replace existing password in db with newpassword
    user.password = newpassword
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})


// getting our current logged in user

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})


const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullname, email,branch,semester} = req.body

    console.log(fullname,email,branch,semester)
    if (!fullname || !email || !semester || !branch) {
        return res
    .status(404)
    .json(new ApiError(404,"All fields are required",["All fields are required"]))
    
    }


    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname:fullname?fullname:req.user.fullname,
                email:email?email:req.user.email,
                branch:branch?branch:req.user.branch,
                semester:semester?semester:req.user.semester
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, {user:user}, "Account details updated successfully"))
});


const updateUserAvatar = asyncHandler(async(req, res) => {
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    //TODO: delete old image - assignment

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar")
        
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, {user:user}, "Avatar image updated successfully")
    )
})

const updateUserCoverImage = asyncHandler(async(req, res) => {

    // multer middlweware will add a file in req 
    const coverImageLocalPath = req.file?.path

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is missing")
    }

    //TODO: delete old image - assignment


    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImage.url) {
        throw new ApiError(400, "Error while uploading on avatar")
        
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                coverImage: coverImage.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Cover image updated successfully")
    )
})

// this is for that search feature when user=nishant searches yashmittal channel 
// and yashmittal channel page appears

const getUserChannelProfile = asyncHandler(async(req, res) => {
    const {username} = req.params

    if (!username?.trim()) {
        throw new ApiError(400, "username is missing")
    }

    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase()
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {$in: [req.user?._id, "$subscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1

            }
        }
    ])

    if (!channel?.length) {
        throw new ApiError(404, "channel does not exists")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, channel[0], "User channel fetched successfully")
    )
})


const getWatchHistory = asyncHandler(async(req, res) => {
    // user=Nishant will be current loggedin user

    console.log(new mongoose.Types.ObjectId(req.user._id))
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            // here inside userschema then we lookup inside videos
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [

                    {
                        // now here we inside videos 
                        // we now lookup in users to find owner of video
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        // adding owner field in watchhistory
                        $addFields:{
                            owner:{
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user[0].watchHistory,
            "Watch history fetched successfully"
        )
    )
})



export {registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changePassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory,
    checkuserexists
};