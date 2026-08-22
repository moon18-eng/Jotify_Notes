import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

function NotePage(){
    const BASE_URL = "http://localhost:5000"
    const nav = useNavigate();
    const [note,setNote] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(null);
    const params = useParams() ;
    const id = params.id;
    const fetchNote = async() => {
     try{ 
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/notes/${id}`);
        setNote(res.data.data);
        console.log(res.data.data)
    } catch (err){
        setError("somthing went wrong");
    }finally{
        setLoading(false);
    }}

    useEffect(()=>{
        fetchNote()},[])


    return (
        <div className='flex-1 flex flex-col '>
            <button 
            className='flex items-start ml-12 mt-8 w-fit border-4 border-black bg-gray-400 rounded-xl py-2 px-6 font-extrabold text-2xl'
            onClick={() => nav('/')}
            >
            ◄  Cancel
            </button>

            <div className='flex flex-row flex-1 gap-10 m-24 mt-14 border-4 border-gray-600 bg-gray-200' >
                
                <div className="flex flex-col flex-1 border-4 border-black bg-blue-200 mx-12 mt-16 min-w-0 max-h-[500px] overflow-y-auto [scrollbar-width:none]">
                    {loading && <p>Loading...</p> }
                    {error && <p>{error}</p>}
                    {!loading && !error &&
                    <>
                    <h1 className="text-5xl font-extrabold px-6 pt-5 mb-5">{note.title}</h1>
                    <p className="text-2xl px-6 pb-5 break-all whitespace-pre-wrap">{note.content}</p>
                    </>
                    
                    }
                </div>

                <div className="flex flex-col items-center justify-center gap-10 w-1/5 mr-20">
                   <button 
                    className=' h-fit border-4 border-black bg-gray-400 rounded-xl py-3 px-28 font-extrabold text-3xl'
                    >
                    EDIT
                    </button> 
                    <button 
                    className=' h-fit border-4 border-black bg-gray-400 rounded-xl py-3 px-24 font-extrabold text-3xl'
                    >
                   📌 PIN 
                    </button> 
                    <button 
                    className=' h-fit border-4 border-red-700 bg-red-300 rounded-xl py-3 px-24 font-extrabold text-3xl text-red-700'
                    >
                    DELETE
                    </button> 
                </div>
                
            </div>
        
        </div>
  )

}

export default NotePage