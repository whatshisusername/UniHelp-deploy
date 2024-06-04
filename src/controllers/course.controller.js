import mongoose, {isValidObjectId} from "mongoose"
import { Course } from "../models/course.model.js"
import {User} from "../models/user.model.js"
import { Notification } from "../models/notification.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
// coursenumber is 19120575065
// courseid is given by mongodb

const getAllCourses = asyncHandler(async (req, res) => {
    // Retrieve all courses from the database
    const listofcourses = await Course.find({});
    console.log(listofcourses);
    return res.status(200).json(new ApiResponse(200, {listofcourses:listofcourses}, "List of courses fetched successfully"));
});

const createACourse = asyncHandler(async (req, res) => {
    const {coursenumber,semester,branch,title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
    // see current logged in user will be uploading video to its channel
    // so it will give videos title,description,ispublished using form  in req.body
    // owner of video will current logged in user as this will pass through jwt we get user from req.user.


    // checking if title,desc is empty.
     // must be not empty
     if (title===""){
        return res.status(404).json(new ApiError(404,"title is required",['title is required']))
    }
    if (coursenumber===""){
        return res.status(404).json(new ApiError(404,"coursenumber is required",['coursenumber is required']))
    }
    if (semester===""){
        return res.status(404).json(new ApiError(404,"semester is required",['semester is required']))
    }
    if (branch===""){
        return res.status(404).json(new ApiError(404,"branch is required",['branch is required']))
    }
    if (description===""){
        return res.status(404).json(new ApiError(404,"description is required",['description is required']))
    }


    const thumbnailLocalPath=req.file.path;

    

    if (!thumbnailLocalPath){
        return res.status(404).json(new ApiError(400,"thumbnail is required",["thumbnail is required"]));
    }

   
  
    const thumbnailCloudinaryPath = await uploadOnCloudinary(thumbnailLocalPath);

   

    if (!thumbnailCloudinaryPath){
        return res.status(404).json(new ApiError(501,"error uploading coursethumbnail on cloudinary",["error uploading coursethumbnail on cloudinary"]))
    }

    
    // now we have title,desc,ispublished,videofile url,thumbnail url
    // and also owner ie current logged in user so make a database entry


     //  add video details in Video model  to database
     
     const course = await Course.create({
        title:title,
        description:description,
        branch:branch,
        semester:semester,
        coursenumber:coursenumber,
        thumbnail:thumbnailCloudinaryPath.url,
        owner:req.user._id

     })

    // checking if video entry made in Video collection or not
    const createdcourse = await Course.findById(course._id)
    if (!createdcourse){

        return res.status(500).json(new ApiError(500,"something went wrong while adding course to database",["something went wrong while adding course to database"]))
    }



    const owner= await User.findById(createdcourse.owner)


    const content = "Prof. "+owner.fullname+" added new course "+createdcourse.title;

    const listofstudents = await User.find({userrole:2})

    for(var i=0; i< listofstudents.length; i++) {  
        const notification = await Notification.create({
            content:content,
    
         })
         await Notification.updateOne({ _id: notification._id }, { $push: { from: createdcourse.owner } })
     await Notification.updateOne({ _id: notification._id }, { $push: { to: listofstudents[i]._id } })
            
         
                
            
        }



     // return response
     return res.status(201).json(
        new ApiResponse(200,{course:createdcourse},"course added successfully")
     )

    
   

})

const getCourseById = asyncHandler(async (req, res) => {
    const { courseId } = req.params
    //TODO: get video by id
    const course = await Course.findById(courseId)

    if (!course){
        return res.status(404).json(new ApiError(401,"Course donot exists ",["Course donot exists "]))

    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {course:course},
        "course fetched successfully"
    ))
})

