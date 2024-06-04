import asyncHandler from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import {User} from '../models/user.model.js'
import { Event } from '../models/event.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'



const createEvent = asyncHandler(async (req,res)=>{
    


    
    const {title,description,date,time,venue,instagram,twitter,linkedin,gform}=req.body;

    // console.log(req.body)
    //  validate user details got  from front end

    // must be not empty
    if (title===""){
        return res.status(404).json(
            new ApiError(404,"title is required",["title is required"])
         )
    }
    // must be not empty
    if (description===""){
        return res.status(404).json(
            new ApiError(404,"description is required",["description is required"])
         )
    }
    if (!date){
        return res.status(404).json(
            new ApiError(404,"date is required",["date is required"])
         )
    }
    if (time===""){
        return res.status(404).json(new ApiError(404,"time is required",['time is required']))
    }
    if (venue===""){
        return res.status(404).json(new ApiError(404,"venue is required",['venue is required']))
    }

    const thumbnailLocalPath=req.file.path;

    

    if (!thumbnailLocalPath){
        return res.status(404).json(new ApiError(400,"thumbnail is required",["thumbnail is required"]));
    }

    // upload on cloudinary

     const thumbnailCloudinaryPath = await uploadOnCloudinary(thumbnailLocalPath);
    

    //  console.log(avatarCloudinaryPath)

     if (!thumbnailCloudinaryPath){
        return res.status(404).json(new ApiError(400,"thumbnail is required",["thumbnail is required"]));
     }

    

    const event = await Event.create({
        title:title,
        description:description,
        date:date,
        time:time,
        venue:venue,
        owner:req.user._id,
        instagram:instagram||"",
        linkedin:linkedin||"",
        twitter:twitter||"",
        gform:gform||"",
        thumbnail:thumbnailCloudinaryPath.url || ""})

    const createdevent = await Event.findById(event._id)  
    if (!createdevent){

        return res.status(404).json(new ApiError(500,"something went wrong while adding event to database",["something went wrong while adding event to database"]));
    }

     // return response
     return res.status(201).json(
        new ApiResponse(200,{event:createdevent},"event created successfully")
     )




    
})
























const updateEventDetails = asyncHandler(async(req, res) => {
    const {eventId} = req.params;
    const {title,description,date,time,venue}=req.body;
    const event = await Event.findById(eventId)

    if (!event){
        return res.status(404).json(new ApiError(404,"event donot exists ",["event donot exists"]))

    }

 
    if (!title || !date || !description || !time || !venue ) {
        return res
    .status(404)
    .json(new ApiError(404,"All fields are required",["All fields are required"]))
    
    }

    

    if(event.owner.equals(req.user._id)){
    const newevent = await Event.findByIdAndUpdate(
        event._id,
        {
            $set: {
                title:title?title:event.title,
               description:description?description:event.description,
                date:date?date:event.date,
                time:time?time:event.time,
                venue:venue?venue:event.venue,
               
            }
        },
        {new: true}
        
    )

    return res
    .status(200)
    .json(new ApiResponse(200, {event:newevent}, "Event details updated successfully"))}

    return res.status(404).json(new ApiError(404,"you are not owner of event",["you are not owner of event"]))

});


const updateEventThumbnail = asyncHandler(async(req, res) => {
    const {eventId}=req.params
    const thumbnailLocalPath = req.file?.path
    const event = await Event.findById(eventId)

    if (!event){
        return res.status(404).json(new ApiError(404,"event donot exists ",["event donot exists"]))

    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "thumbnail file is missing")
    }

    //TODO: delete old image - assignment

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if (!thumbnail.url) {
        throw new ApiError(400, "Error while uploading on avatar")
        
    }

    if(event.owner.equals(req.user._id)){
    const newevent = await Event.findByIdAndUpdate(
        eventId,
        {
            $set:{
                thumbnail: thumbnail.url
            }
        },
        {new: true}
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, {event:newevent}, "thumbnail image updated successfully")
    )}

    return res.status(404).json(new ApiError(404,"you are not owner of event",["you are not owner of event"]))

})

const deleteEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params
    

    const event = await Event.findById(eventId)

    if (!event){
        return res.status(404).json(new ApiError(404,"event donot exists ",["event donot exists"]))

    }

    if (event.owner.equals(req.user._id)){
        await Event.findByIdAndDelete(eventId);

        return 
        res.status(200).json(new ApiResponse(200, {}, "event deleted successfully"))

    }

    return res.status(404).json(new ApiError(404,"you are not owner of event",["you are not owner of event"]))

 



})

