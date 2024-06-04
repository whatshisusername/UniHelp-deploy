import React, { useState } from 'react';

const Eventdropdown = (sendeventid) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isdelete,setisdelete] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }; 

  console.log(sendeventid)
  const closeDropdown = () => {
    setIsOpen(false);
  };

  console.log(isdelete)

  return (
    <div className="relative inline-block" onBlur={closeDropdown} tabIndex="0">
      {/* Dropdown toggle button */}
      <button
        onClick={toggleDropdown}
        className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
          onClick={closeDropdown}
        >
          <button
            type='button'
            onClick={()=>{setisdelete(true);}}
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Delete post
        </button>
        
        </div>
      )}
     
    </div>
  );
};

export default Eventdropdown;
