import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {logout} from '../../store/authSlice'
import axios from 'axios'
function LogoutBtn() {
    const dispatch = useDispatch()
    const[response,setresponse]=useState("")
    const[error,seterror]=useState("")
    const navigate = useNavigate()
    // authservice.logout will logout the user and dispatch(logout()) will let know store ie all components that user is logged out
    const logoutHandler = async() => {

        await axios.post('/api/v1/users/logout')
        .then(function (response) {
          console.log(response);
          setresponse(response?.data?.message)
          dispatch(logout())
          // window.localStorage.removeItem("userinfo");
          // window.localStorage.removeItem("loggedinfo");
          // window.localStorage.removeItem('loggedIn');
        
     
          navigate('/')
          seterror('')
        })
        .catch(function (error) {
          // console.log(error.response.data.errors[0]);
          seterror(error?.response?.data?.errors[0])
          setresponse('')
        });
    }
  return (
  //   <a href="#" class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600">
  //   <div class="mr-3 text-red-600">
  //     <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
  //   </div>
  //   Logout
  // </a>
  <>
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >
      <div class="mr-3 text-white-600">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
      Logout
    </div></button>
    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    
    </>
  )
}

export default LogoutBtn