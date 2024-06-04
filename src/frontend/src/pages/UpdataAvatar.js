import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login } from '../store/authSlice.js';
import { useNavigate } from 'react-router-dom';

function UpdateAvatar() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const [response, setResponse] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (e) => {
    const formData = new FormData();
    if(e.target.files[0]){
    const avatarFile = e.target.files[0];
    formData.append('avatar', avatarFile);

    setUploading(true);
    setProgress(0);

    await axios
      .patch('/api/v1/users/avatar', formData, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);
          setProgress(percentCompleted);
        },
      })
      .then(function (response) {
        setResponse(response?.data?.message);
        dispatch(login(response?.data?.data?.user));
        setError('');
      })
      .catch(function (error) {
        setError(error?.response?.data?.errors[0]);
        setResponse('');
      })
      .finally(() => {
        setUploading(false);
      });}
  };

  return authStatus ? (
    <form className='flex justify-center items-center mt-12'>
      <div className='relative'>
        <div className='flex items-center justify-center'>
          <div className='relative'>
            <img className='rounded-full w-96 h-96' src={userData.avatar} alt='Avatar' />
            {uploading && (
              <svg className='absolute inset-0' width='100%' height='100%' viewBox='0 0 100 100'>
                <circle
                  className='stroke-current text-blue-500'
                  strokeWidth='8'
                  fill='transparent'
                  r='40'
                  cx='50'
                  cy='50'
                  style={{
                    strokeDasharray: '251.2',
                    strokeDashoffset: `${251.2 * (1 - progress / 100)}`,
                    transformOrigin: 'center',
                    transform: 'rotate(-90deg)',
                  }}
                />
              </svg>
            )}
          </div>
        </div>
        <label
          className='absolute bottom-0 right-0 cursor-pointer'
          htmlFor='avatar'
          style={{ transform: 'translate(50%, 50%)' }}
        >
          <svg
            className='w-12 h-12 text-black bg-white rounded-full p-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
        </label>
        <input
          id='avatar'
          type='file'
          onChange={(e) => uploadImage(e)}
          className='hidden'
          name='avatar'
          accept='image/png, image/jpeg'
          required
        />
      </div>
    </form>
  ) : (
    <></>
  );
}

export default UpdateAvatar;




