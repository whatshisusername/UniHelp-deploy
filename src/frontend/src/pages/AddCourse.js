// this is to update user fullname,email,semester,branch

import React, {useEffect, useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice.js'
import {useDispatch} from 'react-redux'
import axios from "axios"
import validator from 'validator'
import { useSelector } from 'react-redux'

function AddCourse() {
    const navigate = useNavigate()
    const [error, seterror] = useState("")
    const dispatch = useDispatch()
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData);
    // creating user connecting front end and backend
 
  const [title,settitle]=useState('')
  const [description,setdescription]=useState('')
  const [coursenumber,setcoursenumber]=useState('')
 
  const [semester,setsemester]=useState('')
  const [branch,setbranch]=useState('')
  const[response,setresponse]=useState('')
  const addcourse= async(e)=>{
    e.preventDefault(); // Prevent default form submission

    // Create FormData object to send form data including files
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('coursenumber', coursenumber);
    formData.append('semester', semester===''?1:semester);
    formData.append('branch', branch===''?"Computer Engineering":branch);
    const thumbnailFile = document.getElementById('thumbnail')?.files[0];
    console.log(thumbnailFile)
    formData.append('thumbnail', thumbnailFile);

    

    console.log("branch=",branch)
    // Perform your axios POST request with FormData
    await axios.post('/api/v1/courses/create-course',formData)
      .then(function (response) {
        console.log(response);
        setresponse(response?.data?.message)
        settitle('')
        setdescription('')
        setsemester('')
        setcoursenumber('')
        setbranch('')
        dispatch(login(response.data.data.course))
        seterror('')
        // navigate('/')
      })
      .catch(function (error) {
        // console.log(error.response.data.errors[0]);
        console.log("error=",error);
        if(error?.response?.data?.errors[0]){
          seterror(error?.response?.data?.errors[0])};
        setresponse('')
      });
  }
  
  const handleSuccessClose = () => {
    setresponse('')
  };

  const [images, setImages] = useState([]);

  // Function to handle file input change
  const handleImageChange = (e) => {
    const fileList = Array.from(e.target.files);
    const newImages = fileList.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      preview: ['jpg', 'jpeg', 'png', 'gif'].includes(file.name.split('.').pop().toLowerCase()),
      size: file.size > 1024 ? (file.size > 1048576 ? Math.round(file.size / 1048576) + 'mb' : Math.round(file.size / 1024) + 'kb') : file.size + 'b'
    }));
    setImages(newImages);
  };

  // Function to remove an image from the preview
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  console.log("error=",error);

  return authStatus?(
    <>
     {response &&    
             <div className="font-regular relative block w-full max-w-screen-md rounded-lg bg-green-500 px-4 py-4 text-base text-white ml-96" data-dismissible="alert">
             <div className="absolute top-4 left-4">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mt-px h-6 w-6">
                 <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"></path>
               </svg>
             </div>
             <div className="ml-8 mr-12">
               <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased">Success</h5>
               <p className="mt-2 block font-sans text-base font-normal leading-relaxed text-white antialiased">{response}</p>
             </div>
             <div data-dismissible-target="alert" data-ripple-dark="true" className="absolute top-3 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20">
               <div role="button" className="w-max rounded-lg p-1" onClick={handleSuccessClose}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                 </svg>
               </div>
             </div>
           </div>


       }


    <div className="flex items-center justify-center mt-0 mb-0">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                    </span>
                </div>
               <img className='ml-12 justify-center bg-black border-2 border-black w-fit h-fit'src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEzFkpGnI5u_psM1gy5zZQrgHQ5yJeOaY-epvGPVh9Rg&s'/>
                <h2 className="text-center  text-2xl font-bold leading-tight ">AddCourse</h2>
                
      
        
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={addcourse}>

                <label >Course Number</label>
    <input className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full' type='number' placeholder='Enter Course number' value={coursenumber} onChange={(e)=>{setcoursenumber(e.target.value)}} min="100000000" required></input>


    <label >Title</label>
    <input className=' px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full' type='text' placeholder='Enter title' value={title} onChange={(e)=>{settitle(e.target.value)}} required></input>

    <label >description</label>
    <input className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'type='text' placeholder='Enter description' value={description} onChange={(e)=>{setdescription(e.target.value)}} required></input>
        <label >semester</label>
<select className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 'id="semester" value={semester} onChange={(e)=>{setsemester(e.target.value)}} required>
  <option value='1'>1</option>
  <option value='2'>2</option>
  <option value='3'>3</option>
  <option value='4'>4</option>
  <option value='5'>5</option>
  <option value='6'>6</option>
  <option value='7'>7</option>
  <option value='8'>8</option>
  
</select>
<label >branch</label>
<select className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 'id="branch" value={branch} onChange={(e)=>{setbranch(e.target.value)}} required>

   
  <option value='Computer Engineering'>Computer Engineering</option>
  <option value='Information Technology'>Information Technology</option>
  <option value='Civil Engineering'>Civil Engineering</option>
  <option value='Electrical Engineering'>Electrical Engineering</option>
  <option value='Electronics Engineering'>Electronics Engineering</option>
  <option value='Electronics and Telecommunication Engineering'>Electronics and Telecommunication Engineering</option>
  <option value='Mechanical Engineering'>Mechanical Engineering</option>
  <option value='Production Engineering'>Production Engineering</option>
  <option value='Textile Engineering'>Textile Engineering</option>
  
</select>

       

        <label htmlFor="thumbnail">Thumbnail:</label>
    <input className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full' type="file" id="thumbnail" name="thumbnail" accept="image/png, image/jpeg"/>
    <br/>
      
      
   
    


    



    <button className="bg-gray-50 hover:bg-gray-50 text-black font-bold py-2 px-4 border border-blue-700 rounded ml-40 mt-1">Add Course</button>

    
    </form>
    
            </div>

 
 </div>

 
    
    </>
    
  ):(<></>)
}

export default AddCourse