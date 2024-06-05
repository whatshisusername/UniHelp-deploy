// for student

import React, {useEffect, useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice.js'
import {Button, Input} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import axios from "axios"
import validator from 'validator'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [errorMessage, setErrorMessage] = useState('') 
    const dispatch = useDispatch()
    

    // creating user connecting front end and backend
  const [registrationid,setregistrationid]=useState('')
  const [email,setemail]=useState('')
  const [fullname,setfullname]=useState('')
  const [password,setpassword]=useState('')
  const [semester,setsemester]=useState('');
  const [branch,setbranch]=useState('')
  const[response,setresponse]=useState('')
  const createaccout= async(e)=>{
    e.preventDefault(); // Prevent default form submission

    // Create FormData object to send form data including files
    const formData = new FormData();
    formData.append('registrationId', registrationid);
    formData.append('email', email);
    formData.append('fullname', fullname);
    formData.append('password', password);
    formData.append('semester', semester===''?1:semester);
    formData.append('branch', branch===''?"Computer Engineering":branch);
    formData.append('userrole', 2);

    // Append selected files to FormData
    const avatarFile = document.getElementById('avatar').files[0];
    formData.append('avatar', avatarFile);

    console.log(formData)
    // Perform your axios POST request with FormData
    console.log("going to hit signup")
    console.log("goining to hit sign up")
    await axios.post('/api/v1/users/register', formData)
      .then(function (response) {
        console.log(response);
        setresponse(response?.data?.message)
        setregistrationid('')
        setemail('')
        setsemester('')
        setbranch('')
        setfullname('')
        setpassword('')

        setError('')
      })
      .catch(function (error) {
        // console.log(error.response.data.errors[0]);
        setError(error)
        setresponse('')
      });
  }
  const togglepassword=()=>{
    var passwordField = document.getElementById("passwordfield");
    var eyeIcon = document.getElementById("eyeIcon");
    var eyeCircle = document.getElementById("eyeCircle");
    var eyeLine = document.getElementById("eyeLine");

    if (passwordField.type === "password") {
      passwordField.type = "text";
      eyeIcon.setAttribute("class", "hidden");
      eyeCircle.setAttribute("class", "block");
      eyeLine.setAttribute("class", "hidden");
    } else {
      passwordField.type = "password";
      eyeIcon.setAttribute("class", "block");
      eyeCircle.setAttribute("class", "hidden");
      eyeLine.setAttribute("class", "block");
    }
  
  }
  const handleSuccessClose = () => {
    setresponse('')
  };

  return (
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
                <h2 className="text-center  text-2xl font-bold leading-tight ">Student's SignUp</h2>
                
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Log in
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {response && <p className="text-green-600 mt-8 text-center">{response}</p>}

                <form onSubmit={createaccout}>
    <label >Registraion Id</label>
    <input className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full' type='number' placeholder='Enter registration ID' value={registrationid} onChange={(e)=>{setregistrationid(e.target.value)}} min="100000000" required></input>


    <label >email</label>
    <input className=' px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full' type='email' placeholder='Enter email-ID' value={email} onChange={(e)=>{setemail(e.target.value)}} required></input>

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







    {/* <label >password</label>
    <input id="passwordfield" className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full' type='password' placeholder='password' value={password} onChange={(e)=>{setpassword(e.target.value)}}required></input>
   <button type='button' onClick={togglepassword}>Show password</button> */}

<div class="max-w-sm">
  <label class="block text-sm mb-2 dark:text-white">Password</label>
  <div class="relative">
    <input id="passwordfield" type="password" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter password" value={password} onChange={(e)=>{setpassword(e.target.value)}} required/>
    <button onClick={togglepassword} type="button" class="absolute top-0 end-0 p-3.5 rounded-e-md">
      <svg class="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path class="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
        <path class="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
        <path class="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
        <line id="eyeLine" class="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
        <path id="eyeIcon" class="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <path id="eyeIcon" class="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle id="eyeCircle" class="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
      </svg>
    </button>
  </div>
</div>



    <label htmlFor="avatar">avatar:</label>
    <input className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full' type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" required/>
    <br/>

   

    <button className="bg-gray-50 hover:bg-gray-50 text-black font-bold py-2 px-4 border border-blue-700 rounded ml-40 mt-1">Submit
</button>

    
    </form>
            </div>

    
    </div>
    </>
  )
}

export default Signup
