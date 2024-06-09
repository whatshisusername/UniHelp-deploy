// this is to update user fullname,email,semester,branch

import React, {useEffect, useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import axios from "axios"
import validator from 'validator'
import { useSelector } from 'react-redux'
import UpdateAvatar from './UpdataAvatar.js'
import secureLocalStorage from 'react-secure-storage'
function UpdateDetails() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [editing,setediting] = useState()
    const dispatch = useDispatch()
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)

    // creating user connecting front end and backend
 
  const [email,setemail]=useState(userData?.email)
  const [fullname,setfullname]=useState(userData?.fullname)
 
  const [semester,setsemester]=useState(userData?.semester)
  const [branch,setbranch]=useState(userData?.branch)
  const[response,setresponse]=useState('')
  const updateaccout= async(e)=>{
    e.preventDefault(); // Prevent default form submission

    // Create FormData object to send form data including files
    
    const formData = new FormData();

    formData.append('email', email);
    formData.append('fullname', fullname);
   
    formData.append('semester', semester);
    formData.append('branch', branch);

    

    console.log("branch=",branch)
    // Perform your axios POST request with FormData
    console.log(semester,fullname,email)
    await axios.patch('/api/v1/users/update-account', 
{
    "email":email,
    "fullname":fullname,
    "branch":branch,
    "semester":semester
})
      .then(function (response) {
        console.log(response);
        setresponse(response?.data?.message)
        
        dispatch(login(response?.data?.data?.user));
        secureLocalStorage.setItem("ui", response?.data?.data?.user);
        console.log('ui=',secureLocalStorage.getItem("ui"));

        setError('')
        setediting(false)
        // navigate('/')
      })
      .catch(function (error) {
        // console.log(error.response.data.errors[0]);
        console.log("error=",error);
        setError(error?.response?.data?.errors[0])
        setresponse('')
      });
  }
  
  const handleSuccessClose = () => {
    setresponse('')
  };

  const toggleedit=()=>{
    setediting(!editing)
    console.log("editing",editing)
    console.log("editing",editing)
  }
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


           
            {/* <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                    </span>
                </div>
               <img className='ml-12 justify-center bg-black border-2 border-black w-fit h-fit'src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEzFkpGnI5u_psM1gy5zZQrgHQ5yJeOaY-epvGPVh9Rg&s'/>
                <h2 className="text-center  text-2xl font-bold leading-tight ">Update Student Details</h2>
                
      
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}
               
{/*               

                <form onSubmit={updateaccout}>
    


    <label >email</label>
    {editing?(<h1>hello</h1>):
    (<input className=' px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full' type='email' placeholder='Enter email-ID' value={email} onChange={(e)=>{setemail(e.target.value)}} required></input>
    )}
    <label >fullname</label>
    <input className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'type='text' placeholder='Enter fullname' value={fullname} onChange={(e)=>{setfullname(e.target.value)}} required></input>

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
<br/>
<label >branch</label>
<select className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 'id="branch" value={branch} onChange={(e)=>{setbranch(e.target.value)}} required>

   
  <option value='Computer Engineering'>Computer Engineering</option>
  <option value='Information Technology'>Information Technology</option>
  <option value='Civil Engineering'>Civil Engineering</option>
  <option value='Elecrical Engineering'>Elecrical Engineering</option>
  <option value='Eletronics Engineering'>Eletronics Engineering</option>
  <option value='Electronics and Telecommunication Engineering'>Electronics and Telecommunication Engineering</option>
  <option value='Mechanical Engineering'>Mechanical Engineering</option>
  <option value='Production Engineering'>Production Engineering</option>
  <option value='Textile Engineering'>Textile Engineering</option>
  
</select>







    <button className="bg-gray-50 hover:bg-gray-50 text-black font-bold py-2 px-4 border border-blue-700 rounded ml-40 mt-1">Submit
</button>

    
    </form> */}
    
          
        
             
                
      
            
                
            <div class="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3 border-2 mt-16">
            {editing?(<button
              class="text-slate-800 hover:text-green-600 text-sm bg-green-500 hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center " onClick={updateaccout}>
              <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
              </span>
              <span class="hidden md:inline-block">Save</span>
          </button>):
            
            (<button
              class="text-slate-800 hover:text-blue-600 text-sm bg-blue-500 hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center " onClick={toggleedit}>
              <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
              </span>
              <span class="hidden md:inline-block">Edit</span>
          </button>)}
                <div class="mt-2 mb-8 w-full">
                {userData.userrole==1?(<h4 class="px-2 text-xl font-bold text-navy-700 dark:text-white">
                    Professor
                    </h4>):(<h4 class="px-2 text-xl font-bold text-navy-700 dark:text-white">
                    Student
                    </h4>)}
                    {editing?(
                      <input className='px-2 border-4 border-black text-xl font-bold text-navy-700 dark:text-white' type='text' placeholder={userData.fullname} value={fullname} onChange={(e)=>{setfullname(e.target.value)}} required></input>
                    ):(<h4 class="px-2 text-xl font-bold text-navy-700 dark:text-white">
                    {userData.fullname}
                    </h4>)}
                    <h4 class="px-2 text-xl font-bold text-navy-700 dark:text-white">
                    {userData.registrationId}
                    </h4>
                  
                </div> 
                <div class="grid grid-cols-2 gap-4 px-2 w-full">
                    <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p class="text-sm text-gray-600">Email</p>
                   {editing?(<input className='px-2 border-4 w-96  border-black text-xl font-bold text-navy-700 dark:text-white' type='email' placeholder={userData.email} value={email} onChange={(e)=>{setemail(e.target.value)}} required></input>): (<p class="text-base font-medium text-navy-700 dark:text-white">
                        {userData.email}
                    </p>)}
                    </div>
<br/>
                    <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p class="text-sm text-gray-600">Semester</p>
                    {editing?(
                      <select className='px-2 w-20 border-4 border-black text-xl font-bold text-navy-700 dark:text-white'id="semester" value={semester} onChange={(e)=>{setsemester(e.target.value)}} required>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                      <option value='7'>7</option>
                      <option value='8'>8</option>
                      
                    </select>
                    ):
                    (<p class="text-base font-medium text-navy-700 dark:text-white">
                       {userData.semester}
                    </p>)}
                    </div>

                    <div class="flex flex-col items-start justify-center ml-0  rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p class="text-sm text-gray-600 ml-0">Branch</p>
                    {editing?(
                      <select className='px-2 border-4 border-black text-xl font-bold text-navy-700 dark:text-white'id="branch" value={branch} onChange={(e)=>{setbranch(e.target.value)}} required>

   
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

                    ):
                    (<p class="text-base font-medium text-navy-700 dark:text-white">
                        {userData.branch}
                    </p>)}
                    </div>

                  
                </div>
           
             
        </div>



 
    
    </>
    
  ):(<></>)
}

export default UpdateDetails