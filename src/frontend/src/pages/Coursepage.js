// // display individual course


// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";

// import { Container } from "../components";
// import axios from "axios";
// import { useSelector } from "react-redux";

// export default function Coursepage() {
//     const [course, setcourse] = useState();
//     const { courseId } = useParams();
//     console.log(courseId)
//     const [studentsname,setstudentsname] = useState([])
//     const [studentsobjectid,setstudentsobjectid] = useState([])
//     const [response, setresponse] = useState('');
//     const [error, seterror] = useState('');
//     const navigate = useNavigate();

//     const userData = useSelector((state) => state.auth.userData);

//     useEffect(() => {
//         // Fetch course details
//         axios.get(`/api/v1/courses/getcourse/${courseId}`)
//             .then(response => {
//                 setresponse(response?.data?.message)
//                 setcourse(response?.data?.data?.course);
//             })
//             .catch(error => {
//                 console.error("Error fetching course:", error);
//             });
//     }, [courseId]);

//     const getstudents = () => {
//         // Check if course is defined before fetching students
//         if (course) {
//             axios.get(`/api/v1/courses/studentsofcourse/${course._id}`)
//                 .then(response => {
//                     setresponse(response?.data?.message)
//                     setstudentsname(response?.data?.data?.studentsofcourse);
//                 })
//                 .catch(error => {
//                     console.error("Error fetching students:", error);
//                 });
//         } else {
//             console.warn("Course is not yet defined.");
//         }
//     };
   
//     const removestudent=(courseId,studentId)=>{
//         if (courseId && studentId) {
//             axios.patch(`/api/v1/courses/removestudent/${courseId}/${studentId}`)
//                 .then(response => {
//                     setresponse(response?.data?.message);
//                 })
//                 .catch(error => {
//                     console.error("Error fetching students:", error);
//                 });
//         } else {
//             console.warn("Course is not yet defined.");
//         }
//     }


//     return  course? (
//         <div className="py-8">
//             <Container>
//                 {response && <p className="text-green-700">{response}</p>}
//                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//                     <img
//                         src={course.thumbnail}
//                         alt={course.title}
//                         className="rounded-xl h-10 max-w-3xl"
//                     />

                
                   
//                 </div>
//                 <div className="w-full mb-6">
//                     <h1 className="text-2xl font-bold">{course.title}</h1>
//                 </div>
//                 <div className="w-full mb-6">
//                     <h1 className="text-2xl font-bold">{course.branch}</h1>
//                 </div>
//                 <div className="w-full mb-6">
//                     <h1 className="text-2xl font-bold">{course.semester}</h1>
//                 </div>
//                 <div className="browser-css">
//                     {course.description}
//                     </div>
//                  <button type='button' onClick={getstudents}>students</button>   
//                   {studentsname&&<div className='flex flex-wrap'>
//                 {studentsname.map((student) => (
//                     <div key={student.studentobjectid} className='p-2 w-1/4 bg-red-500'>
//                         {student.name},{student.regid}
//                         {userData?.userrole==1&&
//                         <button type='button' onClick={removestudent(courseId,student.studentobjectid)}>delete</button>
// }
//                     </div>
                   
//                 ))}
//                 </div>}
                              
//                               </Container>
//         </div>
//     ) : null;
// }




