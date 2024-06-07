import mongoose, {isValidObjectId} from "mongoose"
import { Course } from "../models/course.model.js"
import {User} from "../models/user.model.js"
import { Notification } from "../models/notification.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { Notes } from "../models/notes.model.js"

const createnotes = asyncHandler(async (req, res) => {
    const {filename} = req.body
    // TODO: get video, upload to cloudinary, create video
    // see current logged in user will be uploading video to its channel
    // so it will give videos title,description,ispublished using form  in req.body
    // owner of video will current logged in user as this will pass through jwt we get user from req.user.


    // checking if title,desc is empty.
     // must be not empty
     if (filename===""){
        return res.status(404).json(new ApiError(404,"filename is required",['filename is required']))
    }
  

    const notesfileLocalPath=req.file.path;

    

    if (!notesfileLocalPath){
        return res.status(404).json(new ApiError(400,"notesfile is required",["notesfile is required"]));
    }

   
  
    const notesfileCloudinaryPath = await uploadOnCloudinary(notesfileLocalPath);

   

    if (!notesfileCloudinaryPath){
        return res.status(404).json(new ApiError(501,"error uploading notesfile on cloudinary",["error uploading notesfile on cloudinary"]))
    }

    
    // now we have title,desc,ispublished,videofile url,thumbnail url
    // and also owner ie current logged in user so make a database entry


     //  add video details in Video model  to database

     const { courseId } = req.params
     
     const notes = await Notes.create({
        filename:filename,
        notesfile:notesfileCloudinaryPath.url,
        course:courseId

     })

    // checking if video entry made in Video collection or not
    const creatednotes = await Notes.findById(notes._id)
    if (!creatednotes){

        return res.status(500).json(new ApiError(500,"something went wrong while adding notes to database",["something went wrong while adding notes to database"]))
    }


    const course =await Course.findById(courseId)

    const owner= await User.findById(course.owner)


    const content = "Prof. "+owner.fullname+" added new notes "+creatednotes.filename;

    const listofstudents = await User.find({userrole:2})

    for(var i=0; i< listofstudents.length; i++) {  
        const notification = await Notification.create({
            content:content,
    
         })
         await Notification.updateOne({ _id: notification._id }, { $push: { from: course.owner } })
     await Notification.updateOne({ _id: notification._id }, { $push: { to: listofstudents[i]._id } })
            
         
                
            
        }



     // return response
     return res.status(201).json(
        new ApiResponse(200,{notes:creatednotes},"notes added successfully")
     )

    
   

})


const notesofcourse = asyncHandler(async (req,res)=>{
    const { courseId } = req.params

    // in this user toggle on button
    // if button is already false and it is toggled set it to true ,if true set it to false
    // true=publish,false=unpublish

   
    const notes = await Notes.find({course:courseId})
//     // Check if the user already exists in the students array
//    const students = course.students
//    const studentsname=[]
//     for(var i=0; i< students.length; i++) {  
//         //display the array elements  
//         const student = await User.findById(students[i]);
//         const studentobjectid=student._id;
//         const name=student.fullname;
//         const regid=student.registrationId;




//        studentsname.push({studentobjectid,name,regid})
//  }  

    
    return res.status(200).json(new ApiResponse(200,{"notesofcourse":notes},"notes of course feteched successfully"))

})




export{
    createnotes,
    notesofcourse
}