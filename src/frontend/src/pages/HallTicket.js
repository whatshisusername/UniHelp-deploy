import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Container, CourseCard } from '../components'
import { useSelector } from "react-redux";
import axios from 'axios'
import { useParams } from 'react-router-dom';

const HallTicket = () => {
  const [data, setData] = useState([]);
  const [mycourses,setmycourses]=useState([]);
  const [examdates,setexamdates]=useState([]);
  
const [semcourses, setsemcourses] = useState([])
    const[hitsem,sethitsem]=useState(false)
    const [response,setresponse]=useState('')
    const [error,seterror]=useState('')
    const [semester,setsemester]=useState(9)
    const [branch,setbranch]=useState('All')
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

  useEffect(()=>{
    if(userData.userrole===2){
    console.log("going to hit searchbystudent")
    axios.get('/api/v1/courses/searchbystudent')
    .then(function (response) {
      console.log(response);
      console.log("mycourses",response?.data?.data?.listofcourses)
      setmycourses(response?.data?.data?.listofcourses)
      setresponse(response?.data?.message)
      seterror('')
    })
    .catch(function (error) {
      console.log(error?.response?.data?.errors[0]);
      seterror(error?.response?.data?.errors[0])
      setresponse('')
    });
  }}
,[mycourses])

// console.log("going to hit examdates")
//   axios.get('/api/v1/courses/examdates')
//   .then(function (response) {
//     console.log(response);
//     console.log("examdates",response?.data?.data?.examdates)
//     setexamdates(response?.data?.data?.examdates)
//     setresponse(response?.data?.message)
//     seterror('')
//   })
//   .catch(function (error) {
//     console.log(error?.response?.data?.errors[0]);
//     seterror(error?.response?.data?.errors[0])
//     setresponse('')
//   });

useEffect(() => {
  console.log("going to hit examdates");
  axios.get('/api/v1/courses/examdates')
      .then(function (response) {
          console.log(response);
          console.log("examdates", response?.data?.data?.examdates);
          setexamdates(response?.data?.data?.examdates);
          setresponse(response?.data?.message);
          seterror('');
      })
      .catch(function (error) {
          console.log(error?.response?.data?.errors[0]);
          seterror(error?.response?.data?.errors[0]);
          setresponse('');
      });
}, [examdates]); 




//   useEffect(() => {
//     fetch("https://dummyjson.com/products")
//       .then((res) => res.json())
//       .then(async (data) => {
//         setData(data);
//       })
//       .then((json) => console.log(json));
//   }, []);

  const exportPdf = async () => {
    const doc = new jsPDF({ orientation: "landscape" });

    // Get the heading text
    const headingText = document.getElementById('heading').innerText;

    // Calculate the width of the text and the center position
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(headingText);
    const x = ((pageWidth - textWidth) / 2)-20;

    // Add the heading text to the PDF
    doc.setFontSize(24);
    doc.text(headingText, x, 10);
   
    
     // Get the content of the HTML element
     const content = document.getElementById('content').innerText;

     // Add the text content to the PDF
     doc.text(content, 15, 30);
   
    const imgElement = document.getElementById('myImage');
                
    doc.addImage(imgElement, 'JPEG',210,30 , 50, 50);
                

        
    doc.autoTable({
      startY: 100,
      html: "#my-table",
    });

    doc.save(`${userData.fullname}_${userData.registrationId}_hallticket.pdf`);
  };


if(mycourses.length>0){
  return (
    // <div style={{ padding: "30px" }} class="flex items-center justify-center">
      
    //   <h1 class="text-3xl font-bold text-center" id="heading">EXAMINATION ADMIT CARD</h1>
    //   <div id="content" >
      
    //   <img src={userData.avatar} alt="Example Image" id='myImage' class="absolute top-16 right-4 w-24 h-auto"></img>
    //     <ul>
    //         <li>REGISTRATION ID: {userData.registrationId}</li>
    //         <li>STUDENT NAME: {userData.fullname}</li>
    //         <li>BRANCH: {userData.branch}</li>
    //         <li>SEMESTER: {userData.semester}</li>
    //         <li>EXAM: ESE</li>
    //     </ul>

    // </div>
      
    //   <table className="table table-bordered" id="my-table">
    //     <thead style={{ background: "yellow" }}>
    //       <tr>
    //         <th scope="col">Course Title</th>
    //         <th scope="col">Exam Date</th>
    //         <th scope="col">Time</th>
    //         <th scope="col">Invigilator Sign</th>
    //       </tr>
    //     </thead>
    //     <tbody>
 
    //     {mycourses && mycourses.map((course, index) => (
    //                 <tr key={course.id}>
    //                     <td>{course.title}</td>
    //                     <td>{examdates[index] || 'N/A'}</td>
    //                     <td>09:15 AM TO 12:15 PM</td>
    //                     <td> </td>
    //                 </tr>
    //             ))}

            
    //     </tbody>
    //   </table>

    //   <button
    //     className="btn btn-primary float-end mt-2 mb-2"
    //     onClick={exportPdf}
    //   >
    //     Export
    //   </button>
    // </div>
    <>
    <div class="p-8 flex flex-col items-center justify-center relative">
    <h1 class="text-3xl font-bold text-center mb-4" id="heading">EXAMINATION ADMIT CARD</h1>
    <div id="content" class="ml-0 mb-4 relative mr-96">
        <img src={userData.avatar.replace('http://', 'https://')} alt="Example Image" id="myImage" class="absolute  top-1 left-96 w-20 h-15 rounded-md shadow-md mb-96"/>
        <ul class="list-none">
            <li class="mb-2"><strong>REGISTRATION ID:</strong> {userData.registrationId}</li>
            <li class="mb-2"><strong>STUDENT NAME:</strong> {userData.fullname}</li>
            <li class="mb-2"><strong>BRANCH:</strong> {userData.branch}</li>
            <li class="mb-2"><strong>SEMESTER:</strong> {userData.semester}</li>
            <li class="mb-2"><strong>EXAM:</strong> ESE</li>
        </ul>
    </div>
    
    <div class="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden mt-8">
        <table class="min-w-full table-auto border-collapse border border-gray-200" id="my-table">
            <thead class="bg-blue-300">
                <tr>
                    <th class="border border-gray-200 px-4 py-2 text-left">Course Title</th>
                    <th class="border border-gray-200 px-4 py-2 text-left">Exam Date</th>
                    <th class="border border-gray-200 px-4 py-2 text-left">Time</th>
                    <th class="border border-gray-200 px-4 py-2 text-left">Invigilator Sign</th>
                </tr>
            </thead>
            <tbody>
                {mycourses && mycourses.map((course, index) => (
                    <tr key={course.id}>
                        <td class="border border-gray-200 px-4 py-2">{course.title}</td>
                        <td class="border border-gray-200 px-4 py-2">{examdates[index] || 'N/A'}</td>
                        <td class="border border-gray-200 px-4 py-2">09:15 AM TO 12:15 PM</td>
                        <td class="border border-gray-200 px-4 py-2"></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    <button
        class="btn btn-primary mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow-lg hover:bg-blue-700"
        onClick={exportPdf}
    >
        Download
    </button>
</div>
</>
  );}
  else{
    return(
<>
<h1 class="text-3xl font-bold text-center mb-4 mt-42" id="heading">EXAMINATION ADMIT CARD NOT GENERATED YET</h1>

</>
    );
  }
};

export default HallTicket;