// just details
const updateCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params
    //TODO: update video details like title, description, thumbnail
    const course = await Course.findById(courseId)

    if (!course){
        return res.status(401).json(new ApiError(401,"course donot exists ",["course donot exists "]))

    }

    // both are required
    const {title,description,branch,semester}=req.body

    if (!title || !description || !branch || !semester) {
       return res.status(400).json(new ApiError(400, "All fields are required",["All fields are required"]))
    }
    
  

    

  
    // as we have new title,desc,cloudinary thumbnail make changes in database for that video entry
    if(course.owner.equals(req.user._id)){
    const coursenew = await Course.findByIdAndUpdate(
        courseId,
        {
            $set: {
                title:title,
                description:description,
                branch:branch,
                semester:semester
                
            }
        },
        {new: true}
        
    )

    return res
    .status(200)
    .json(new ApiResponse(200, {course:coursenew}, "course details updated successfully"))
    }


    return res.status(404).json(new ApiError(404,"you are not owner of course",["you are not owner of course"]))


})

const deleteCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params
    //TODO: delete video

    const course = await Course.findById(courseId)

    if (!course){
        return res.status(404).json(new ApiError(404,"course donot exists ",["course donot exists"]))

    }

    if (course.owner.equals(req.user._id)){
        await Course.findByIdAndDelete(courseId);

        return res
        .status(200)
        .json(new ApiResponse(200, {}, "course deleted successfully"))

    }

    return res.status(404).json(new ApiError(404,"you are not owner of course",["you are not owner of course"]))

 



})

// for student join a course
const addstudenttocourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params

    // in this user toggle on button
    // if button is already false and it is toggled set it to true ,if true set it to false
    // true=publish,false=unpublish

   
    const course = await Course.findById(courseId)
    // Check if the user already exists in the students array
    if (course.students.includes(req.user._id)) {
        return res.status(401).json(new ApiError(401,"student already enrolled to course ",["student already enrolled to course"]))
    }

    if (!course){
        return res.status(401).json(new ApiError(401,"Course donot exists ",["Course donot exists"]))

    }

    const {student}=req.user

    // adding student to course
    await Course.updateOne({ _id: courseId }, { $push: { students: req.user._id } })

    const newcourse = await Course.findById(courseId)

    const content = req.user.fullname+" joined your course "+newcourse.title;

    const notification = await Notification.create({
        content:content,

     })

     await Notification.updateOne({ _id: notification._id }, { $push: { from: req.user._id } })
     await Notification.updateOne({ _id: notification._id }, { $push: { to: newcourse.owner } })


    // return response
    return res.status(201).json(
       new ApiResponse(200,{course:newcourse},"student added to course successfully")
    )



})

// for student leave a course
const removestudentfromcourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params

    // in this user toggle on button
    // if button is already false and it is toggled set it to true ,if true set it to false
    // true=publish,false=unpublish

   
    const course = await Course.findById(courseId)
    // Check if the user already exists in the students array
    if (!course.students.includes(req.user._id)) {
        return res.status(401).json(new ApiError(401,"student already deleted from course ",["student already deleted from course"]))
    }


    if (!course){
        return res.status(401).json(new ApiError(401,"Course donot exists ",["Course donot exists"]))

    }

    const {student}=req.user

    // removing student to course
    await Course.updateOne({ _id: courseId }, { $pull: { students: req.user._id } })

    const newcourse = await Course.findById(courseId)
    // return response
    return res.status(201).json(
       new ApiResponse(200,{course:newcourse},"student removed  from course successfully")
    )



})











const studentsofcourse = asyncHandler(async (req,res)=>{
    const { courseId } = req.params

    // in this user toggle on button
    // if button is already false and it is toggled set it to true ,if true set it to false
    // true=publish,false=unpublish

   
    const course = await Course.findById(courseId)
    // Check if the user already exists in the students array
   const students = course.students
   const studentsname=[]
    for(var i=0; i< students.length; i++) {  
        //display the array elements  
        const student = await User.findById(students[i]);
        const studentobjectid=student._id;
        const name=student.fullname;
        const regid=student.registrationId;




       studentsname.push({studentobjectid,name,regid})
 }  

    
    return res.status(200).json(new ApiResponse(200,{"studentsofcourse":studentsname,"students":students},"students of course feteched successfully"))

})