import React, { useState,useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function PostCard() {
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

    const navigate=useNavigate();

    useEffect(() => {
                // Fetch course details
                axios.get(`/api/v1/courses/getcourse/${courseId}`)
                    .then(response => {
                        setresponse(response?.data?.message)
                        setCourse(response?.data?.data?.course);
                    })
                    .catch(error => {
                        console.error("Error fetching course:", error);
                    });
            }, [courseId]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === "students") {
            fetchStudents();
        } 
        else if (tab === "deletecourse") {
            
        }
        else if (tab === "editcourse") {
            fetchCourse();
            setediting(true);

        }
        
        
        
        
        else {
            fetchCourse();
        }
    };
    const deletecourse = async() => {
        axios.delete(`/api/v1/courses/deletecourse/${courseId}`)
            .then(response => {
                setresponse(response?.data?.message)
                setActiveTab('deletecourse')
                
                               
            })
            .catch(error => {
                seterror('Error fetching course. Please try again later.');
                console.error("Error fetching course:", error);
            });
    };
    const updatecourse=async()=>{
        await axios.patch(`/api/v1/courses/updatecourse/${courseId}`,
    {
        title:title,
        description:description,
        semester:semester,
        branch:branch
    }).then(function (response) {
            console.log(response);
            setresponse(response?.data?.message)
            setediting(false)
            setActiveTab("course")
            setCourse(response?.data?.data?.course)
            seterror('')
          })
          .catch(function (error) {
            console.log(error?.response?.data?.errors[0]);
            seterror(error?.response?.data?.errors[0])
            setresponse('')
          });
    }


    const fetchCourse = () => {
        axios.get(`/api/v1/courses/getcourse/${courseId}`)
            .then(response => {
                setCourse(response?.data?.data?.course);
                settitle(course.title);
                setdescription(course.description);
                setsemester(course.semester);
                setbranch(course.branch)

                
            })
            .catch(error => {
                seterror('Error fetching course. Please try again later.');
                console.error("Error fetching course:", error);
            });
    };

    const fetchStudents = () => {
        axios.get(`/api/v1/courses/studentsofcourse/${courseId}`)
            .then(response => {
                setStudents(response?.data?.data?.studentsofcourse);
            })
            .catch(error => {
                seterror('Error fetching students. Please try again later.');
                console.error("Error fetching students:", error);
            });
    };

    const removeStudent = (studentId) => {
        axios.patch(`/api/v1/courses/removestudent/${courseId}/${studentId}`)
            .then(response => {
                // Update students list after removal
                fetchStudents();
            })
            .catch(error => {
                seterror('Error removing student. Please try again later.');
                console.error("Error removing student:", error);
            });
    };



   const[joined,setjoined]=useState(false)
    const joincourse=async()=>{
        await axios.patch(`/api/v1/courses/addstudenttocourse/${courseId}`).then(function (response) {
            console.log(response);
            setjoined(true)
            setresponse(response?.data?.message)
            seterror('')
          })
          .catch(function (error) {
            console.log(error.response.data.errors[0]);
            seterror(error?.response?.data?.errors[0])
            setresponse('')
          });
    }

    const leavecourse=async()=>{
      await axios.patch(`/api/v1/courses/removestudentfromcourse/${courseId}`).then(function (response) {
          console.log(response);
          setjoined(false)
          setresponse(response?.data?.message)
          seterror('')
        })
        .catch(function (error) {
          console.log(error?.response?.data?.errors[0]);
          seterror(error?.response?.data?.errors[0])
          setresponse('')
        });
  }

  useEffect(()=>{
    axios.get(`/api/v1/courses/studentsofcourse/${courseId}`)
            .then(response => {
                if(response?.data?.data?.students.includes(userData?._id)){
                    setjoined(true)
                }
            })
            .catch(error => {
                seterror('Error fetching students. Please try again later.');
                console.error("Error fetching students:", error);
            });
      
    
  },[joined])
    const handleSuccessClose = () => {
        if (response ==="course deleted successfully")
        {
            navigate('/my-courses')
        }
        setresponse('')
      };

      const handleErrorClose = () => {
        seterror('')
      };
       console.log("joined=",joined)




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
                <button
                    className={`${
                        activeTab === "course" ? "bg-blue-500" : "bg-gray-300"
                    } text-white px-4 py-2 rounded-md`}
                    onClick={() => handleTabChange("course")}
                >
                    Course
                </button>
                <button
                    className={`${
                        activeTab === "students" ? "bg-blue-500" : "bg-gray-300"
                    } text-white px-4 py-2 rounded-md  `}
                    onClick={() => handleTabChange("students")}
                >
                    Enrolled
                </button>
                {
                    (course?.owner===userData?._id)&& 
                    <button
                    className={`${
                        activeTab === "editcourse" ? "bg-blue-500" : "bg-gray-300"
                    } text-white px-4 py-2 rounded-md  `}
                    onClick={() => handleTabChange("editcourse")}
                >
                    Edit Course
                </button>
                }
                {
                    (course?.owner===userData?._id)&& 
                    <button
                    className={`${
                        activeTab === "deletecourse" ? "bg-blue-500" : "bg-gray-300"
                    } text-white px-4 py-2 rounded-md  `}
                    onClick={() => handleTabChange("deletecourse")}
                    
                >
                    Delete Course
                </button>
                }
            </div>
            {activeTab === "course" && course && (
                <div>
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="rounded-xl h-64 w-full object-cover mb-4"
                    />
                   
                    <>
                    <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                    <p className="text-lg mb-2">{course.branch}</p>
                    <p className="text-lg mb-4">{course.semester}</p>
                    <p className="text-lg">{course.description}</p>
                    </>

                    {joined?(
  userData?.userrole==2?(<button class="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" onClick={leavecourse}>
  Leave
</button>):(<></>)
):
  (
    userData?.userrole==2?(<button class="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" onClick={joincourse}>
    Join
  </button>):(<></>))
}
                </div>
            )}
            {activeTab === "editcourse" && userData?._id===course.owner && (
                <div>
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="rounded-xl h-64 w-full object-cover mb-4"
                    />
                    {editing && <>
                        <input type='text' className="text-2xl text-black border-black border-2 font-bold mb-2" value={title} onChange={(e)=>settitle(e.target.value)}></input>
                        <br/>
                        <select className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 'id="semester" value={semester} onChange={(e)=>{setsemester(e.target.value)}} required>
  <option value='1'>1</option>
  <option value='2'>2</option>
  <option value='3'>3</option>
  <option value='4'>4</option>
  <option value='5'>5</option>
  <option value='6'>6</option>
  <option value='7'>7</option>
  <option value='8'>8</option>
  
</select>
<br/>
<select className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 'id="branch" value={branch} onChange={(e)=>{setbranch(e.target.value)}} required>

   
  <option value='Computer Engineering'>Computer Engineering</option>
  <option value='Information Technology'>Information Technology</option>
  <option value='Civil Engineering'>Civil Engineering</option>
  <option value='Electrical Engineering'>Electrical Engineering</option>
  <option value='Electronics Engineering'>Electronics Engineering</option>
  <option value='Electronics and Telecommunication Engineering'>Electronics and Telecommunication Engineering</option>
  <option value='Mechanical Engineering'>Mechanical Engineering</option>
  <option value='Production Engineering'>Production Engineering</option>
  <option value='Textile Engineering'>Textile Engineering</option>
  
</select>
<br/>
                        <input type='text' className="text-2xl text-black border-black border-2 font-bold mb-2" value={description} onChange={(e)=>setdescription(e.target.value)}></input>
                       <br/>
                        <button
              class="text-slate-800 hover:text-green-600 text-sm bg-green-500 hover:bg-slate-100 border  border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center " 
              onClick={updatecourse}>
              <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
              </span>
              <span class="hidden md:inline-block">Save</span>
          </button>
                     </>}

                   
                    

                    {joined?(
  userData?.userrole==2?(<button class="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" onClick={leavecourse}>
  Leave
</button>):(<></>)
):
  (
    userData?.userrole==2?(<button class="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" onClick={joincourse}>
    Join
  </button>):(<></>))
}
                </div>
            )}


{activeTab === "deletecourse" && userData?._id===course.owner  && (
    <>
       { !response &&    
               <div id="deleteModal" tabindex="-1" aria-hidden="true" class="text-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50  flex justify-center items-center w-full md:inset-0 h-modal md:h-full">
                <div class="relative p-4 w-full max-w-md h-full md:h-auto   ">
                 
                    <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal" onClick={()=>{setActiveTab('course')}}>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this course ?{course.title}</p>
                        <div class="flex justify-center items-center space-x-4">
                            <button onClick={()=>{setActiveTab('course')}} data-modal-toggle="deleteModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                No, cancel
                            </button>
                            <button onClick={deletecourse}type="button" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
}
            </>
        
            )}





          {activeTab === "students" && (
    <div>
        <span className="block mb-4">Teacher: {course.owner}</span>
        <div className="bg-white rounded-md overflow-hidden">
            <h2 className="text-lg font-bold px-4 py-2 bg-blue-500 text-white">Students Enrolled:{students.length}</h2>
            <div className="p-4">
                {students.length > 0 ? (
                    <ul>
                        {students.map((student) => (
                            <li key={student.studentobjectid} className="flex justify-between items-center py-2 border-b">
                                <div>
                                    <p className="text-lg">{student.name} - {student.regid}</p>
                                </div>
                                {userData?.userrole === 1 && (
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => removeStudent(student.studentobjectid)}>Remove</button>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No students enrolled.</p>
                )}
            </div>
        </div>
    </div>
)}

            {error && <p className="text-red-700">{error}</p>}
        </div>
        </>
    );
}
