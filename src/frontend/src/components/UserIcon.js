import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {  useRef, useEffect } from 'react';
import LogoutBtn from './Header/LogoutBtn';
import { useNavigate } from 'react-router-dom'
    
function UserIcon() {
      const [isOpen, setIsOpen] = useState(false);
      const dropdownRef = useRef(null);
      const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)
    const[response,setresponse]=useState("")
    const[error,seterror]=useState("")
    const navigate=useNavigate()
    const [clickingavatar,setclickingavatar]=useState(false);

    const toggledropdown = ()=>{
        setIsOpen(!isOpen)
    }
    const gotoupdatedetails = ()=>{
        setIsOpen(!isOpen);
        if (authStatus){
        navigate('/update-account');}
        else{
            navigate('/login')
        }
    }

    const gotoupdateavatar =()=>{
        if (authStatus){
            navigate('/update-avatar');}
            else{
                navigate('/login')
            }
    }
   
    
      return (
        <div className="relative">
           
            <img className="w-8 h-8 rounded-full ml-16" src={userData.avatar}alt="Avatar" onClick={gotoupdateavatar} />
           
          {/* Avatar button */}
          <button
            className="avatar-button flex items-center focus:outline-none"
           onClick={toggledropdown}
          >

            {userData.userrole==1?( <span className="ml-2">Teacher</span>):(<span className="ml-2">Student</span>)}
            <span className="ml-2">{userData.fullname}</span>
            <span className="ml-2">{userData.registrationId}</span>
          </button>
    
          {/* Dropdown menu */}
          {isOpen && (
            
            <div
             
              className=" justify-center items-center dropdown-menu absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
            >
                   <button type="button" onClick={gotoupdatedetails} href="#" class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent ">
                <div class="mr-3">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                Profile
              </button>
                
    
            
            </div>
           
          )}
        </div>
      );
    }
    
export default UserIcon;
    