// for teacher
// courseid and studentid given to remove specific student ie on click delete button
const removestudent=asyncHandler(async(req,res)=>{
    const{courseId,studentId}=req.params

    const course = await Course.findById(courseId)
    const student = await User.findById(studentId)

    
    if (!course) {
            return res.status(401).json(new ApiError(401,"Course donot exists ",["Course donot exists "]))
        }

    if (!student) {
            return res.status(401).json(new ApiError(401,"User donot exists ",["User donot exists "]))
        }
    console.log("user",req.user._id,"course owner",course.owner,course.owner.equals(req.user._id))
    if(course.owner.equals(req.user._id)){
    // removing student to course
    await Course.updateOne({ _id: courseId }, { $pull: { students: student._id } })

    const newcourse = await Course.findById(courseId)

    const owner= await User.findById(newcourse.owner)


    const content = "Prof. "+owner.fullname+" removed you from course "+newcourse.title;

    const notification = await Notification.create({
        content:content,

     })

     await Notification.updateOne({ _id: notification._id }, { $push: { from: req.user._id } })
     await Notification.updateOne({ _id: notification._id }, { $push: { to: student._id } })
    // return response
    return res.status(201).json(
       new ApiResponse(200,{course:newcourse},"student removed  from course successfully")
    )
}
return res.status(404).json(new ApiError(404,"you are not owner of course",["you are not owner of course"]))
})

// owned by me teacher
const searchbyowner=asyncHandler(async(req,res)=>{

    const listofcourses = await Course.find({owner:req.user._id});
    console.log(listofcourses);
    return res.status(200).json(new ApiResponse(200, {listofcourses:listofcourses}, "List of courses semester filter fetched successfully"));

})

// courses joined by student
const searchbystudent=asyncHandler(async(req,res)=>{
    console.log(req.user.fullname)
    console.log("requserid=",req.user._id.valueOf())


    const listofcourses = await Course.find( {students : {$in:[req.user._id.valueOf()]}} )
    console.log(listofcourses);
    return res.status(200).json(new ApiResponse(200, {listofcourses:listofcourses}, "List of courses semester filter fetched successfully"));

})


// for student n teachers-- all courses filter
// course search filter filter on semester and branch
const searchbysemester = asyncHandler(async(req, res) => {
    const { semester, branch } = req.query;
    const queryObject = {};

    if (semester) {
        queryObject.semester = semester;
    }

    if (branch) {
        queryObject.branch = branch;
    }

    if (semester && (semester < 0 || semester > 9)) {
        return res.status(401).json(new ApiError(401, "Invalid semester filter", ["Invalid semester filter"]));
    }

    try {
        let listofcourses;
        if (semester==9 && branch=='All'){
            listofcourses= await Course.find({})
        }

        else if (semester == 9 && branch !='All') {
            listofcourses = await Course.find({ branch: branch });
        } else if (semester && branch !='All') {
            listofcourses = await Course.find({ semester: semester, branch: branch });
        } 
        else if (semester && branch =='All') {
            listofcourses = await Course.find({ semester: semester});
        }
        
        else {
            listofcourses = await Course.find(queryObject);
        }

        return res.status(200).json(new ApiResponse(200, { listofcourses: listofcourses }, "List of courses filtered successfully"));
    } catch (error) {
        // Handle any errors that occur during database operations
        return res.status(500).json(new ApiError(500, "Internal Server Error", ["An error occurred while processing your request"]));
    }
});

// search by typing course title for both student and teacher at all courses page
const searchbytitle = asyncHandler(async(req, res) => {
    const { title} = req.query;
    console.log(title)
    const queryObject = {};

    if (title) {
        queryObject.title = title;
    }

    try {
        let listofcourses;
       
        
            listofcourses = await Course.find({title:{ $regex:`${title}`}});
        

        return res.status(200).json(new ApiResponse(200, { listofcourses: listofcourses }, "List of courses filtered successfully"));
    } catch (error) {
        // Handle any errors that occur during database operations
        return res.status(500).json(new ApiError(500, "Internal Server Error", ["An error occurred while processing your request"]));
    }
});





// mycourses filter -- for students
// search filter in mycourses both for student

