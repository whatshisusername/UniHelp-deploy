// this is individual event page

import React, { useState,useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams ,useNavigate} from "react-router-dom";
export default function Eventpage() {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const {eventId}=useParams();
    const [event, setevent] = useState([]);

   
    const navigate=useNavigate();
    const [error, seterror] = useState('');
    const [response, setresponse] = useState('');
    const [deleteresponse, setdeleteresponse] = useState('');
    const userData = useSelector((state) => state.auth.userData);

    const deleteevent =()=>{
      setdeletingevent(true);
      console.log("deleting event")
      axios.delete(`/api/v1/events/delete-event/${event.events._id}`)
      .then(response => {
          console.log(response)
          setdeleteresponse(response?.data?.message)
          navigate('/my-events');
          
  
    
        
          
      })
      .catch(error => {
          console.error("Error fetching course:", error);
      });
  
  
  
     }

    
        // Fetch course details
                console.log("hitting getevent byid")
                axios.get(`/api/v1/events/get-event/${eventId}`)
                    .then(response => {
                        console.log(response)
                        setresponse(response?.data?.message)
                        console.log((new Date(event?.events?.date)).getDay())
                        setevent(response?.data?.data?.listofevents[0]);
                      
                        
                    })
                    .catch(error => {
                        console.error("Error fetching course:", error);
                    });
    
    console.log(event)
    console.log(event)
    console.log(event.events)
    console.log(userData);
    const [deletingevent,setdeletingevent]=useState(false);

    const handleSuccessClose = () => {
      setresponse('')
    };

    return (
        <>
        
        {deleteresponse &&    
             <div className="font-regular relative block w-full max-w-screen-md rounded-lg bg-green-500 px-4 py-4 text-base text-white ml-96" data-dismissible="alert">
             <div className="absolute top-4 left-4">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mt-px h-6 w-6">
                 <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"></path>
               </svg>
             </div>
             <div className="ml-8 mr-12">
               <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased">Success</h5>
               <p className="mt-2 block font-sans text-base font-normal leading-relaxed text-white antialiased">{deleteresponse}</p>
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

            {error && <p className="text-red-700">{error}</p>}
         

            <section class="text-gray-700 body-font mt-0 overflow-hidden bg-white">
              
  <div class="container px-5 py-24 mx-auto">
    
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      
      <img alt="ecommerce" class="w-96 h-50 object-contain rounded border border-gray-200" src={event?.events?.thumbnail}/>
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        
      {/* delete post button */}
      {userData?._id===event?.events?.owner&&
      <div class="inline-flex items-center rounded-md shadow-sm">
    
    <button
    onClick={deleteevent}
        class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </span>
        <span class="hidden md:inline-block">Delete</span>
    </button>
    {deletingevent&&<h1>he</h1>}
</div>
}



        <h2 class="text-sm title-font text-gray-black tracking-widest">{event?.fullname} Presents</h2>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{event?.events?.title}</h1>
        <div class="flex mb-4">
          
          
          <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
            <a class="text-gray-500 " href={event?.events?.instagram} target="_blank">
            <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 455.73 455.73"
      width='50px'
      style={{ enableBackground: 'new 0 0 455.73 455.73' }}
      xmlSpace="preserve"
    >
      <path
        style={{ fill: '#C536A4' }}
        d="M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31c0,24.99,20.34,45.33,45.32,45.33
      c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31
      c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M303.36,108.66
      H152.37c-24.1,0-43.71,19.61-43.71,43.71v150.99c0,24.1,19.61,43.71,43.71,43.71h150.99c24.1,0,43.71-19.61,43.71-43.71V152.37
      C347.07,128.27,327.46,108.66,303.36,108.66z M227.86,306.35c-43.27,0-78.48-35.21-78.48-78.49c0-43.27,35.21-78.48,78.48-78.48
      c43.28,0,78.49,35.21,78.49,78.48C306.35,271.14,271.14,306.35,227.86,306.35z M308.87,165.61c-10.24,0-18.57-8.33-18.57-18.57
      s8.33-18.57,18.57-18.57s18.57,8.33,18.57,18.57S319.11,165.61,308.87,165.61z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31
      c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M303.36,108.66
      H152.37c-24.1,0-43.71,19.61-43.71,43.71v150.99c0,24.1,19.61,43.71,43.71,43.71h150.99c24.1,0,43.71-19.61,43.71-43.71V152.37
      C347.07,128.27,327.46,108.66,303.36,108.66z M227.86,306.35c-43.27,0-78.48-35.21-78.48-78.49c0-43.27,35.21-78.48,78.48-78.48
      c43.28,0,78.49,35.21,78.49,78.48C306.35,271.14,271.14,306.35,227.86,306.35z M308.87,165.61c-10.24,0-18.57-8.33-18.57-18.57
      s8.33-18.57,18.57-18.57s18.57,8.33,18.57,18.57S319.11,165.61,308.87,165.61z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31
      c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M227.86,182.55
      c-24.98,0-45.32,20.33-45.32,45.31c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33
      C273.18,202.88,252.85,182.55,227.86,182.55z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31c0,24.99,20.34,45.33,45.32,45.33
      c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M303.36,108.66H152.37
      c-24.1,0-43.71,19.61-43.71,43.71v150.99c0,24.1,19.61,43.71,43.71,43.71h150.99c24.1,0,43.71-19.61,43.71-43.71V152.37
      C347.07,128.27,327.46,108.66,303.36,108.66z M227.86,306.35c-43.27,0-78.48-35.21-78.48-78.49c0-43.27,35.21-78.48,78.48-78.48
      c43.28,0,78.49,35.21,78.49,78.48C306.35,271.14,271.14,306.35,227.86,306.35z M308.87,165.61c-10.24,0-18.57-8.33-18.57-18.57
      s8.33-18.57,18.57-18.57s18.57,8.33,18.57,18.57S319.11,165.61,308.87,165.61z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31
      c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M227.86,182.55
      c-24.98,0-45.32,20.33-45.32,45.31c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33
      C273.18,202.88,252.85,182.55,227.86,182.55z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31c0,24.99,20.34,45.33,45.32,45.33
      c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M303.36,108.66H152.37
      c-24.1,0-43.71,19.61-43.71,43.71v150.99c0,24.1,19.61,43.71,43.71,43.71h150.99c24.1,0,43.71-19.61,43.71-43.71V152.37
      C347.07,128.27,327.46,108.66,303.36,108.66z M227.86,306.35c-43.27,0-78.48-35.21-78.48-78.49c0-43.27,35.21-78.48,78.48-78.48
      c43.28,0,78.49,35.21,78.49,78.48C306.35,271.14,271.14,306.35,227.86,306.35z M308.87,165.61c-10.24,0-18.57-8.33-18.57-18.57
      s8.33-18.57,18.57-18.57s18.57,8.33,18.57,18.57S319.11,165.61,308.87,165.61z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31
      c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M227.86,182.55
      c-24.98,0-45.32,20.33-45.32,45.31c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33
      C273.18,202.88,252.85,182.55,227.86,182.55z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31c0,24.99,20.34,45.33,45.32,45.33
      c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M303.36,108.66H152.37
      c-24.1,0-43.71,19.61-43.71,43.71v150.99c0,24.1,19.61,43.71,43.71,43.71h150.99c24.1,0,43.71-19.61,43.71-43.71V152.37
      C347.07,128.27,327.46,108.66,303.36,108.66z M227.86,306.35c-43.27,0-78.48-35.21-78.48-78.49c0-43.27,35.21-78.48,78.48-78.48
      c43.28,0,78.49,35.21,78.49,78.48C306.35,271.14,271.14,306.35,227.86,306.35z M308.87,165.61c-10.24,0-18.57-8.33-18.57-18.57
      s8.33-18.57,18.57-18.57s18.57,8.33,18.57,18.57S319.11,165.61,308.87,165.61z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31
      c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z"
      />
    </svg>
            </a>

            <a class="ml-2 text-gray-500 mt-1" href={event?.events?.twitter} target="_blank">
            <svg width="40px" height="40px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#1D9BF0" d="M13.567 5.144c.008.123.008.247.008.371 0 3.796-2.889 8.173-8.172 8.173v-.002A8.131 8.131 0 011 12.398a5.768 5.768 0 004.25-1.19 2.876 2.876 0 01-2.683-1.995c.431.083.875.066 1.297-.05A2.873 2.873 0 011.56 6.348v-.036c.4.222.847.345 1.304.36a2.876 2.876 0 01-.89-3.836 8.152 8.152 0 005.92 3 2.874 2.874 0 014.895-2.619 5.763 5.763 0 001.824-.697 2.883 2.883 0 01-1.262 1.588A5.712 5.712 0 0015 3.656a5.834 5.834 0 01-1.433 1.488z"/></svg>
            </a>
            <a class="ml-2 text-gray-500" href={event?.events?.linkedin} target="_blank">
            <svg width="40px" height="40px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#0A66C2" d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"/></svg>
            </a>
            <a class="ml-2 text-gray-500 mt-1" href={event?.events?.gform} target="_blank">
            <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width='30px'
      viewBox="0 0 512 512"
      style={{ enableBackground: 'new 0 0 512 512' }}
      xmlSpace="preserve"
    >
      <path style={{ fill: '#7A51CC' }} d="M439.652,512H72.348c-9.217,0-16.696-7.479-16.696-16.696V16.696C55.652,7.479,63.131,0,72.348,0 h233.739c4.424,0,8.674,1.761,11.804,4.892l133.565,133.565c3.131,3.13,4.892,7.379,4.892,11.804v345.043 C456.348,504.521,448.869,512,439.652,512z"/>
      <path style={{ fill: '#5947B3' }} d="M317.891,4.892C314.761,1.761,310.511,0,306.087,0H256v512h183.652 c9.217,0,16.696-7.479,16.696-16.696V150.261c0-4.424-1.761-8.674-4.892-11.804L317.891,4.892z"/>
      <path style={{ fill: '#7A51CC' }} d="M451.459,138.459L317.891,4.892C314.76,1.76,310.511,0,306.082,0h-16.691l0.001,150.261 c0,9.22,7.475,16.696,16.696,16.696h150.26v-16.696C456.348,145.834,454.589,141.589,451.459,138.459z"/>
      <g>
        <circle style={{ fill: '#FFFFFF' }} cx="139.13" cy="261.565" r="16.696"/>
        <circle style={{ fill: '#FFFFFF' }} cx="139.13" cy="328.348" r="16.696"/>
        <circle style={{ fill: '#FFFFFF' }} cx="139.13" cy="395.13" r="16.696"/>
        <path style={{ fill: '#FFFFFF' }} d="M372.87,411.826H205.913c-9.217,0-16.696-7.479-16.696-16.696 c0-9.217,7.479-16.696,16.696-16.696H372.87c9.217,0,16.696,7.479,16.696,16.696C389.565,404.348,382.087,411.826,372.87,411.826z"/>
      </g>
      <path style={{ fill: '#E6F3FF' }} d="M372.87,378.435H256v33.391h116.87c9.217,0,16.696-7.479,16.696-16.696 C389.565,385.913,382.087,378.435,372.87,378.435z"/>
      <path style={{ fill: '#FFFFFF' }} d="M372.87,345.043H205.913c-9.217,0-16.696-7.479-16.696-16.696 c0-9.217,7.479-16.696,16.696-16.696H372.87c9.217,0,16.696,7.479,16.696,16.696C389.565,337.565,382.087,345.043,372.87,345.043z"/>
      <path style={{ fill: '#E6F3FF' }} d="M372.87,311.652H256v33.391h116.87c9.217,0,16.696-7.479,16.696-16.696 C389.565,319.131,382.087,311.652,372.87,311.652z"/>
      <path style={{ fill: '#FFFFFF' }} d="M372.87,278.261H205.913c-9.217,0-16.696-7.479-16.696-16.696 c0-9.217,7.479-16.696,16.696-16.696H372.87c9.217,0,16.696,7.479,16.696,16.696C389.565,270.782,382.087,278.261,372.87,278.261z"/>
      <path style={{ fill: '#E6F3FF' }} d="M372.87,244.87H256v33.391h116.87c9.217,0,16.696-7.479,16.696-16.696 C389.565,252.348,382.087,244.87,372.87,244.87z"/>
    </svg>
            </a>
          </span>
        </div>
        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
          
          <div class="flex ml-6 items-center">
          <span class="title-font font-medium text-2xl ml-0 text-gray-900">
          <svg
      fill="#000000"
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      id="date"
      data-name="Flat Line"
      xmlns="http://www.w3.org/2000/svg"
      className="icon flat-line"
    >
      <path
        id="secondary"
        d="M3,10H21a0,0,0,0,1,0,0V20a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V10A0,0,0,0,1,3,10Z"
        style={{ fill: 'rgb(44, 169, 188)', strokeWidth: 2 }}
      ></path>
      <path
        id="primary"
        d="M20,21H4a1,1,0,0,1-1-1V10H21V20A1,1,0,0,1,20,21ZM21,6a1,1,0,0,0-1-1H4A1,1,0,0,0,3,6v4H21ZM16,3V7M8,3V7"
        style={{ fill: 'none', stroke: 'rgb(0, 0, 0)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}
      ></path>
    </svg>
          { dayNames[(new Date(event?.events?.date)).getDay()]  },{ (new Date(event?.events?.date)).getDate()  } { month[(new Date(event?.events?.date)).getMonth()]  }</span>
          <span class="title-font font-medium text-2xl ml-4 text-gray-900">
          <svg width="30px" height="30px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
<path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linejoin="round"/>
<path d="M24.0083 12L24.0071 24.0088L32.4865 32.4882" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
          {event?.events?.time}</span>
          <span class="title-font font-medium text-2xl ml-8 text-gray-900">
          <svg width="20px" height="20px" viewBox="-5.07 0 43.012 43.012" xmlns="http://www.w3.org/2000/svg">
  <path id="location" d="M406.185,260.012c-18.028-13.493-16.233-28.572-16.233-28.572h11.184a4.7,4.7,0,0,0-.142,1.1,5.378,5.378,0,0,0,.466,2.1,7.353,7.353,0,0,0,2.622,2.615,5,5,0,0,0,4.218,0,7.316,7.316,0,0,0,2.619-2.615,5.4,5.4,0,0,0,.465-2.105,4.728,4.728,0,0,0-.141-1.1h11.5S424.217,246.277,406.185,260.012Zm4.731-29.576a7.353,7.353,0,0,0-2.619-2.618,4.977,4.977,0,0,0-4.211,0,7.389,7.389,0,0,0-2.622,2.618,6.468,6.468,0,0,0-.326,1H389.966c0-7.972,7.335-14.435,16.383-14.435s16.383,6.463,16.383,14.435H411.242A6.523,6.523,0,0,0,410.915,230.436Z" transform="translate(-389.902 -217)" fill="#2d5be2"/>
</svg>{event?.events?.venue}</span>
           
          </div>
        </div>
        <p class="leading-relaxed">{event?.events?.description}</p>
       
      </div>
    </div>
  </div>
</section>

       </>
    );
}
