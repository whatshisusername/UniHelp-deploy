import React, {useState, useEffect} from 'react'
import { Container, CourseCard } from '../components'
import { useSelector } from "react-redux";
import axios from 'axios'

function MyCourses() {
    const [mycourses, setmycourses] = useState([])
    const [semcourses, setsemcourses] = useState([])
    const[hitsem,sethitsem]=useState(false)
    const [response,setresponse]=useState('')
    const [error,seterror]=useState('')
    const [semester,setsemester]=useState(9)
    const [branch,setbranch]=useState('All')
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    // appwriteService.getPosts([]).then((posts) => {
    //     if (posts) {
    //         setPosts(posts.documents)
    //     }
    // })
    
    useEffect(()=>{
        if(userData.userrole===1){
            console.log("going to hit searchbyowner")
        axios.get('/api/v1/courses/searchbyowner')
      .then(function (response) {
        console.log(response);
        setmycourses(response?.data?.data?.listofcourses)
        setresponse(response?.data?.message)
        seterror('')
      })
      .catch(function (error) {
        console.log(error?.response?.data?.errors[0]);
        seterror(error?.response?.data?.errors[0])
        setresponse('')
      });}
      else{
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
      }
    },[mycourses])

    useEffect(()=>{
      if(userData.userrole===2){
      axios.get(`/api/v1/courses/searchbymycourses?semester=${semester}&branch=${branch}`)
    .then(function (response) {
      sethitsem(true)
      console.log(response);
      console.log("listofcourses",response?.data?.data?.listofcourses)
      setsemcourses(response?.data?.data?.listofcourses)
      setresponse(response?.data?.message)
      seterror('')
    })
    .catch(function (error) {
      console.log(error);
      seterror(error)
      setresponse('')
    });}
    else{
      axios.get(`/api/v1/courses/searchbymycoursesteacher?semester=${semester}&branch=${branch}`)
    .then(function (response) {
      sethitsem(true)
      console.log(response);
      console.log("listofcourses",response?.data?.data?.listofcourses)
      setsemcourses(response?.data?.data?.listofcourses)
      setresponse(response?.data?.message)
      seterror('')
    })
    .catch(function (error) {
      console.log(error);
      seterror(error)
      setresponse('')
    });

    }
  },[semester,branch])
    


    
  
    if (mycourses.length === 0 && authStatus===true) {
        return (
          
                <Container>
          
    
    <span class="flex justify-center items-center  mt-56 text-3xl text-red-600">No Courses joined by you</span>

                </Container>
           
        )
    }
  return (
    <div className='w-full py-8'>
        <Container>
          {/* filters */}

  <label for="semester" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
  <select id="semester" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={semester} onChange={(e)=>{
    setsemester(e.target.value);

  }}>
    <option value="9">All</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>

  </select>


<label for="branch" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Branch</label>
  <select id="branch" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={branch} onChange={(e)=>{
    setbranch(e.target.value);

  }}>
    <option value="All">All</option>
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

        
         {hitsem?(<div className='flex flex-wrap'>
                {semcourses.map((course) => (
                    <div key={course._id} className='p-2 w-1/4'>
                        <CourseCard {...course} />
                    </div>
                ))}
            </div>):(<div className='flex flex-wrap'>
                {mycourses.map((course) => (
                    <div key={course._id} className='p-2 w-1/4'>
                        <CourseCard {...course} />
                    </div>
                ))}
            </div>)}
            </Container>
    </div>
  )
}

export default MyCourses