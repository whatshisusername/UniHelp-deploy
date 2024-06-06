import React, {useState, useEffect} from 'react'
import { Container, CourseCard } from '../components'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function NotificationIcon() {

    const [response,setresponse]=useState('')
    const [error,seterror]=useState('')
    const [readnotifications,setreadnotifications]=useState([])
    const [unreadnotifications,setunreadnotifications]=useState([])
    const [notifications,setnotifications]=useState([])
    
    const navigate=useNavigate();

    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(()=>{
      let interval = setInterval(() => {
        axios.get('/api/v1/notifications/getnotification')
      .then(function (response) {
        console.log(response);
        setreadnotifications(response?.data?.data?.readnotifications)
        setunreadnotifications(response?.data?.data?.unreadnotifications)
        setnotifications(response?.data?.data?.notifications)
        setresponse(response?.data?.message)
        seterror('')
      })
      .catch(function (error) {
        console.log("error=",error);
        if(error?.response?.data?.errors[0]){
          seterror(error?.response?.data?.errors[0])};
        setresponse('')
      });},10000);

      return () => {
        clearInterval(interval);
      };
    },[readnotifications,unreadnotifications,notifications])

    console.log("error=",error);


    
 
    if (unreadnotifications.length === 0 && authStatus===true) {
        return (
            
            <Container>
            <div class="relative m-6 mt-1 inline-flex w-fit" onClick={()=>{
        navigate('/all-notifications')
    }} >
      <div
        class="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-indigo-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
        0
      </div>
      <div
        class="flex items-center justify-center w-5 h-5 rounded-lg text-white px-8 py-6 text-center shadow-lg">
        <span class="[&>svg]:h-10 [&>svg]:w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                clip-rule="evenodd" />
            </svg>
          </span>
      </div>
    </div>
            
            {/* <div className='flex flex-wrap'>
                    {semcourses.map((course) => (
                        <div key={course._id} className='p-2 w-1/4'>
                            <CourseCard {...course} />
                        </div>
                    ))}
                </div> */}
                </Container>
        
            
        )
    }
  return (

        <Container>
        <div class="relative m-6 inline-flex w-fit" onClick={()=>{
        navigate('/all-notifications')
    }}>
  <div
    class="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-indigo-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
    {unreadnotifications.length}
  </div>
  <div
    class="flex items-center justify-center w-5 h-5 rounded-lg text-white px-8 py-6 text-center shadow-lg">
    <span class="[&>svg]:h-10 [&>svg]:w-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
            clip-rule="evenodd" />
        </svg>
      </span>
  </div>
</div>
        
        {/* <div className='flex flex-wrap'>
                {semcourses.map((course) => (
                    <div key={course._id} className='p-2 w-1/4'>
                        <CourseCard {...course} />
                    </div>
                ))}
            </div> */}
            </Container>
    
  )
}

export default NotificationIcon