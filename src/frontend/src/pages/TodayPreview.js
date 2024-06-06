// this to show all events happening today
import React, { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventCard from "../components/EventCard";
const TodayPreview = () => {
    const navigate=useNavigate();

  const [events, setevents] = useState([])
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    
  
    const [response,setresponse]=useState('')
    const [error,seterror]=useState('')
  
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    const gototodaysevents=()=>{
        navigate('/today-events')
    }
    const gotoevent=(eventId)=>{
      navigate(`/event/${eventId}`)
    }

    useEffect(()=>{
      axios.get('/api/v1/events/today-events')
    .then(function (response) {
      console.log(response);
      setevents(response?.data?.data?.listofevents)
      setresponse(response?.data?.message)
      seterror('')
    })
    .catch(function (error) {
      console.log("error=",error);
      seterror(error?.response?.data?.errors[0])
      setresponse('')
    });
  },[events])
  
  console.log("error=",error);

  return (
    <>


<div class="h-50 flex  items-center justify-center bg-gray-100 mt-0 ">

<div class="grid grid-cols-12 gap-72 gap-y-9 max-w-6xl mt-4">
 
{events.slice(0,3).map((events)=>
        (

//           <div class="col-span-12 sm:col-span-6 md:col-span-3 mt-0" id={events.events._id} key={events.events._id} onClick={gotoevent(events.events._id)}>
//       <card class="w-60 h-30 flex flex-col">
//         <div class="relative">

//           <a href="#">
//             <img src={events.events.thumbnail} class="w-96 h-auto" />
//           </a>
          

//           <p class="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">{ dayNames[(new Date(events.events.date)).getDay()]  },{ (new Date(events.events.date)).getDate()  } { month[(new Date(events.events.date)).getMonth()]  }</p>
//         </div>

//         <div class="flex flex-row mt-2 gap-2">

        
//           <a href="#">
//             <img src={events.avatar} class="rounded-full max-h-10 max-w-10" />
//             {events.fullname}
//           </a>

          
//           <div clas="flex flex-col">
//             <a href="#">
//               <p class="text-black-100 text-sm font-semibold">{events.events.title}</p>
//             </a>
//             <a class="text-black-100 text-xs mt-2 hover:text-black-100" href="#">{events.events.time}</a>
//             <p class="text-black-100 text-xs mt-1">
//             <svg width="10px" height="10px" viewBox="-5.07 0 43.012 43.012" xmlns="http://www.w3.org/2000/svg">
//   <path id="location" d="M406.185,260.012c-18.028-13.493-16.233-28.572-16.233-28.572h11.184a4.7,4.7,0,0,0-.142,1.1,5.378,5.378,0,0,0,.466,2.1,7.353,7.353,0,0,0,2.622,2.615,5,5,0,0,0,4.218,0,7.316,7.316,0,0,0,2.619-2.615,5.4,5.4,0,0,0,.465-2.105,4.728,4.728,0,0,0-.141-1.1h11.5S424.217,246.277,406.185,260.012Zm4.731-29.576a7.353,7.353,0,0,0-2.619-2.618,4.977,4.977,0,0,0-4.211,0,7.389,7.389,0,0,0-2.622,2.618,6.468,6.468,0,0,0-.326,1H389.966c0-7.972,7.335-14.435,16.383-14.435s16.383,6.463,16.383,14.435H411.242A6.523,6.523,0,0,0,410.915,230.436Z" transform="translate(-389.902 -217)" fill="#2d5be2"/>
// </svg>{events.events.venue}</p>
//           </div>

//         </div>
//       </card>
//     </div>

  

<EventCard
{...events} />
        ))
}
{events.length>3 &&
<a href="/today-events" class="hidden ml-0 text-sm font-semibold text-blue-600 hover:text-cyan-500 sm:block">
        View All
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-6 text-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg></a>

}
     

    </div>
</div>
</>
  );
};

export default TodayPreview;

