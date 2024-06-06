// to show all the other events not happening today or happed before or will happen


import React, { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/EventCard";
import axios from "axios";
const OtherEvents = () => {

  const [events, setevents] = useState([])
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
const [search,setsearch]=useState('')
const[searching,setsearching]=useState(false)
const [searchedevents, setsearchedevents] = useState([])
    const [response,setresponse]=useState('')
    const [error,seterror]=useState('')
  
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

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

  useEffect(()=>{
    axios.get(`/api/v1/events/searchbytitle?title=${search}`)
  .then(function (response) {
    console.log(response);
    setsearchedevents(response?.data?.data?.listofevents)
    setresponse(response?.data?.message)
    seterror('')
  })
  .catch(function (error) {
    console.log("error=",error);
    seterror(error?.response?.data?.errors[0])
    setresponse('')
  });
},[searchedevents])
console.log("error=",error);
  
  if(events.length===0){
    return (
      <>
      <h1 class="mb-4 mt-64 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">No Events Yet</span> </h1>
      </>
    )
  }

  return (
    <>

<div className="pt-2 relative mx-auto text-gray-600">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          value={search}
          onChange={(e)=>{
            setsearching(true);
            setsearch(e.target.value);}}
          placeholder="Search"
        />
        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
          <svg
            className="text-gray-600 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            xmlSpace="preserve"
            width="512px"
            height="512px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div>
<h1 class="mb-4 mt-8 ml-0 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Other Events</span> </h1>
<div class="h-fit flex  items-center justify-center bg-gray-200 mt-0 mb-8 ">
  <div class="grid grid-cols-4 gap-4 gap-y-4 w-50 ">

  {searching&&searchedevents.length>0?(searchedevents.map((events)=>
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

        ))):(searching && <h1 class="mb-4 mt-8 ml-0 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">No Match Found</span> </h1>)
}


       
{!searching&&events.map((events)=>
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

export default OtherEvents;