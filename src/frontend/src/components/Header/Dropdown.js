import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        id="dropdownNavbarLink"
        onClick={toggleMenu}
        className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto"
      >
        Events
        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow">
          <ul className="py-1">
          <li>
              <button type='button' onClick={() => navigate('/my-events')} className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">My Events</button>
            </li>
          <li>
              <button type='button' onClick={() => navigate('/events')} className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">All Events</button>
            </li>
            <li>
              <button type='button' onClick={() => navigate('/today-events')}  className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Today</button>
            </li>
            <li>
              <button type='button' onClick={() => navigate('/other-events')} className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Other Events</button>
            </li>
            <li>
              <button type='button' onClick={() => navigate('/add-event')} className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Add Event</button>
            </li>
          </ul>
        
        </div>
      )}
    </div>
  );
};

export default Dropdown;
