// this is our post preview compoment that one box

import React, { useEffect, useState } from 'react'
import {Link,Navigate, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
// using database function that is image function
// is this postcard we have a box in that one image and below it heading
function CourseCard({_id, title,description,coursenumber,thumbnail,semester,branch,students}) {
    const [response,setresponse]=useState('')
    const[joined,setjoined]=useState(false)
    const [error,seterror]=useState('')
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate()
  
  
    
    const joincourse=async()=>{
        await axios.patch(`/api/v1/courses/addstudenttocourse/${_id}`).then(function (response) {
            console.log(response);
            setjoined(true)
            setresponse(response?.data?.message)
            seterror('')
          })
          .catch(function (error) {
            console.log(error.response.data.errors[0]);
            seterror(error?.response?.data?.errors[0])
            setresponse('')
          });
    }

    const leavecourse=async()=>{
      await axios.patch(`/api/v1/courses/removestudentfromcourse/${_id}`).then(function (response) {
          console.log(response);
          setjoined(false)
          setresponse(response?.data?.message)
          seterror('')
        })
        .catch(function (error) {
          console.log(error?.response?.data?.errors[0]);
          seterror(error?.response?.data?.errors[0])
          setresponse('')
        });
  }

  useEffect(()=>{
    if (students.includes(userData._id)){
      setjoined(true)
    }
  },[joined])
    const handleSuccessClose = () => {
        setresponse('')
      };

      const handleErrorClose = () => {
        seterror('')
      };
       console.log("joined=",joined)
  return (
    <>
    <Link to={`/course/${_id}`}>
    {/* <Link to={`/post/${id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link> */}


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


{error &&    
             <div className="font-regular relative block w-full max-w-screen-md rounded-lg bg-red-500 px-4 py-4 text-base text-white ml-96" data-dismissible="alert">
             <div className="absolute top-4 left-4">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mt-px h-6 w-6">
                 <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"></path>
               </svg>
             </div>
             <div className="ml-8 mr-12">
               <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased">Error</h5>
               <p className="mt-2 block font-sans text-base font-normal leading-relaxed text-white antialiased">{error}</p>
             </div>
             <div data-dismissible-target="alert" data-ripple-dark="true" className="absolute top-3 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20">
               <div role="button" className="w-max rounded-lg p-1" onClick={handleErrorClose}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                 </svg>
               </div>
             </div>
           </div>


       }

<div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
<img class="w-full h-12 rounded-t-xl" src={thumbnail} alt="Image Description"/>
<div class="p-4 md:p-5">
  <h3 class="text-lg font-bold text-gray-800 dark:text-white">
    {title}
  </h3>
  <span>{branch}-{semester}</span>
  <p class="mt-1 text-gray-500 dark:text-gray-400">
    {description}
  </p>

{joined?(
  userData?.userrole==2?(<button class="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" onClick={leavecourse}>
  Leave
</button>):(<></>)
):
  (
    userData?.userrole==2?(<button class="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" onClick={joincourse}>
    Join
  </button>):(<></>))
}
<button class="mt-2 ml-16 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
    <span class="flex items-center">
      Enrolled
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 9a4 4 0 11-8 0 4 4 0 018 0zM12 14s-8 1.5-8 4v2h16v-2c0-2.5-8-4-8-4z" />
        </svg>
        <span class="ml-1 hidden md:inline-block">{students.length}</span>
    </span>
</button>
</div>
</div>
</Link>
</>
  )
}


export default CourseCard