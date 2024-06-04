import React, {useState, useEffect} from 'react'
import { Container, CourseCard } from '../components'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios'

function Notification() {

    const [response,setresponse]=useState('')
    const [error,seterror]=useState('')
    const [loading,setloading]=useState(true)
    const [readnotifications,setreadnotifications]=useState([])
    const [unreadnotifications,setunreadnotifications]=useState([])
    const [notifications,setnotifications]=useState([])


    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(()=>{
      let interval = setInterval(() => {
        axios.get('/api/v1/notifications/getnotification')
      .then(function (response) {
        console.log(response);
        setloading(false)
        setreadnotifications(response?.data?.data?.readnotifications)
        setunreadnotifications(response?.data?.data?.unreadnotifications)
        setnotifications(response?.data?.data?.notifications)
        setresponse(response?.data?.message)
        seterror('')
      })
      .catch(function (error) {
        console.log(error);
        seterror(error)
        setresponse('')
      });},2000);
    },[readnotifications,unreadnotifications,notifications])

   const readnotification=(notificationid)=>{

    console.log("hitting read",typeof(notificationid))
    axios.patch(`/api/v1/notifications/readnotification/${notificationid}`)
      .then(function (response) {
        console.log(response);
        // setreadnotifications(response?.data?.data?.readnotifications)
        // setunreadnotifications(response?.data?.data?.unreadnotifications)
        // setnotifications(response?.data?.data?.notifications)
        setresponse(response?.data?.message)
        seterror('')
      })
      .catch(function (error) {
        console.log(error);
        seterror(error)
        setresponse('')
      });



   }

   if(loading){
    return (
      <div className="w-full py-8 mt-4 text-center">
                <Container>
                <div role="status" className="grid h-screen place-items-center">
    <svg aria-hidden="true" class="w-22 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
                </Container>
            </div>
    )
   }

    
 
    if (notifications.length === 0 && authStatus===true) {
        return (
      
                <Container>
                <div
    class="md:text-4xl sm:text-3xl xs:text-2xl text-center font-serif font-extrabold  rounded-b-md mb-6 border-yellow-500 text-black ">
   No Notifications</div>
                </Container>
            
        )
    }
  return (
    <div className='w-full py-8'>
        <Container>
        <div class="w-full h-full py-10 flex flex-col gap-4 items-center justify-center bg-white ">

<div
    class="md:text-4xl sm:text-3xl xs:text-2xl text-center font-serif font-extrabold border-b-2 border-blue-500 rounded-b-md mb-6 border-yellow-500 text-black ">
    Notifications</div>

{ unreadnotifications.map((unreadnotification)=>

(<div 
    
    class="sm:w-[70%] xs:w-[94%] mx-auto  bg-gray-300 p-4 rounded-md flex sm:gap-4 xs:gap-2 items-center justify-center">

    <button type='button' class="w-[80%] flex flex-col gap-1" id={unreadnotification.notificationid} key={unreadnotification.notificationid}
onClick={readnotification(unreadnotification.notificationid)}>
        <div class="text-lg font-semibold font-serif text-black">{unreadnotification.content}</div>
     
        <p class="text-[12px] text-semibold  text-right">{unreadnotification.date}</p>
    </button>
   
</div>
))}

{ readnotifications.map((readnotification)=>

(<div 
    
    class="sm:w-[70%] xs:w-[94%] mx-auto  bg-white-100 p-4 rounded-md flex border-2 border-black sm:gap-4 xs:gap-2 items-center justify-center">
  
    <button type='button' class="w-[80%] flex flex-col gap-1" id={readnotification.notificationid} key={readnotification.notificationid}
>
        <div class="text-lg font-semibold font-serif text-black">{readnotification.content}</div>
     
        <p class="text-[12px] text-semibold  text-right">{readnotification.date}</p>
    </button>
 
</div>
))}
</div>
        
        {/* <div className='flex flex-wrap'>
                {semcourses.map((course) => (
                    <div key={course._id} className='p-2 w-1/4'>
                        <CourseCard {...course} />
                    </div>
                ))}
            </div> */}
            </Container>
    </div>
  )
}

export default Notification