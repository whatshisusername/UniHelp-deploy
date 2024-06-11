import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// take project input form
function AddEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setvenue] = useState();
  const [time, settime] = useState();
  const [images, setImages] = useState([]);
  const [date,setdate]=useState();
  const [instagram,setinstagram]=useState('')
  const [twitter,settwitter]=useState('')
  const [linkedin,setlinkedin]=useState('')
  const[gform,setgform]=useState('')
  const[response,setresponse]=useState('')
  const[error,seterror]=useState('')

  const[event,setevent]=useState('')
  const navigate = useNavigate();

  const createevent= async(e)=>{
    e.preventDefault(); // Prevent default form submission

    // Create FormData object to send form data including files
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('venue', venue);
    formData.append('twitter', twitter);
    formData.append('instagram',instagram);
    formData.append('linkedin', linkedin);
    formData.append('gform', gform);

  

    // Append selected files to FormData
    const thumbnailFile = document.getElementById('thumbnail').files[0];
    formData.append('thumbnail', thumbnailFile);

    console.log(formData)
    // Perform your axios POST request with FormData
    await axios.post('/api/v1/events/create-event', formData)
      .then(function (response) {
        console.log(response);
        seterror('');
        setresponse(response?.data?.message)
        setevent(response?.data?.data?.event)
        
      })
      .catch(function (error) {
        // console.log(error.response.data.errors[0]);
        console.log("error=",error);

   if(error?.response?.data?.errors[0]){
            seterror(error?.response?.data?.errors[0])}
        setresponse('')
      });
  }

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files).map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      preview: ['jpg', 'jpeg', 'png', 'gif'].includes(file.name.split('.').pop().toLowerCase()),
      size: file.size > 1024 ? file.size > 1048576 ? Math.round(file.size / 1048576) + 'mb' : Math.round(file.size / 1024) + 'kb' : file.size + 'b'
    }));
    setImages(selectedImages);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleSuccessClose = () => {
    if (response ==="event created successfully")
    {
        navigate(`/event/${event._id}`)
    }
    setresponse('')
  };
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generatedescription() {
    setGeneratingAnswer(true);
    setDescription("Loading your description \n It might take upto 10 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`
         ,
        method: "post",
        data: {
          contents: [{ parts: [{ text: `write description for event ${title} in 4 lines only just description no other details` }] }],
        },
      });

      setDescription(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setDescription("Sorry - Something went wrong. Please try again or Add your own description!");
    }

    setGeneratingAnswer(false);
  }


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
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    
    <div className="bg-white shadow p-4 py-8">
   
      <div className="heading text-center  text-2xl m-5 text-gray-800 bg-white">New Event</div>
      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
      <label >Title</label>
        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button onClick={generatedescription}>Generate Description from AI</button> */}
        <button onClick={generatedescription} 
	class="group relative overflow-hidden bg-green-600 focus:ring-4 focus:ring-green-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center">
	<span class="z-40">Generate Description from AI</span>
	<svg class="z-40 ml-2 -mr-1 w-3 h-3 transition-all duration-300 group-hover:translate-x-1" fill="currentColor"
		viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
		<path fill-rule="evenodd"
			d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
			clip-rule="evenodd"></path>
	</svg>
	<div
		class="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000">
	</div>
</button>
        <label >Description</label>
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Describe everything about this project here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label >Date</label>
        <input  className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" type='date' id="date" value={date} onChange={(e)=>setdate(e.target.value)}></input>
        

        <label for="timeInput">Time</label>
<input type="time" className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" id="timeInput" name="timeInput" value={time} onChange={(e)=>settime(e.target.value)}></input>

             <label for="timeInput">Instagram Post(optional)</label>
<input type="text" className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" placeholder='paste instagram post link of event' id="timeInput" name="timeInput" value={instagram} onChange={(e)=>setinstagram(e.target.value)}></input>

<label for="timeInput">Twitter Post(optional)</label>
<input type="text" className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" placeholder='paste twitter post link of event' id="timeInput" name="timeInput" value={twitter} onChange={(e)=>settwitter(e.target.value)}></input>

<label for="timeInput">LinkedIn Post(optional)</label>
<input type="text" className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" placeholder='paste linkedIn post link of event' id="timeInput" name="timeInput" value={linkedin} onChange={(e)=>setlinkedin(e.target.value)}></input>
        
<label for="timeInput">Google Form (optional)</label>
<input type="text" className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" placeholder='paste google form link of event' id="timeInput" name="timeInput" value={gform} onChange={(e)=>setgform(e.target.value)}></input>
           
       
        <label >Venue</label>
        <textarea  
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="add venue"
          value={venue}
          onChange={(e) => setvenue(e.target.value)}
        ></textarea>



        <div className="icons flex text-gray-500 m-2">
          <label>
            <input
              hidden
              type="file"
              multiple
              onChange={handleImageChange}
              id="thumbnail"
            />
            <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 360 360"
      style={{ enableBackground: 'new 0 0 360 360', width: '40px', height: '40px' }}
      xmlSpace="preserve"
      className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
    >
      <g>
        <rect y="54.551" style={{ fill: '#C3C6C8' }} width="360" height="250.898" />
        <rect x="23.816" y="78.365" style={{ fill: '#0071CE' }} width="312.369" height="203.268" />
        <polygon style={{ fill: '#00BD5E' }} points="23.816,281.633 125.601,179.852 168.39,222.639 259.508,131.521 336.201,208.215 
        336.201,281.633 " />
        <circle style={{ fill: '#FFFFFF' }} cx="96.047" cy="134.932" r="31.861" />
      </g>
    </svg>
          </label>
          <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
        </div>

        <div id="preview" className="my-4 flex">
          {images.map((image, index) => (
            <div className="relative w-32 h-32 object-cover rounded" key={index}>
              {image.preview ? (
                <img src={image.url} alt={image.name} className="w-32 h-32 object-cover rounded" />
              ) : (
                <svg className="fill-current  w-32 h-32 ml-auto pt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                </svg>
              )}
              <button
                onClick={() => removeImage(index)}
                className="w-6 h-6 absolute text-center flex items-center top-0 right-0 m-2 text-white text-lg bg-red-500 hover:text-red-700 hover:bg-gray-100 rounded-full p-1"
              >
                <span className="mx-auto">×</span>
              </button>
              <div className="text-xs text-center p-2">{image.size}</div>
            </div>
          ))}
        </div>
        <br/>
       

        <div className="buttons flex justify-end">
          <button type='button'
            className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
            onClick={createevent}
          >
            Post
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default AddEvent;