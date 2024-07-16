import mongoose, {isValidObjectId,ObjectId,Types} from "mongoose"
import { Course } from "../models/course.model.js"
import {User} from "../models/user.model.js"
import { Notification } from "../models/notification.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { Application } from "../models/application.model.js"
import { Marksheet } from "../models/marksheet.model.js"


const createmarksheet = asyncHandler(async (req, res) => {
    //semester and marksheet file from body and ownerid=applicant id from params
    const {semester} = req.body
    // TODO: get video, upload to cloudinary, create video
    // see current logged in user will be uploading video to its channel
    // so it will give videos title,description,ispublished using form  in req.body
    // owner of video will current logged in user as this will pass through jwt we get user from req.user.


  
    
    if (semester===""){
        return res.status(404).json(new ApiError(404,"semester is required",['semester is required']))
    }


   
 
    const marksheetLocalPath=req.file.path;

    

    if (!marksheetLocalPath){
        return res.status(404).json(new ApiError(400,"marksheetLocalPath is required",["marksheetLocalPath is required"]));
    }

   
  
    const marksheetCloudinaryPath = await uploadOnCloudinary(marksheetLocalPath);

   

    if (!marksheetCloudinaryPath){
        return res.status(404).json(new ApiError(501,"error uploading marksheetCloudinaryPath on cloudinary",["error uploading marksheetCloudinaryPathon cloudinary"]))
    }

    
    // now we have title,desc,ispublished,videofile url,thumbnail url
    // and also owner ie current logged in user so make a database entry


     //  add video details in Video model  to database

     const {ownerid} = req.params;

    const owner=await User.findById(ownerid);

    if(!owner){
        return res.status(404).json(
            new ApiError(404,"user not found",["user not found"])
         )

    }

    const marksheetalreadyexists = await Marksheet.find({ $and: [ { semester:semester },{owner:owner._id}]})
    console.log("marksheetalready",marksheetalreadyexists)
    if(marksheetalreadyexists[0]?._id){
        return res.status(500).json(
            new ApiError(500,"marksheetalreadyexists",[`marksheetalreadyexists${marksheetalreadyexists}`])
         )

    }
     
     const marksheet = await Marksheet.create({
        
        semester:semester,
        marksheet:marksheetCloudinaryPath.secure_url,
        owner:owner._id

     })

    // checking if video entry made in Video collection or not
    const createdmarksheet = await Marksheet.findById(marksheet._id)
    if (!createdmarksheet){

        return res.status(500).json(new ApiError(500,"something went wrong while adding marksheet to database",["something went wrong while adding marksheet to database"]))
    }

    const application = await Application.find({ $and: [ { semester:semester },{from:owner._id}]})
    console.log("application",application)
    if(application[0]?._id){

        await Application.findByIdAndUpdate(application[0]?._id,{
            replied:true
    });

    }

    const content = `Marksheet for semester-${semester} is sent by exam department `;

    

   
        const notification = await Notification.create({
            content:content,
            from:[req.user._id],
            to: [owner._id],
            read:false,
    
         })
    //      await Notification.updateOne({ _id: notification._id }, { $push: { from: createdcourse.owner } })
    //  await Notification.updateOne({ _id: notification._id }, { $push: { to: listofstudents[i]._id } })
            
         
                
            
        





     // return response
     return res.status(201).json(
        new ApiResponse(200,{marksheet:createdmarksheet},`semester-${semester} marksheet added successfully`)
     )

    
   

})


//display applicant all marksheets sent by exam dept
const getallmarksheets = asyncHandler(async (req, res) => {



    const allmarksheets = await Marksheet.find({owner:req.user._id});
    console.log(allmarksheets);
//     const listofsemesterapplied=[];
//     for(var i=0; i< applicationsofcurrentuser.length; i++) {  
//         //display the array elements
//         if (!listofsemesterapplied.includes(applicationsofcurrentuser[i].semester)) {
//             listofsemesterapplied.push(applicationsofcurrentuser[i].semester)
//         }
     

//  } 

    return res.status(200).json(new ApiResponse(200, {allmarksheets:allmarksheets}, "List of allmarksheets  fetched successfully"));
   

});



//shows expt dept all the marksheets of applicant uploaded on database
const getallapplicantmarksheets = asyncHandler(async (req, res) => {

    const {ownerid} = req.params;

    const owner=await User.findById(ownerid);

    if(!owner){
        return res.status(404).json(
            new ApiError(404,"user not found",["user not found"])
         )

    }



    const allapplicantmarksheets = await Marksheet.find({owner:owner._id}).sort({'semester':1 });
    console.log(allapplicantmarksheets);
   

    return res.status(200).json(new ApiResponse(200, {allapplicantmarksheets:allapplicantmarksheets}, "List of allapplicantmarksheets  fetched successfully"));
   

});



//for client display does marksheet exists for semester and passed userid
const marksheetexists = asyncHandler(async (req, res) => {
    //semester and marksheet file from body and ownerid=applicant id from params
    // TODO: get video, upload to cloudinary, create video
    // see current logged in user will be uploading video to its channel
    // so it will give videos title,description,ispublished using form  in req.body
    // owner of video will current logged in user as this will pass through jwt we get user from req.user.
    const {ownerid,semester} = req.params;

  
    
    if (semester===""){
        return res.status(404).json(new ApiError(404,"semester is required",['semester is required']))
    }


   
 
   

     

    const owner=await User.findById(ownerid);

    if(!owner){
        return res.status(404).json(
            new ApiError(404,"user not found",["user not found"])
         )

    }

    const marksheetalreadyexists = await Marksheet.find({ $and: [ { semester:semester },{owner:owner._id}]})
    console.log("marksheetalready",marksheetalreadyexists)
    if(!marksheetalreadyexists[0]){
        return res.status(404).json(
            new ApiError(404,`marksheet not found ${marksheetalreadyexists} ${owner.fullname} ${semester}`,[`marksheet not found ${marksheetalreadyexists} ${owner.fullname} ${semester}`])
         )


    }
    return res.status(201).json(
        new ApiResponse(200,{marksheet:marksheetalreadyexists[0]},`semester-${semester} marksheet exits ${marksheetalreadyexists}`)
     )

     
     
   

})







export {
   createmarksheet,
   getallmarksheets,
   getallapplicantmarksheets,
   marksheetexists,

 
}