import React, { useState,useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";





export default function Marksheet() {
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

    const [listofsemesterapplied,setlistofsemesterapplied]=useState([])

    const [courseowner,setcourseowner] = useState('')

    const navigate=useNavigate();

    const [applied,setapplied]=useState(false)

    const application = (semester) => {
        if(userData.semester>=semester){
        axios.post('/api/v1/applications/createapplication',{
            "semester":semester
        })
          .then(function (response) {
            console.log(response);
            setresponse(response?.data?.message|| response?.data?.errors[0]);
            // window.localStorage.setItem("loggedIn",true);
            // window.localStorage.setItem('userinfo',JSON.stringify(response?.data?.data?.user));
            // console.log("userinfo local=",JSON.parse(window.localStorage.getItem('userinfo')));
            // dispatch(authLogin(JSON.parse(window.localStorage.getItem('userinfo'))));
            setapplied(true);

            seterror('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            if(error?.response?.data?.errors[0]){
            seterror(error?.response?.data?.errors[0])};
            setresponse('')
          });
      }
    else{console.log("cannot apply");
        setresponse("cannot apply");
    }}

      useEffect(()=>{

        axios.get('/api/v1/applications/semesterapplied')
          .then(function (response) {
            console.log(response);
            
            // window.localStorage.setItem("loggedIn",true);
            // window.localStorage.setItem('userinfo',JSON.stringify(response?.data?.data?.user));
            // console.log("userinfo local=",JSON.parse(window.localStorage.getItem('userinfo')));
            // dispatch(authLogin(JSON.parse(window.localStorage.getItem('userinfo'))));
            setlistofsemesterapplied(response.data.data.listofsemesterapplied);
            console.log(response.data.data.listofsemesterapplied);          

            seterror('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            setresponse('')
          });
      },[listofsemesterapplied])

      console.log(listofsemesterapplied);
      console.log(listofsemesterapplied);
      console.log(listofsemesterapplied);
      console.log(listofsemesterapplied);

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
       
      const [allapplicantmarksheets,setallapplicantmarksheets]=useState([])
      useEffect(()=>{

        axios.get(`/api/v1/marksheets/getallapplicantmarksheets/${userData?._id}`)
          .then(function (response) {
            console.log(response);
            
            // window.localStorage.setItem("loggedIn",true);
            // window.localStorage.setItem('userinfo',JSON.stringify(response?.data?.data?.user));
            // console.log("userinfo local=",JSON.parse(window.localStorage.getItem('userinfo')));
            // dispatch(authLogin(JSON.parse(window.localStorage.getItem('userinfo'))));
            setallapplicantmarksheets(response.data.data.allapplicantmarksheets);
      
            console.log(response.data.data.allapplicantmarksheets);          

            seterror('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            setresponse('')
          });
      },[allapplicantmarksheets])
      
      const [sem1marksheet,setsem1marksheet]=useState()
      useEffect(()=>{
        const semester=1;
        axios.get(`/api/v1/marksheets/marksheetexists/${userData?._id}/${semester}`)
          .then(function (response) {
            console.log(response);
            
            // window.localStorage.setItem("loggedIn",true);
            // window.localStorage.setItem('userinfo',JSON.stringify(response?.data?.data?.user));
            // console.log("userinfo local=",JSON.parse(window.localStorage.getItem('userinfo')));
            // dispatch(authLogin(JSON.parse(window.localStorage.getItem('userinfo'))));
            setsem1marksheet(response?.data?.data?.marksheet);
      
            console.log(response?.data?.data?.allapplicantmarksheets);          

            seterror('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            setresponse('')
          });
      },[sem1marksheet])


      const [sem2marksheet,setsem2marksheet]=useState()
      useEffect(()=>{
        const semester=2;
        axios.get(`/api/v1/marksheets/marksheetexists/${userData?._id}/${semester}`)
          .then(function (response) {
            console.log(response);
            
            // window.localStorage.setItem("loggedIn",true);
            // window.localStorage.setItem('userinfo',JSON.stringify(response?.data?.data?.user));
            // console.log("userinfo local=",JSON.parse(window.localStorage.getItem('userinfo')));
            // dispatch(authLogin(JSON.parse(window.localStorage.getItem('userinfo'))));
            setsem2marksheet(response?.data?.data?.marksheet);
      
            console.log(response?.data?.data?.allapplicantmarksheets);          

            seterror('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            setresponse('')
          });
      },[sem2marksheet])

      const [sem3marksheet,setsem3marksheet]=useState()
      useEffect(()=>{
        const semester=3;
        axios.get(`/api/v1/marksheets/marksheetexists/${userData?._id}/${semester}`)
          .then(function (response) {
            console.log(response);
            
            // window.localStorage.setItem("loggedIn",true);
            // window.localStorage.setItem('userinfo',JSON.stringify(response?.data?.data?.user));
            // console.log("userinfo local=",JSON.parse(window.localStorage.getItem('userinfo')));
            // dispatch(authLogin(JSON.parse(window.localStorage.getItem('userinfo'))));
            setsem3marksheet(response?.data?.data?.marksheet);
      
            console.log(response?.data?.data?.allapplicantmarksheets);          

            seterror('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            setresponse('')
          });
      },[sem3marksheet])

      const [sem4marksheet,setsem4marksheet]=useState()
      useEffect(()=>{
        const semester=4;
        axios.get(`/api/v1/marksheets/marksheetexists/${userData?._id}/${semester}`)
          .then(function (response) {
            console.log(response);
            
            // window.localStorage.setItem("loggedIn",true);
            // window.localStorage.setItem('userinfo',JSON.stringify(response?.data?.data?.user));
            // console.log("userinfo local=",JSON.parse(window.localStorage.getItem('userinfo')));
            // dispatch(authLogin(JSON.parse(window.localStorage.getItem('userinfo'))));
            setsem4marksheet(response?.data?.data?.marksheet);
      
            console.log(response?.data?.data?.allapplicantmarksheets);          

            seterror('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            setresponse('')
          });
      },[sem4marksheet])

      const [sem5marksheet,setsem5marksheet]=useState()
      useEffect(()=>{
        const semester=5;
        axios.get(`/api/v1/marksheets/marksheetexists/${userData?._id}/${semester}`)
          .then(function (response) {
            console.log(response);
            
            // window.localStorage.setItem("loggedIn",true);
            // window.localStorage.setItem('userinfo',JSON.stringify(response?.data?.data?.user));
            // console.log("userinfo local=",JSON.parse(window.localStorage.getItem('userinfo')));
            // dispatch(authLogin(JSON.parse(window.localStorage.getItem('userinfo'))));
            setsem5marksheet(response?.data?.data?.marksheet);
      
            console.log(response?.data?.data?.allapplicantmarksheets);        

            seterror('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            setresponse('')
          });
      },[sem5marksheet])
      
      const [sem6marksheet,setsem6marksheet]=useState()
      useEffect(()=>{
        const semester=6;
        axios.get(`/api/v1/marksheets/marksheetexists/${userData?._id}/${semester}`)
          .then(function (response) {
            console.log(response);
            
            // window.localStorage.setItem("loggedIn",true);
            // window.localStorage.setItem('userinfo',JSON.stringify(response?.data?.data?.user));
            // console.log("userinfo local=",JSON.parse(window.localStorage.getItem('userinfo')));
            // dispatch(authLogin(JSON.parse(window.localStorage.getItem('userinfo'))));
            setsem6marksheet(response?.data?.data?.marksheet);
      
            console.log(response?.data?.data?.allapplicantmarksheets);         

            seterror('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            setresponse('')
          });
      },[sem6marksheet])

      const [sem7marksheet,setsem7marksheet]=useState()
      useEffect(()=>{
        const semester=7;
        axios.get(`/api/v1/marksheets/marksheetexists/${userData?._id}/${semester}`)
          .then(function (response) {
            console.log(response);
            
            // window.localStorage.setItem("loggedIn",true);
            // window.localStorage.setItem('userinfo',JSON.stringify(response?.data?.data?.user));
            // console.log("userinfo local=",JSON.parse(window.localStorage.getItem('userinfo')));
            // dispatch(authLogin(JSON.parse(window.localStorage.getItem('userinfo'))));
            setsem7marksheet(response?.data?.data?.marksheet);
      
            console.log(response?.data?.data?.allapplicantmarksheets);          

            seterror('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            setresponse('')
          });
      },[sem7marksheet])

      const [sem8marksheet,setsem8marksheet]=useState()
      useEffect(()=>{
        const semester=8;
        axios.get(`/api/v1/marksheets/marksheetexists/${userData?._id}/${semester}`)
          .then(function (response) {
            console.log(response);
            
            // window.localStorage.setItem("loggedIn",true);
            // window.localStorage.setItem('userinfo',JSON.stringify(response?.data?.data?.user));
            // console.log("userinfo local=",JSON.parse(window.localStorage.getItem('userinfo')));
            // dispatch(authLogin(JSON.parse(window.localStorage.getItem('userinfo'))));
            setsem8marksheet(response?.data?.data?.marksheet);
      
            console.log(response?.data?.data?.allapplicantmarksheets);          

            seterror('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            setresponse('')
          });
      },[sem8marksheet])


      const semdownload = async (sem) => {
        const url = `sem${sem}marksheet`?.marksheet?.replace('.pdf', '.jpg');
        const response = await fetch(url);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${sem}_marksheet.pdf`; // Set the desired file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
            <h2 className="text-lg font-bold px-4 py-2 bg-blue-500 text-white">{userData?.fullname} {userData?.registrationId} Marksheets</h2>
            <div className="p-4">
                
                    <ul>
                        
                            {!sem1marksheet?(<li key='1' className="flex justify-between items-center py-2 border-b">
                                <div>
                                    <p className="text-lg">semester I{sem1marksheet?.semester}{sem1marksheet?.marksheet}</p>
                                </div>
                                {!listofsemesterapplied.includes(1)?(
                                    <button key='1' onClick={()=>{application(1)}} className={`${userData?.semester>=1 ? 'bg-blue-500' : 'bg-white-300'} text-white px-4 py-2 rounded-md`}>Apply</button>):(
                                        <button key='1' className="bg-green-500 text-white px-4 py-2 rounded-md">Applied</button>
                                    )
                                }
                            </li>):(<li key={sem1marksheet?._id}  className="flex justify-between items-center py-2 border-b">
 
 <div>
   <p className="text-3lg font-bold	">SEMESTER-{sem1marksheet?.semester}</p>
 </div>
     <a href={sem1marksheet?.marksheet.replace('.pdf', '.jpg')} target="_blank" className="bg-emerald-500 text-white px-4 py-2 rounded-md">View</a>
         
         
</li>)}




{!sem2marksheet?( <li key='2' className="flex justify-between items-center py-2 border-b">
                                <div>
                                    <p className="text-lg">semester II</p>
                                </div>
                                
                                {!listofsemesterapplied.includes(2)?(
                                    <button key='2' onClick={()=>{application(2)}} className={`${userData?.semester>=2 ? 'bg-blue-500' : 'bg-white-300'} text-white px-4 py-2 rounded-md`}>Apply</button>):(
                                        <button key='2' className="bg-green-500 text-white px-4 py-2 rounded-md">Applied</button>
                                    )
                                }
                               
                            </li>):(<li key={sem2marksheet?._id}  className="flex justify-between items-center py-2 border-b">
 
 <div>
   <p className="text-3lg font-bold	">SEMESTER-{sem2marksheet?.semester}</p>
 </div>
 
     <a href={sem2marksheet?.marksheet?.replace('.pdf', '.jpg')} target="_blank" className="bg-emerald-500 text-white px-4 py-2 rounded-md">View</a>
         
         
</li>)}






{!sem3marksheet?( <li key='3' className="flex justify-between items-center py-2 border-b">
                                <div>
                                    <p className="text-lg">semester III</p>
                                </div>
                                {!listofsemesterapplied.includes(3)?(
                                    <button key='3' onClick={()=>{application(3)}} className={`${userData?.semester>=3 ? 'bg-blue-500' : 'bg-white-300'} text-white px-4 py-2 rounded-md`}>Apply</button>):(
                                        <button key='3' className="bg-green-500 text-white px-4 py-2 rounded-md">Applied</button>
                                    )
                                }
                               
                            </li>):(<li key={sem3marksheet?._id}  className="flex justify-between items-center py-2 border-b ml-0">
 
 <div>
   <p className="text-3lg font-bold	">SEMESTER-{sem3marksheet?.semester}</p>
 </div>
 
 {/* <button onClick={()=>{semdownload(3)}} className="bg-emerald-500 text-white px-4 py-2 rounded-md mr-8 ml-8">Download</button> */}
     <a href={sem3marksheet?.marksheet?.replace('.pdf', '.jpg')} target="_blank" className="bg-emerald-500 text-white px-4 py-2 rounded-md">View</a>
      
          
</li>)}







{!sem4marksheet?( <li key='4' className="flex justify-between items-center py-2 border-b">
                                <div>
                                    <p className="text-lg">semester IV</p>
                                </div>
                                
                                {!listofsemesterapplied.includes(4)?(
                                    <button key='4' onClick={()=>{application(4)}} className={`${userData?.semester>=4 ? 'bg-blue-500' : 'bg-white-300'} text-white px-4 py-2 rounded-md`}>Apply</button>):(
                                        <button key='4' className="bg-green-500 text-white px-4 py-2 rounded-md">Applied</button>
                                    )
                                }
                               
                            </li>):(<li key={sem4marksheet?._id}  className="flex justify-between items-center py-2 border-b">
 
 <div>
   <p className="text-3lg font-bold	">SEMESTER-{sem4marksheet?.semester}</p>
 </div>
 
     <a href={sem4marksheet?.marksheet?.replace('.pdf', '.jpg')} target="_blank" className="bg-emerald-500 text-white px-4 py-2 rounded-md">View</a>
         
         
</li>)}




{!sem5marksheet?( <li key='5' className="flex justify-between items-center py-2 border-b">
                                <div>
                                    <p className="text-lg">semester V</p>
                                </div>
                                
                                {!listofsemesterapplied.includes(5)?(
                                    <button key='5' onClick={()=>{application(5)}} className={`${userData?.semester>=5 ? 'bg-blue-500' : 'bg-white-300'} text-white px-4 py-2 rounded-md`}>Apply</button>):(
                                        <button key='5' className="bg-green-500 text-white px-4 py-2 rounded-md">Applied</button>
                                    )
                                }
                               
                            </li>):(<li key={sem5marksheet?._id}  className="flex justify-between items-center py-2 border-b">
 
 <div>
   <p className="text-3lg font-bold	">SEMESTER-{sem5marksheet?.semester}</p>
 </div>
 
     <a href={sem5marksheet?.marksheet?.replace('.pdf', '.jpg')} target="_blank" className="bg-emerald-500 text-white px-4 py-2 rounded-md">View</a>
         
         
</li>)}





{!sem6marksheet?(<li key='6' className="flex justify-between items-center py-2 border-b">
                                <div>
                                    <p className="text-lg">semester VI</p>
                                </div>
                                
                                {!listofsemesterapplied.includes(6)?(
                                    <button key='6' onClick={()=>{application(6)}} className={`${userData?.semester>=6 ? 'bg-blue-500' : 'bg-white-300'} text-white px-4 py-2 rounded-md`}>Apply</button>):(
                                        <button key='6' className="bg-green-500 text-white px-4 py-2 rounded-md">Applied</button>
                                    )
                                }
                               
                            </li>):(<li key={sem6marksheet?._id}  className="flex justify-between items-center py-2 border-b">
 
 <div>
   <p className="text-3lg font-bold	">SEMESTER-{sem6marksheet?.semester}</p>
 </div>
 
     <a href={sem6marksheet?.marksheet?.replace('.pdf', '.jpg')} target="_blank" className="bg-emerald-500 text-white px-4 py-2 rounded-md">View</a>
         
         
</li>)}




{!sem7marksheet?(<li key='7' className="flex justify-between items-center py-2 border-b">
                                <div>
                                    <p className="text-lg">semester VII</p>
                                </div>
                                
                                {!listofsemesterapplied.includes(7)?(
                                    <button key='7' onClick={()=>{application(7)}} className={`${userData?.semester>=7 ? 'bg-blue-500' : 'bg-white-300'} text-white px-4 py-2 rounded-md`}>Apply</button>):(
                                        <button key='7' className="bg-green-500 text-white px-4 py-2 rounded-md">Applied</button>
                                    )
                                }
                               
                            </li>):(<li key={sem7marksheet?._id}  className="flex justify-between items-center py-2 border-b">
 
 <div>
   <p className="text-3lg font-bold	">SEMESTER-{sem7marksheet?.semester}</p>
 </div>
 
     <a href={sem7marksheet?.marksheet?.replace('.pdf', '.jpg')} target="_blank" className="bg-emerald-500 text-white px-4 py-2 rounded-md">View</a>
         
         
</li>)}





{!sem8marksheet?(<li key='8' className="flex justify-between items-center py-2 border-b">
                                <div>
                                    <p className="text-lg">semester VIII</p>
                                </div>
                                
                                {!listofsemesterapplied.includes(8)?(
                                    <button key='8' onClick={()=>{application(8)}} className={`${userData?.semester>=8 ? 'bg-blue-500' : 'bg-white-300'} text-white px-4 py-2 rounded-md`}>Apply</button>):(
                                        <button key='8' className="bg-green-500 text-white px-4 py-2 rounded-md">Applied</button>
                                    )
                                }
                               
                            </li>):(<li key={sem8marksheet?._id}  className="flex justify-between items-center py-2 border-b">
 
 <div>
   <p className="text-3lg font-bold	">SEMESTER-{sem8marksheet?.semester}</p>
 </div>
 
     <a href={sem8marksheet?.marksheet} target="_blank" className="bg-emerald-500 text-white px-4 py-2 rounded-md">View</a>
         
         
</li>)}
                        
                    </ul>
               

            </div>
        </div>
    </div>




        </div>
        </>
    );
}
