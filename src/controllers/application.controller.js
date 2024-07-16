import mongoose, {isValidObjectId,ObjectId,Types} from "mongoose"
import { Course } from "../models/course.model.js"
import {User} from "../models/user.model.js"
import { Notification } from "../models/notification.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { Application } from "../models/application.model.js"


const createapplication = asyncHandler(async (req, res) => {



    const {semester} = req.body
    // TODO: get video, upload to cloudinary, create video
    // see current logged in user will be uploading video to its channel
    // so it will give videos title,description,ispublished using form  in req.body
    // owner of video will current logged in user as this will pass through jwt we get user from req.user.


    
    if (semester===""){
        return res.status(404).json(new ApiError(404,"semester is required",['semester is required']))
    }
   
    const {student}=req.user._id
    const appstudent=await User.findById(req.user._id);

    const examdept=await User.find({registrationId:211070007});



    console.log("examdept",examdept)

  
   
  
    
   
     
     const application = await Application.create({
        content:`${appstudent.fullname} requested for marksheet of semester ${semester}`,
        from:req.user._id,
        to:examdept[0]._id,
        semester:semester,
        replied:false,

     })

    // checking if video entry made in Video collection or not
    const createdapplication = await Application.findById(application._id)
    if (!createdapplication){

        return res.status(500).json(new ApiError(500,"something went wrong while adding application to database",["something went wrong while adding application to database"]))
    }
    const content = `Request for Marksheet for semester-${semester} is sent by ${req.user.fullname} `;
    const notification = await Notification.create({
        content:content,
        from:[req.user._id],
        to:[examdept[0]._id],
        read:false,

     })

   


     // return response
     return res.status(201).json(
        new ApiResponse(200,{application:createdapplication},"application added successfully")
     )

    
   

});








//display the student which marksheet it has requested for
const semesterapplied = asyncHandler(async (req, res) => {



    const applicationsofcurrentuser = await Application.find({from:req.user._id});
    console.log(applicationsofcurrentuser);
    const listofsemesterapplied=[];
    for(var i=0; i< applicationsofcurrentuser.length; i++) {  
        //display the array elements
        if (!listofsemesterapplied.includes(applicationsofcurrentuser[i].semester)) {
            listofsemesterapplied.push(applicationsofcurrentuser[i].semester)
        }
     

 } 

    return res.status(200).json(new ApiResponse(200, {listofsemesterapplied:listofsemesterapplied}, "List of listofsemesterapplied  fetched successfully"));
   

});

//display exam dept all requests for marksheet
const getallapplications = asyncHandler(async (req, res) => {



    const allapplications = await Application.find({to:req.user._id});
    console.log(allapplications);
//     const listofsemesterapplied=[];
//     for(var i=0; i< applicationsofcurrentuser.length; i++) {  
//         //display the array elements
//         if (!listofsemesterapplied.includes(applicationsofcurrentuser[i].semester)) {
//             listofsemesterapplied.push(applicationsofcurrentuser[i].semester)
//         }
     

//  } 

    return res.status(200).json(new ApiResponse(200, {allapplications:allapplications}, "List of allapplications  fetched successfully"));
   

});




//const {userid} = req.params

//display exam dept  all requests for marksheet of passed userid of passed user
const getapplicationofuser = asyncHandler(async (req, res) => {

    const {userid} = req.params;

    const user=await User.findById(userid);

    if(!user){
        return res.status(404).json(
            new ApiError(404,"user not found",["user not found"])
         )

    }

    const allapplications = await Application.find({from:user._id}).sort({'semester':1 });
    console.log(allapplications);

    return res.status(200).json(new ApiResponse(200, {allapplications:allapplications}, "List of allapplications  fetched successfully"));
   

});



export {
   createapplication,
   semesterapplied,
   getallapplications,
   getapplicationofuser,
   
 
}