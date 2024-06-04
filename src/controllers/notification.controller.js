import mongoose, {isValidObjectId,ObjectId,Types} from "mongoose"
import { Course } from "../models/course.model.js"
import {User} from "../models/user.model.js"
import { Notification } from "../models/notification.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const fetchnotification = asyncHandler(async (req, res) => {

    const listofnotifications = await Notification.find({to:req.user._id}).sort({'updatedAt':1 })
   

    

    const readnotifications =[]

    const unreadnotifications=[]


    for(var i=0; i< listofnotifications.length; i++) {  
        if (listofnotifications[i].read){
            readnotifications.push({
                content:listofnotifications[i].content,
                notificationid:listofnotifications[i]._id,
                date:(listofnotifications[i].updatedAt).toUTCString()
            })
        }
        else{
            unreadnotifications.push({
                content:listofnotifications[i].content,
                notificationid:listofnotifications[i]._id,
                date:(listofnotifications[i].updatedAt).toUTCString()
            })

        }  
       
    }
    console.log(listofnotifications,readnotifications,unreadnotifications)
  
        return res.status(200).json(new ApiResponse(200,{readnotifications:readnotifications,unreadnotifications:unreadnotifications,
        notifications:listofnotifications},"notifications feteched successfully"))

});


const readnotification = asyncHandler(async(req,res)=>{

    const {notificationId}= req.params
  





    const notification = await Notification.findById(notificationId);

    if(!notification){
        return res.status(404).json(
            new ApiError(404,"Notification not found",["Notification not found"]))
    }

    await Notification.findByIdAndUpdate(notification._id,{
        read:true
    })

    return res.status(200).json(
        new ApiResponse(200,{},"reciever read notification successfully"))
    
})


















export {
   
   fetchnotification,
   readnotification
 
}