const getAllEvents = asyncHandler(async (req, res) => {
    // Retrieve all courses from the database
    const listofevents = await Event.find({});
   const events=[]
    for(var i=0; i< listofevents.length; i++) {  
        //display the array elements  
        const student = await User.findById(listofevents[i].owner);
        const name=student.fullname;
        const avatar=student.avatar;
       events.push({events:listofevents[i],fullname:name,avatar:avatar})

 }  

    console.log(listofevents);
    return res.status(200).json(new ApiResponse(200, {listofevents:events}, "List of events all fetched successfully"));
});


const getTodayEvents = asyncHandler(async (req, res) => {
    // Retrieve all courses from the database
    const dates= new Date();
    let day=dates.getDate();
    if(day<10){
        day="0"+String(day);
    }
    let month=dates.getMonth()+1;
    if(month<10){
        month="0"+String(month);
    }
    const year=String(dates.getFullYear())
    const dt =year+"-"+month+"-"+day
    console.log(dt)
    const listofevents = await Event.find({date:dt});
    const events=[]
    for(var i=0; i< listofevents.length; i++) {  
        //display the array elements  
        const student = await User.findById(listofevents[i].owner);
        const name=student.fullname;
        const avatar=student.avatar;
       events.push({events:listofevents[i],fullname:name,avatar:avatar})

 }  
   
    console.log(listofevents);
    return res.status(200).json(new ApiResponse(200, {listofevents:events}, "List of events today fetched successfully"));
});


// for other events search event by title
const searchbytitle = asyncHandler(async(req, res) => {
     // Retrieve all courses from the database
     const dates= new Date();
     let day=dates.getDate();
     if(day<10){
         day="0"+String(day);
     }
     let month=dates.getMonth()+1;
     if(month<10){
         month="0"+String(month);
     }
     const year=String(dates.getFullYear())
     const dt =year+"-"+month+"-"+day
     console.log(dt)
    const { title} = req.query;
    console.log(title)
    const queryObject = {};

    if (title) {
        queryObject.title = title;
    }

    try {
        const listofevents = await Event.find({title:{ $regex:`${title}`},date: {$ne:dt}});
        console.log(listofevents)
        const events=[]
    for(var i=0; i< listofevents.length; i++) {  
        //display the array elements  
        const student = await User.findById(listofevents[i].owner);
        const name=student.fullname;
        const avatar=student.avatar;
       events.push({events:listofevents[i],fullname:name,avatar:avatar})

 }  
   
    console.log(listofevents);
    return res.status(200).json(new ApiResponse(200, {listofevents:events}, "List of events search events fetched successfully"));
    } catch (error) {
        // Handle any errors that occur during database operations
        return res.status(500).json(new ApiError(500, "Internal Server Error", ["An error occurred while processing your request"]));
    }
});



const getOtherEvents = asyncHandler(async (req, res) => {
    // Retrieve all courses from the database
    const dates= new Date();
    let day=dates.getDate();
    if(day<10){
        day="0"+String(day);
    }
    let month=dates.getMonth()+1;
    if(month<10){
        month="0"+String(month);
    }
    const year=String(dates.getFullYear())
    const dt =year+"-"+month+"-"+day
    console.log(dt)
    const listofevents = await Event.find({date: {
        $ne: dt
     }});
    const events=[]
    for(var i=0; i< listofevents.length; i++) {  
        //display the array elements  
        const student = await User.findById(listofevents[i].owner);
        const name=student.fullname;
        const avatar=student.avatar;
       events.push({events:listofevents[i],fullname:name,avatar:avatar})

 }  
   
    console.log(listofevents);
    return res.status(200).json(new ApiResponse(200, {listofevents:events}, "List of events today fetched successfully"));
});

const getEventById = asyncHandler(async (req, res) => {
    const { eventId } = req.params
    //TODO: get video by id

    const event = await Event.findById(eventId)

    if (!event){
        return res.status(404).json(new ApiError(401,"Event donot exists ",["Event donot exists "]))

    }
    const events=[]
 
        const student = await User.findById(event.owner);
        const name=student.fullname;
        const avatar=student.avatar;
       events.push({events:event,fullname:name,avatar:avatar})




    

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {listofevents:events},
        "Event fetched successfully"
    ))
})

const getmyevents = asyncHandler(async (req, res) => {
    // Retrieve all courses from the database
    const listofevents = await Event.find({owner:req.user._id});
   const events=[]
    for(var i=0; i< listofevents.length; i++) {  
        //display the array elements  
        const student = await User.findById(listofevents[i].owner);
        const name=student.fullname;
        const avatar=student.avatar;
       events.push({events:listofevents[i],fullname:name,avatar:avatar})

 }  

    console.log(listofevents);
    return res.status(200).json(new ApiResponse(200, {listofevents:events}, "List of my events all fetched successfully"));
});

export {
 createEvent,
 updateEventDetails,
 updateEventThumbnail,
 deleteEvent,
 getAllEvents,
 getTodayEvents,
 getOtherEvents,
 getEventById,
 getmyevents,
 searchbytitle
};