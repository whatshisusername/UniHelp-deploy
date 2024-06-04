import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import TodayPreview from "./TodayPreview";
import OtherPreview from "./OtherPreview";

const EventsHome = () => {
  const [todayEvents, setTodayEvents] = useState([]);
  const [otherEvents, setOtherEvents] = useState([]);
  const [allevents, setAllEvents] = useState([]);
  const [error, setError] = useState("");
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  
  var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    axios.get("/api/v1/events/today-events")
      .then(function (response) {
        console.log(response);
        setTodayEvents(response?.data?.data?.listofevents);
        setError("");
      })
      .catch(function (error) {
        console.log(error?.response?.data?.errors[0]);
        setError(error?.response?.data?.errors[0]);
      });
  }, []);

  useEffect(() => {
    axios.get("/api/v1/events/other-events")
      .then(function (response) {
        console.log(response);
        setOtherEvents(response?.data?.data?.listofevents);
        setError("");
      })
      .catch(function (error) {
        console.log(error?.response?.data?.errors[0]);
        setError(error?.response?.data?.errors[0]);
      });
  }, [otherEvents]);

  useEffect(() => {
    axios.get("/api/v1/events/all-events")
      .then(function (response) {
        console.log(response);
        setAllEvents(response?.data?.data?.listofevents);
        setError("");
      })
      .catch(function (error) {
        console.log(error?.response?.data?.errors[0]);
        setError(error?.response?.data?.errors[0]);
      });
  }, [allevents]);

  if(allevents.length===0){
    return (
      <>
      <h1 class="mb-4 mt-64 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">No Event Yet</span> </h1>
      </>
    )
  }

  return (
    <div className="container mx-auto px-4">
       <h1 class="text-4xl font-bold text-gray-900 text-center leading-tight mb-2 pb-4 relative">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Events</span>
        
    </h1>
      {todayEvents.length > 0? (
        
        
          <>
          <h1 class="mb-4 text-3xl  font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Happening Today- { dayNames[(new Date()).getDay()]  },{ (new Date()).getDate()  } { month[(new Date()).getMonth()]  }</span> </h1>
          <TodayPreview />
          </>
       
      ):(<><h1 class="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">No Events Happening Today!</span> </h1><br/></>)}
      {otherEvents.length > 0 && (
    <>
      <h5 class="mb-4 text-5 font-extrabold text-gray-900 border-l-4  border-teal-400 dark:text-white md:text-2xl lg:text-2xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Other Events</span> </h5>
   
          <OtherPreview />

          </>
       
      )}
    </div>
  );
};

export default EventsHome;