const searchbymycourses = asyncHandler(async(req, res) => {
    const { semester, branch } = req.query;
    const queryObject = {};

    if (semester) {
        queryObject.semester = semester;
    }

    if (branch) {
        queryObject.branch = branch;
    }

    if (semester && (semester < 0 || semester > 9)) {
        return res.status(401).json(new ApiError(401, "Invalid semester filter", ["Invalid semester filter"]));
    }

    try {
        let listofcourses;
        if (semester==9 && branch=='All'){
            listofcourses= await Course.find({students : {$in:[req.user._id.valueOf()]}})
        }

        else if (semester == 9 && branch !='All') {
            listofcourses = await Course.find({ branch: branch,students : {$in:[req.user._id.valueOf()]} });
        } else if (semester && branch !='All') {
            listofcourses = await Course.find({ semester: semester, branch: branch,students : {$in:[req.user._id.valueOf()]} });
        } 
        else if (semester && branch =='All') {
            listofcourses = await Course.find({ semester: semester,students : {$in:[req.user._id.valueOf()]}});
        }
        
        else {
            listofcourses = await Course.find(queryObject);
        }

        return res.status(200).json(new ApiResponse(200, { listofcourses: listofcourses }, "List of courses filtered successfully"));
    } catch (error) {
        // Handle any errors that occur during database operations
        return res.status(500).json(new ApiError(500, "Internal Server Error", ["An error occurred while processing your request"]));
    }
});


// mycourses filter --- for teachers
// search filter in mycourses both for teachers

const searchbymycoursesteacher = asyncHandler(async(req, res) => {
    const { semester, branch } = req.query;
    const queryObject = {};

    if (semester) {
        queryObject.semester = semester;
    }

    if (branch) {
        queryObject.branch = branch;
    }

    if (semester && (semester < 0 || semester > 9)) {
        return res.status(401).json(new ApiError(401, "Invalid semester filter", ["Invalid semester filter"]));
    }

    try {
        let listofcourses;
        if (semester==9 && branch=='All'){
            listofcourses= await Course.find({owner:req.user._id})
        }

        else if (semester == 9 && branch !='All') {
            listofcourses = await Course.find({ branch: branch,owner:req.user._id });
        } else if (semester && branch !='All') {
            listofcourses = await Course.find({ semester: semester, branch: branch,owner:req.user._id});
        } 
        else if (semester && branch =='All') {
            listofcourses = await Course.find({ semester: semester,owner:req.user._id});
        }
        
        else {
            listofcourses = await Course.find(queryObject);
        }

        return res.status(200).json(new ApiResponse(200, { listofcourses: listofcourses }, "List of courses filtered successfully"));
    } catch (error) {
        // Handle any errors that occur during database operations
        return res.status(500).json(new ApiError(500, "Internal Server Error", ["An error occurred while processing your request"]));
    }
});







// just filter by branch not working
const searchbybranch=asyncHandler(async(req,res)=>{

    const {branch}=req.params

    const branches=['Computer Engineering', 
    'Information Technology',
    'Elecrical Engineering',
   'Eletronics Engineering',
  'Electronics and Telecommunication Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Production Engineering',
  'Textile Engineering',
  'All'

]

    if(!branches.includes(branch)){
        return res.status(401).json(new ApiError(401,"Invalid branch filter ",["Invalid branch filter"]))
    }

    if(branch=='All'){
        const listofcourses = await Course.find({});
        console.log("for ALL===",listofcourses);
        return res.status(200).json(new ApiResponse(200, {listofcourses:listofcourses}, "List of courses branch filter fetched successfully"));
    
        }

    const listofcourses = await Course.find({branch:branch});
    console.log(listofcourses);
    return res.status(200).json(new ApiResponse(200, {listofcourses:listofcourses}, "List of courses for branch filter fetched successfully"));
});












export {
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    addstudenttocourse,
    removestudentfromcourse,
    createACourse,
    studentsofcourse,
    removestudent,
    searchbybranch,
    searchbysemester,
    searchbyowner,
    searchbystudent,
    searchbymycourses,
    searchbymycoursesteacher,
    searchbytitle
   
 
}