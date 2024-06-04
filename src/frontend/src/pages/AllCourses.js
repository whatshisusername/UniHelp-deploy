import React, {useState, useEffect} from 'react'
import { Container, CourseCard } from '../components'
import { useSelector } from "react-redux";
import axios from 'axios'

function AllCourses() {
    const [courses, setcourses] = useState([])
    const [semcourses, setsemcourses] = useState([])
    const[hitsem,sethitsem]=useState(false)
    const [response,setresponse]=useState('')
    const [error,seterror]=useState('')
    const [semester,setsemester]=useState(9)
    const [branch,setbranch]=useState('All')
    const [search,setsearch]=useState('')
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    // appwriteService.getPosts([]).then((posts) => {
    //     if (posts) {
    //         setPosts(posts.documents)
    //     }
    // })
    
    
    useEffect(()=>{
    
        axios.get('/api/v1/courses/allcourses')
      .then(function (response) {
        console.log(response);
        setcourses(response?.data?.data?.listofcourses)
        setresponse(response?.data?.message)
        seterror('')
      })
      .catch(function (error) {
        console.log(error?.response?.data?.errors[0]);
        seterror(error?.response?.data?.errors[0])
        setresponse('')
      });

   

    },[courses])


    useEffect(()=>{
      axios.get(`/api/v1/courses/searchbysemester?semester=${semester}&branch=${branch}`)
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
  },[semester,branch])

  useEffect(()=>{
    axios.get(`/api/v1/courses/searchbytitle?title=${search}`)
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
},[search])


//   useEffect(()=>{
//     axios.get(`/api/v1/courses/searchbybranch/${branch}`)
//   .then(function (response) {
//     sethitsem(true)
//     console.log(response);
//     setsemcourses(response?.data?.data?.listofcourses)
//     setresponse(response?.data?.message)
//     seterror('')
//   })
//   .catch(function (error) {
//     console.log(error);
//     seterror(error)
//     setresponse('')
//   });
// },[branch])


    
 
    if (courses.length === 0 && authStatus===true) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                <div role="status" className="grid h-screen place-items-center">
    <svg aria-hidden="true" class="w-22 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
                </Container>
            </div>
        )
    }
  return (
    <div className='w-full py-8'>
        <Container>
          {/* filters */}

          <div className="pt-2 relative mx-auto text-gray-600">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          value={search}
          onChange={(e)=>{setsearch(e.target.value)}}
          placeholder="Search"
        />
        
      </div>

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
                {
                semcourses.map((course) => (
                    <div key={course._id} className='p-2 w-1/4'>
                        <CourseCard {...course} />
                    </div>
                ))}
            </div>):(<div className='flex flex-wrap'>
                {courses.map((course) => (
                    <div key={course._id} className='p-2 w-1/4'>
                        <CourseCard {...course} />
                    </div>
                ))}
            </div>)}
            </Container>
    </div>
  )
}

export default AllCourses