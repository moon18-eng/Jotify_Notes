import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'
import ColorSelector from '../store/colorSelector'
import { useNavigate  , useParams  } from 'react-router-dom'
import notFoundIcon from "../assets/404-error.png";
import API from "../api/axios";

function FormPage() {
  const [formData, setFormData] = useState({title:"", content:"", bg_color:"#d1d5db", text_color:"#000000"})
  const BASE_URL = "http://localhost:5000"
  const nav = useNavigate();
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(null);
  const params = useParams();
  const id = params.id; 

  const token = localStorage.getItem("token");
  if (!token) {
    nav("/login",{ replace: true });
  }

  const handelForm = async(e)=>{
    e.preventDefault();
    console.log("Sending Payload:", formData);
    try {
      if(id == "0"){ 
        await API.post("/notes",formData)
      }else{
        await API.put(`/notes/${id}`,formData) 
      }
      setFormData({title:"", content:"", bg_color:"#d1d5db", text_color:"#000000"})
      nav('/')
    } catch (error) {
      console.log(error);
    }
  }

  const fetchNote = async() => {
     if(id == "0") return;

     try{ 
        setLoading(true);
        const res = await API.get(`/notes/${id}`);
        setFormData(res.data.data);     
        
    } catch (err){
        setError("Id does not exist!");
    }finally{
        setLoading(false);
    }}



  useEffect(
  () => {fetchNote()}
  ,[])

  
  


  return (
  <div className='flex-1 flex flex-col items-center w-full'>
    {/* Centered Top Bar with Cancel Button matching form width */}
    <div className='w-full max-w-[95%] flex justify-start pl-12 mt-8'>
      <button 
        className='text-white bg-gray-600 rounded-xl py-3 px-7 font-extrabold text-2xl'
        onClick={() => nav('/')}
      >
        ◄ Cancel
      </button>
    </div>

    {error && (
      <div className="mb-20 flex flex-col h-full items-center justify-center"> 
        <img src={notFoundIcon} className="w-80" alt="Not Found" /> 
        <p className="text-3xl font-extrabold">{error}</p>
      </div>
    )}
    
    {!error && (
      <form className='flex flex-row flex-1 justify-center items-stretch w-full my-6 border border-white' onSubmit={handelForm}>
        <div 
          className='flex flex-col w-2/3 mb-12 ml-12 rounded-md py-2 px-6 rounded-2xl'
          style={{ background: formData.bg_color }}
        >
          <input
            className='h-28 border-2 border-gray-700 bg-transparent focus:outline-none border-none placeholder:[color:var(--text-color)] text-7xl font-extrabold px-5 pt-5 mb-5' 
            placeholder='Title...' 
            type='text' 
            maxLength={20}
            value={formData.title} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={{
              color: formData.text_color,
              '--text-color': formData.text_color
            }}
          />
          <textarea 
            className='flex-1 border-2 border-gray-700 bg-transparent focus:outline-none border-none placeholder:[color:var(--text-color)] text-3xl placeholder:font-extrabold px-5 pb-5' 
            placeholder='Enter a text...' 
            type='text' 
            value={formData.content} 
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            style={{
              color: formData.text_color,
              '--text-color': formData.text_color
            }}
          /> 
        </div>

        <div className='flex flex-col gap-8 items-center justify-center w-1/5 mb-12 ml-10 mr-12 bg-gray-700 rounded-2xl py-2 px-6'>
          <ColorSelector 
            label="Bg color"
            selectedColor={formData.bg_color}
            onSelect={(color) => setFormData({ ...formData, bg_color: color })}
          />
          <ColorSelector 
            label="Text color"
            selectedColor={formData.text_color}
            onSelect={(color) => setFormData({ ...formData, text_color: color })}
          />
          <button 
            type='submit' 
            className='border-4 border-yellow-600 bg-yellow-200 text-yellow-600 font-extrabold text-2xl rounded-xl px-20 py-3 mt-12'
          >
            Confirm
          </button>
        </div>
      </form>
    )}
  </div>
)
}

export default FormPage