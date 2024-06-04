import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux"
import {useForm} from "react-hook-form"
import { login as authLogin } from '../store/authSlice'
import axios from 'axios'
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // this we using from our react hook form
   
    const [error, setError] = useState("")
    const [registrationid,setregistrationid]=useState('')
    const [password,setpassword]=useState('')
    const[response,setresponse]=useState('')

    const loginaccout= async(e)=>{
        e.preventDefault(); // Prevent default form submission
    
        // Create FormData object to send form data including files
        const formData = new FormData();
        formData.append('registrationId', registrationid);
       
        formData.append('password', password);
        // Perform your axios POST request with FormData
        await axios.post('/api/v1/users/login',{
            "registrationId":registrationid,
            "password":password
        })
          .then(function (response) {
            console.log(response);
            setresponse(response?.data?.message)
            dispatch(authLogin(response?.data?.data?.user));
            navigate("/")
            setError('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            setError(error?.response?.data?.errors[0])
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
      

  return (
    <div className="flex items-center justify-center mt-0 mb-0">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
            </span>
        </div>
       <img className='ml-12 justify-center bg-black border-2 border-black w-fit h-fit'src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEzFkpGnI5u_psM1gy5zZQrgHQ5yJeOaY-epvGPVh9Rg&s'/>
        <h2 className="text-center  text-2xl font-bold leading-tight ">Login</h2>
        
        <p className="mt-2 text-center text-base text-black/60">
            Donot have an account?&nbsp;
            <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign Up
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {response && <p className="text-green-600 mt-8 text-center">{response}</p>}

                <form onSubmit={loginaccout}>
    <label >Registraion Id</label>
    <input min='100000000' className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full' type='number' placeholder='Enter registration ID' value={registrationid} onChange={(e)=>{setregistrationid(e.target.value)}} required></input>


   

    

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





   

    <button className="bg-gray-50 hover:bg-gray-50 text-black font-bold py-2 px-4 border border-blue-700 rounded ml-40 mt-1">Submit
</button>

    
    </form>



     </div>
    </div>
  )
}

export default Login