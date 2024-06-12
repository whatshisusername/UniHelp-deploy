import React from 'react'
import {Container} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import UserIcon from '../UserIcon'
import NotificationIcon from '../NotificationIcon'
import Dropdown from './Dropdown'
function Header() {
  // from the store let me know it the user is logged in or not or any user present or not
  // in authslice state have status attribute which tells user present or not
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)

  
  const navigate = useNavigate()

  // below are navitems that will be present and displayed in header according to user status
  // home will always be displayed in header,login and signup will displayed iff user.status is false ie not logged in
// all post and add post will be displayed in header iff userstatus is active
// for user we have status and for navitems we have active which will tell to display that item or not if active display else not
  // slug is the url
const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
      currentactive:('/'===window.location.pathname)
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      currentactive:("/login"===window.location.pathname)
  },
  {
      name: "Signup",
      slug: "/student-signup",
      active: !authStatus,
      currentactive:("/student-signup"===window.location.pathname)
  },
  {
    name: "Teacher Signup",
    slug: "/teacher-signup",
    active: !authStatus,
    currentactive:("/teacher-signup"===window.location.pathname)
},

  {
      name: "Courses",
      slug: "/all-courses",
      active: authStatus,
      currentactive:("/all-courses"===window.location.pathname)
  },
  {
    name: "Add Course",
    slug: "/add-course",
    active: (authStatus && userData?.userrole==1),
    currentactive:("/add-course"===window.location.pathname)
},
{
  name: "My Courses",
  slug: "/my-courses",
  active: authStatus,
  currentactive:("/my-courses"===window.location.pathname)
},

  ]

  const url = window.location.href;
  const pathname = window.location.pathname;
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  console.log("url",url)
  console.log("pathname",pathname)
  console.log("protocol",protocol)
  console.log("hostname",hostname)
 

  return (
    <header className='py-3 shadow bg-gray-300 h-20'>
      <Container>
        <nav className='flex'>
         
          <ul className='flex ml-auto'>
            
          

            {/*going loop on navitems and display that item only which are active  */}
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className={`inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full ${ item.currentactive? 'bg-red-300' : ''}`}
                
                >{item.name}
                </button>
              </li>
            ) : null
            )}
            
            {authStatus && (
              <li className='mt-2'>
                
                <Dropdown/>
              </li>
            )}

{authStatus && (
              <li className='mt-0'>
                
                <NotificationIcon/>
              </li>
            )}
             {/* if user status is active show this logout button */}
             {
              userData && 
             <UserIcon/>
                
                }
                  {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            
            
            
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header