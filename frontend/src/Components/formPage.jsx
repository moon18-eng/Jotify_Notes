import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'
import ColorSelector from '../store/colorSelector'
import { useNavigat, useParams  } from 'react-router-dom'
import {fetchNote } from './NotePage'

function FormPage() {
  const [formData, setFormData] = useState({title:"", content:"", bg_color:"#ffffff", text_color:"#000000"})
  const BASE_URL = "http://localhost:5000"
  const nav = useNavigate();
  const params = useParams();
  const cu = params.id; 

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

  useEffect(
  () => {fetchNote()}
  ,[])


  return (
    <div className='flex-1 flex flex-col  '>
      <button 
      className='flex items-start ml-12 mt-8 w-fit border-4 border-black bg-gray-400 rounded-xl py-2 px-6 font-extrabold text-2xl'
      onClick={() => nav('/')}
      >
       ◄  Cancel
      </button>

      {<form className='flex flex-row flex-1 gap-10 m-10 mt-14' onSubmit={handelForm}>
        <div 
        className='flex flex-col w-3/4 mb-12 ml-12 border-4 border-gray-600 rounded-md py-2 px-6 '
        style={{background: formData.bg_color}}
        >
          <input
          className=' h-28 border-2 border-gray-700 bg-transparent focus:outline-none border-none placeholder:[color:var(--text-color)] text-7xl font-extrabold px-5 pt-5' 
          placeholder='Title...' 
          type='text' 
          maxLength={24}
          value={formData.title} 
          onChange={(e) => setFormData({...formData,title:e.target.value})}
          style={{
            color: formData.text_color,
            '--text-color': formData.text_color }}
          />
          <textarea 
          className='flex-1 border-2 border-gray-700 bg-transparent focus:outline-none border-none placeholder:[color:var(--text-color)] text-3xl placeholder:zfont-extrabold px-5 pb-5' 
          placeholder='Enter a text...' 
          type='text' 
          value={formData.content} onChange={(e) => setFormData({...formData,content:e.target.value})}
          style={{
            color:formData.text_color,
            '--text-color':formData.text_color
          }}
          />
        </div>
        <div className=' flex flex-col gap-8 items-center justify-center w-1/4 mb-12 mr-12 border-4 border-gray-600 bg-gray-400 rounded-md py-2 px-6 '>
          <ColorSelector 
            label="Bg color"
            selectedColor = {formData.bg_color}
            onSelect= {(color) => setFormData({... formData,bg_color: color})}
          />
          <ColorSelector 
            label="Text color"
            selectedColor = {formData.text_color}
            onSelect= {(color) => setFormData({... formData,text_color: color})}
          />
          <button 
          type='submit' 
          onClick={() => nav('/')}
          className='border-4 border-yellow-600 bg-yellow-200 text-yellow-600 font-extrabold text-2xl rounded-xl px-32 py-3 mt-12'
          >Confirm</button>
        </div>
      </form>}
    
    </div>
  )
}

export default FormPage