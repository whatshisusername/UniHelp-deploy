import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Container, CourseCard } from '../components'
import { useSelector } from "react-redux";
import axios from 'axios'
import { useParams,Link } from 'react-router-dom';



//on clicking requests opens applicants interface for exam department.
const Applicant = () => {
  const [data, setData] = useState([]);
  const [mycourses,setmycourses]=useState([]);
  const [examdates,setexamdates]=useState([]);
  const {applicantid}=useParams();
  const [applicantinfo,setapplicantinfo]=useState([]);
    const [semcourses, setsemcourses] = useState([]);
    const [allapplications,setallapplications]=useState([])

    const [allapplicantmarksheets,setallapplicantmarksheets]=useState([])

    const[hitsem,sethitsem]=useState(false)
    const [response,setresponse]=useState('')
    const [error,seterror]=useState('')
    const [semester,setsemester]=useState(1)
    const [branch,setbranch]=useState('All')
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    const [sem8marksheet,setsem8marksheet]=useState();


    useEffect(()=>{

        axios.get(`/api/v1/users/getuser/${applicantid}`)
          .then(function (response) {
            console.log(response);
            
            // window.localStorage.setItem("loggedIn",true);
            // window.localStorage.setItem('userinfo',JSON.stringify(response?.data?.data?.user));
            // console.log("userinfo local=",JSON.parse(window.localStorage.getItem('userinfo')));
            // dispatch(authLogin(JSON.parse(window.localStorage.getItem('userinfo'))));
            setapplicantinfo(response.data.data.user);
            console.log(response.data.data.user);          

            seterror('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            setresponse('')
          });
      },[applicantinfo])


      useEffect(()=>{

        axios.get(`/api/v1/applications/applicationofuser/${applicantid}`)
          .then(function (response) {
            console.log(response);
            
            // window.localStorage.setItem("loggedIn",true);
            // window.localStorage.setItem('userinfo',JSON.stringify(response?.data?.data?.user));
            // console.log("userinfo local=",JSON.parse(window.localStorage.getItem('userinfo')));
            // dispatch(authLogin(JSON.parse(window.localStorage.getItem('userinfo'))));
            setallapplications(response.data.data.allapplications);
            console.log(response.data.data.allapplications);          

            seterror('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            setresponse('')
          });
      },[allapplications])



      const addmarksheet= async(e)=>{
        
        e.preventDefault()
        

        // Create FormData object to send form data including files
        const formData = new FormData();
    
        
        formData.append('semester', semester===''?1:semester);
  
        const marksheetFile = document.getElementById(`marksheet`)?.files[0];
        console.log(marksheetFile)
        formData.append('marksheet', marksheetFile);
    
        
    

        // Perform your axios POST request with FormData
        await axios.post(`/api/v1/marksheets/createmarksheet/${applicantid}`,formData)
          .then(function (response) {
            console.log(response);
            setresponse(response?.data?.message)
            
            seterror('')
            
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            
            setresponse('')
          });
      }

      


      useEffect(()=>{

        axios.get(`/api/v1/marksheets/getallapplicantmarksheets/${applicantid}`)
          .then(function (response) {
            console.log(response);
            
            // window.localStorage.setItem("loggedIn",true);
            // window.localStorage.setItem('userinfo',JSON.stringify(response?.data?.data?.user));
            // console.log("userinfo local=",JSON.parse(window.localStorage.getItem('userinfo')));
            // dispatch(authLogin(JSON.parse(window.localStorage.getItem('userinfo'))));
            setallapplicantmarksheets(response.data.data.allapplicantmarksheets);
            setsem8marksheet(response?.data?.data?.allapplicantmarksheets[0])
            console.log(response.data.data.allapplicantmarksheets);          

            seterror('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            setresponse('')
          });
      },[allapplicantmarksheets])

      const handleSuccessClose = () => {
        setresponse('')
      };

  return (
   <>
      {response &&    
             <div className="font-regular relative block w-full max-w-screen-md rounded-lg bg-green-500 px-4 py-4 text-base text-white ml-96" data-dismissible="alert">
             <div className="absolute top-4 left-4">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mt-px h-6 w-6">
                 <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"></path>
               </svg>
             </div>
             <div className="ml-8 mr-12">
               <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased">Success</h5>
               <p className="mt-2 block font-sans text-base font-normal leading-relaxed text-white antialiased">{response}</p>
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
    <div class="p-8 w-fit h-fit mb-4 mt-4 ml-96 flex flex-col  items-center justify-center relative relative border-2 border-blue-500 rounded-md">
    <h1 class="text-3xl font-bold text-center mb-4" id="heading">Applicant</h1>
    <div id="content" class="ml-0 mb-4 relative mr-96">
        <img src={applicantinfo?.avatar} alt="Example Image" id="myImage" class="absolute  top-1 left-96 w-20 h-15 rounded-md shadow-md mb-96"/>
        <ul class="list-none">
            <li class="mb-2"><strong>REGISTRATION ID:</strong> {applicantinfo?.registrationId}</li>
            <li class="mb-2"><strong>STUDENT NAME:</strong> {applicantinfo?.fullname}</li>
            <li class="mb-2"><strong>BRANCH:</strong> {applicantinfo?.branch}</li>
            <li class="mb-2"><strong>SEMESTER:</strong> {applicantinfo?.semester}</li>
        </ul>
    </div>
    
   
</div>




<div>
        
        <div className="bg-white absolute top-20 mt-2 right-11 h-fit w-fit rounded-md overflow-hidden">
            <h2 className="text-s font-bold px-4 py-2 bg-blue-500 text-white">Requests</h2>
            <div className="p-4">
                
                    <ul>
                    { allapplications.map((application)=>

(!application?.replied&&<li key={application?._id}  className="flex justify-between items-center py-2 border-b">

    <div>
      <p className="text-lg">{application?.content}</p>
    </div>
    
</li>
))}
                        
                        
                    </ul>
               

            </div>
        </div>
    </div>




      




        
        <div className="bg-white  h-fit w-90 rounded-md overflow-hidden ml-4 mr-4">
            <h2 className="text-lg font-bold px-4 py-2 bg-blue-500 text-white">Marksheets</h2>
            <div className="p-4">
                
                    <ul>
                    { allapplicantmarksheets.map((applicantmarksheet)=>

(<li key={applicantmarksheet?._id}  className="flex justify-between items-center py-2 border-b">
 
    <div>
      <p className="text-3lg font-bold	">SEMESTER-{applicantmarksheet?.semester}</p>
    </div>
    
        <a href={applicantmarksheet.marksheet.replace('.pdf', '.jpg')} target="_blank" className="bg-blue-500 text-white px-4 py-2 rounded-md">View</a>
            
            
</li>
))}
                        
                        
                    </ul>
               

            </div>
        </div>
        


{/* <div class="p-8 h-fit w-fit flex flex-col  relative">
<label htmlFor="marksheet">Marksheet:</label>
    <input className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full' type="file" id="marksheet" name="marksheet" />
    <br/>

    <label >semester</label>
<select className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 'id="semester" value={semester} onChange={(e)=>{setsemester(e.target.value)}} required>
 {applicantinfo.semester>=1&& <option value='1'>1</option>}  
 {applicantinfo.semester>=2&&<option value='2'>2</option>}
 {applicantinfo.semester>=3&&<option value='3'>3</option>}
 {applicantinfo.semester>=4 &&<option value='4'>4</option>}
  {applicantinfo.semester>=5 &&<option value='5'>5</option>}
  {applicantinfo.semester>=6 && <option value='6'>6</option>}
  {applicantinfo.semester>=7 &&<option value='7'>7</option>}
  {applicantinfo.semester>=8 &&<option value='8'>8</option>}
  
</select>
      

      
    <button key='8' onClick={addmarksheet} className="bg-gray-50 hover:bg-gray-50 text-black font-bold py-2 px-4 border border-blue-700 rounded ml-40 mt-1">Upload</button>
      
  </div> */}

<div className="p-8 h-fit w-80 flex flex-col relative border-2 border-blue-500 rounded-md ml-96">
    <label htmlFor="marksheet">Marksheet:</label>
    <input className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full' type="file" id="marksheet" name="marksheet" />
    <br/>

    <label>Semester:</label>
    <select className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200' id="semester" value={semester} onChange={(e) => { setsemester(e.target.value) }} required>
        {applicantinfo.semester >= 1 && <option value='1'>1</option>}
        {applicantinfo.semester >= 2 && <option value='2'>2</option>}
        {applicantinfo.semester >= 3 && <option value='3'>3</option>}
        {applicantinfo.semester >= 4 && <option value='4'>4</option>}
        {applicantinfo.semester >= 5 && <option value='5'>5</option>}
        {applicantinfo.semester >= 6 && <option value='6'>6</option>}
        {applicantinfo.semester >= 7 && <option value='7'>7</option>}
        {applicantinfo.semester >= 8 && <option value='8'>8</option>}
    </select>

    <button key='8' onClick={addmarksheet} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-4 self-center">
        Upload
    </button>
</div>


</>
  )
 
};

export default Applicant;