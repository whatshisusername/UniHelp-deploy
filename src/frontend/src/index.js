import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'



import Home from './pages/Home.js'

import Signup from './pages/Signup.js'
import Login from './pages/Login.js'
import UpdateDetails from './pages/UpdateDetails.js'
import UpdateAvatar from './pages/UpdataAvatar.js'
import AllCourses from './pages/AllCourses.js'
import AddCourse from './pages/AddCourse.js'
import Coursepage from './pages/Coursepage.js'
import TeacherSignup from './components/TeacherSignup.js'
import MyCourses from './pages/MyCourses.js'
import Notification from './pages/Notification.js'

import AddEvent from './pages/AddEvent.js'
import TodayEvents from './pages/TodayEvents.js'
import EventsHome from './pages/EventsHome.js'
import OtherEvents from './pages/OtherEvents.js'
import Eventpage from './pages/Eventpage.js'
import MyEvents from './pages/MyEvents.js'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
    },
        
        {
            path: "/student-signup",
            element: (
                    <Signup />
            ),
        },
        {
          path: "/teacher-signup",
          element: (
                  <TeacherSignup/>
          ),
      },

        {
          path: "/login",
          element: (
                  <Login/>
          ),
      },
      {
        path: "/update-account",
        element: (
                <UpdateDetails/>
        ),
    },
    {
      path: "/update-avatar",
      element: (
              <UpdateAvatar/>
      ),
  },
  {
    path: "/all-courses",
    element: (
        
            <AllCourses />
       
    ),
},
{
  path: "/my-courses",
  element: (
      
          <MyCourses />
     
  ),
},
{
  path: "/add-course",
  element: (
      
          <AddCourse />
     
  ),
},
{
  path: "/course/:courseId",
  element: <Coursepage />,
},

{
  path: "/all-notifications",
  element: (
      
          <Notification />
     
  ),
},
{
  path: "/events",
  element: (
      
          <EventsHome/>
  ),
  },
{
path: "/today-events",
element: (
    
        <TodayEvents/>
),
},

{
  path: "/other-events",
  element: (
      
          <OtherEvents/>
  ),
  },

{
  path: "/add-event",
  element: (
      
          <AddEvent/>
  ),
  },

  {
    path: "/my-events",
    element: (
        
            <MyEvents/>
    ),
    },

  {
    path: "/event/:eventId",
    element: <Eventpage />,
  },
        
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
