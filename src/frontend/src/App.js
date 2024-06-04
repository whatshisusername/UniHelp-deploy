import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import {login, logout} from "./store/authSlice"
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { Header } from './components'
function App() {
  // creating a loading variable to show loading page
  const [loading, setLoading] = useState(true)
  const[response,setresponse]=useState('')
  const[error,seterror]=useState('')
  // to pass values to reducers
  const dispatch = useDispatch()

  // using getcurrentuser function from appwrite/auth.js class,authService is object that was exported
  // in finally as everything in useeffect is executed ,inside finally is also executed everytime
  useEffect(() => {(async()=>{
      await axios.get('/api/v1/users/current-user').then(function(response) {
        console.log(response);
        setresponse(response.data.data)
        dispatch(login(response.data.data))
        seterror('')
      })
      .catch(function (error) {
        // console.log(error.response.data.errors[0]);
        seterror(error?.response?.data)
        setresponse('')
        dispatch(logout())
      })
    })().finally(() => setLoading(false))
  }, [])
  
  // 
  return !loading ? (
    <div className='max-h-screen flex flex-wrap content-between bg-white grid h-screen place-items-center'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>

      </div>
    </div>
  ) : (<>
  {/* display loading spinner */}
    <div role="status" className="grid h-screen place-items-center">
    <svg aria-hidden="true" class="w-22 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
  </>)
}

export default App




























// import logo from './logo.svg';
// import './App.css';
// import axios from 'axios'
// import {useState} from 'react'
// function App() {
//   // creating user connecting front end and backend
//   const [username,setusername]=useState('')
//   const [email,setemail]=useState('')
//   const [fullname,setfullname]=useState('')
//   const [password,setpassword]=useState('')
//   const[response,setresponse]=useState('')
//   const register= async(e)=>{
//     e.preventDefault(); // Prevent default form submission

//     // Create FormData object to send form data including files
//     const formData = new FormData();
//     formData.append('username', username);
//     formData.append('email', email);
//     formData.append('fullname', fullname);
//     formData.append('password', password);

//     // Append selected files to FormData
//     const avatarFile = document.getElementById('avatar').files[0];
//     const coverImageFile = document.getElementById('coverimage').files[0];
//     formData.append('avatar', avatarFile);
//     formData.append('coverImage', coverImageFile);

//     // Perform your axios POST request with FormData
//     await axios.post('/api/v1/users/register', formData)
//       .then(function (response) {
//         setresponse(String(response.data.message))
//         console.log(response)
//         console.log(response.data.data);
//         console.log(response.data.message);
        
//       })
//       .catch(function (error) {
//         console.log(error);
//         setresponse(String(error.response.data))
//       });
//   }
 
//   return (
//     <>
//     <form onSubmit={register}>
//     <label >username</label>
//     <input type='text' placeholder='username' value={username} onChange={(e)=>{setusername(e.target.value)}}></input>


//     <label >email</label>
//     <input type='email' placeholder='email' value={email} onChange={(e)=>{setemail(e.target.value)}}></input>

//     <label >fullname</label>
//     <input type='text' placeholder='fullname' value={fullname} onChange={(e)=>{setfullname(e.target.value)}}></input>

//     <label >password</label>
//     <input type='password' placeholder='password' value={password} onChange={(e)=>{setpassword(e.target.value)}}></input>
    
//     <label htmlFor="avatar">avatar:</label>

// <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
// <br/>

// <label htmlFor="coverimage">coverimage:</label>

// <input type="file" id="coverimage" name="coverimage" accept="image/png, image/jpeg" />

//     <input type="submit" value="Submit"/>
    
    
//     </form>

//     <div dangerouslySetInnerHTML={{ __html: response }}  style={{color:"red"}}/>

//     </>
//   );
// }

// export default App;
