// This is to show 6 other events in event home page\

// this to show all events happening today
import React, { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import axios from "axios";
const OtherPreview = () => {
    const navigate=useNavigate();

  const [events, setevents] = useState([])
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
  
    const [response,setresponse]=useState('')
    const [error,seterror]=useState('')
  
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    const gotootherevents=()=>{
        navigate('/other-events')
    }

    useEffect(()=>{
      axios.get('/api/v1/events/other-events')
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
<div class="grid grid-cols-4 gap-2 gap-y-4 w-50 ">

       
{events.slice(0,3).map((events)=>
        (

//           <div class="col-span-12 sm:col-span-6 md:col-span-3 mt-0" id={events.events._id} key={events.events._id}>
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

<EventCard {...events}/>

        ))
}

<button onClick={()=>{navigate('/other-events')}} class="hidden   text-sm font-semibold text-blue-600 hover:text-cyan-500 sm:block">
        View All
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-6 text-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg></button>
{/* <button type="button" onClick={gotootherevents}>View all
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-6 text-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg>

</button> */}
{/* <div
  class="relative flex w-fit h-fit flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
  <div class="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
    <img
      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
      alt="ui/ux review check" />
  </div>
  <div class="p-6">
    <h4 class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      UI/UX Review Check
    </h4>
  </div>
  <div class="flex items-center justify-between p-6">
    <div class="flex items-center -space-x-3">
      <img alt="natali craig"
        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80"
        class="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10" />
      <img alt="Tania Andrew"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
        class="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10" />
    </div>
    <p class="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
      January 10
    </p>
  </div>
</div>  */}








    {/* <div key={events.events._id} id={events.events._id}
          class="relative h-64 w-full flex items-end justify-start text-left bg-cover bg-center"
           style={{ backgroundImage: `url(${events.events.thumbnail})` }}>
            <div class="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900">
            </div>
            <div class="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center"
            >
    <a href="/" 
    style={{ backgroundImage: `url(${events.avatar})` }}
    class="rounded-full h-20 w-60 text-xs bg-indigo-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500"></a>
    {/* <div class="text-white bg-indigo-600 font-regular flex flex-col justify-start">
        <span class="text-xl leading-0 font-semibold">{events.date}</span>
        <span class="-mt-3">{events.time}</span>
    </div> */}
{/* </div>
            <div class="absolute top-0 right-0 mx-5 mt-2 flex justify-between items-center">
                <a href="/"
                    class="text-xs bg-indigo-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500">{events.events.date}</a>
                {/* <div class="text-white bg-indigo-600 font-regular flex flex-col justify-start">
                    <span class="text-xl leading-0 font-semibold">{events.date}</span>
                    <span class="-mt-3">{events.time}</span>
                </div> */}
            {/* </div>
            <main class="p-5 z-10">
                <a href="/"
                    class="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline">{events.events.title}
                </a>
                <div class="text-white bg-indigo-600 font-regular flex flex-col justify-start">
                   
                    <span class="-mt-3">
                      {events.events.time}</span>
                    <span class="-mt-3">{events.events.venue}</span>
                </div>
            </main>

        </div>  */}
     

    </div>
</div>
</>
  );
};

export default OtherPreview;

