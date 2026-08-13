import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function FormPage() {
  const [formData, setFormData] = useState({title:"", content:"", bg_color:"#ffffff", text_color:"#000000"})
  const BASE_URL = "http://localhost:5000"

  const handelForm = async(e)=>{
    e.preventDefault();
    console.log("Sending Payload:", formData);
    try {
      await axios.post(`${BASE_URL}/notes`,formData)
      setFormData({title:"", content:"", bg_color:"#ffffff", text_color:"#000000"})
    } catch (error) {
      console.error(JSON.stringify(error.response?.data || error.message || error, null, 2));
    }
  }

  return (
    <div className='flex-1 flex flex-col  '>
      <button className='flex items-start ml-12 my-5 w-fit border-2 border-black bg-gray-400 rounded-md py-2 px-6 font-extrabold text-xl'>
       Cancel
      </button>

      <form className='flex flex-row flex-1 gap-8' onSubmit={handelForm}>
        <div className=' flex flex-col w-2/3 mb-12 ml-12 border-2 border-black bg-gray-200 rounded-md py-2 px-6 '>
          <input className='h-20 border-2 border-gray-700 bg-transparent focus:outline-none border-none placeholder:text-gray-700 text-5xl font-extrabold px-5 pt-5 mb-8' placeholder='Title...' type='text' value={formData.title} onChange={(e) => setFormData({...formData,title:e.target.value})}/>
          <textarea className='flex-1 border-2 border-gray-700 bg-transparent focus:outline-none border-none placeholder:text-gray-500 text-2xl placeholder:zfont-extrabold px-5 pb-5' placeholder='Enter a text...' type='text' value={formData.content} onChange={(e) => setFormData({...formData,content:e.target.value})}/>
        </div>
        <div className=' flex flex-col gap-8 items-start justify-center w-1/3 mb-12 mr-12 border-2 border-black bg-gray-400 rounded-md py-2 px-6 '>
          <input className='h-16 w-20 p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-moz-color-swatch]:border-none border-2 border-white' type='color' value={formData.bg_color} onChange={(e) => setFormData({...formData,bg_color:e.target.value})}/>
          <input className='h-16 w-20  p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-moz-color-swatch]:border-none border-2 border-white' type='color' value={formData.text_color} onChange={(e) => setFormData({...formData,text_color:e.target.value})}/>
          <button type='submit' className='border-4 border-yellow-600 bg-yellow-200 text-yellow-600 font-extrabold'>Confirm</button>
        </div>
      </form>
    
    </div>
  )
}

export default FormPage