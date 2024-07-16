//shows all the requests to exam dept

import React, { useState,useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams ,Navigate,Link,useNavigate} from "react-router-dom";



export default function Applications() {
    const [activeTab, setActiveTab] = useState("course");
    const {courseId}=useParams();
    const [course, setCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [error, seterror] = useState('');
    const [response, setresponse] = useState('');
    const [editing,setediting]=useState(false);
    const[deleted,setdeleted]=useState(false)
    const userData = useSelector((state) => state.auth.userData);


    const [title,settitle]=useState("")
    const [branch,setbranch]=useState('')
    const [semester,setsemester]=useState('')
    const [description,setdescription]=useState('')


    const [filename,setfilename]=useState("")
    const [notes,setnotes]=useState([])

    const [allapplications,setallapplications]=useState([])

    const [courseowner,setcourseowner] = useState('')

    const navigate=useNavigate();

    const [applied,setapplied]=useState(false)

    
      useEffect(()=>{

        axios.get('/api/v1/applications/allapplications')
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



      const handleSuccessClose = () => {
        if (response ==="course deleted successfully")
        {
            navigate('/my-courses')
        }
        else if (response ==="notes added successfully")
            {
                setActiveTab('notes')
            }
        setresponse('')
      };

      const handleErrorClose = () => {
        seterror('')
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
       
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-start mb-4">
                
            </div>
            
           



    <div>
        
        <div className="bg-white rounded-md overflow-hidden">
            <h2 className="text-lg font-bold px-4 py-2 bg-blue-500 text-white"> Requests for Marksheet</h2>
            <div className="p-4">
                
                    <ul>
                    { allapplications.map((application)=>

(!application?.replied &&<li key={application?._id}  className="flex justify-between items-center py-2 border-b">
  <Link to={`/applicant/${application?.from}`}>
    <div>
      <p className="text-lg">{application?.content}</p>
    </div>
    
        <button  className="bg-blue-500 text-white px-4 py-2 rounded-md">View</button>
            
            </Link> 
</li>
))}
                        
                        
                    </ul>
               

            </div>
        </div>
    </div>




        </div>
        </>
    );
}
