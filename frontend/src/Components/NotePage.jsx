import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import notFoundIcon from "../assets/404-error.png";
import API from "../api/axios";
import pinIcon from "../assets/clip.png";



function NotePage(){
    const BASE_URL = "http://localhost:5000"
    const nav = useNavigate();
    const [note,setNote] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(null);
    const params = useParams() ;
    const id = params.id;

    const token = localStorage.getItem("token");
    if (!token) {
      nav("/login",{ replace: true });
    }

    const fetchNote = async() => {
     try{ 
        setLoading(true);
        const res = await API.get(`/notes/${id}`);
        setNote(res.data.data);
        console.log(res.data.data)
    } catch (err){
        setError("Id does not exist!");
    }finally{
        setLoading(false);
    }}

    useEffect(()=>{
        fetchNote()},[]
    )

    const deleteNote = async() => {
        try{
            await API.delete(`/notes/${id}`)
            nav("/")

        }catch (err){
            setError("somthing went wrong");
        }
    }

    const handelPin = async() => {
        try{
            const res = await API.patch(`/notes/${id}/pin`, {is_pinned : !note.is_pinned})
            setNote(res.data.data)
            console.log("success!")
        }catch(error){
            setError("Somthing went wrong")
        }}

    return (
        <div className='flex-1 flex flex-col px-8'>
            <button 
            className='flex items-start ml-12 mt-8 w-fit  text-white bg-gray-600 rounded-lg py-3 px-6 font-extrabold text-2xl'
            onClick={() => nav('/')}
            >
            ◄  Cancel
            </button>
            {error && 
                <div className="mb-20 flex flex-col h-full items-center justify-center "> 
                <img src={notFoundIcon} className="w-80"/> 
                <p className="text-3xl font-extrabold">{error}</p>
                </div>
            }

            {!error && <div className='flex flex-row flex-1 gap-10 m-24 mt-14  bg-gray-700 rounded-2xl' >
                
                <div 
                className="flex flex-col flex-1 rounded-2xl mx-12 mt-16 min-w-0 max-h-[500px] overflow-y-auto [scrollbar-width:none]"
                style={{background:note.bg_color}}
                >
                    {loading && (
                    <div className="flex flex-col gap-6 px-6 pt-9 animate-pulse">
                        <div className="h-12 bg-gray-600 rounded-xl w-2/3 mb-2" />       
                        <div className="flex flex-col gap-5">
                            <div className="h-8 bg-gray-600 rounded-xl w-full" />
                            <div className="h-8 bg-gray-600 rounded-xl w-fufull" />
                            <div className="h-8 bg-gray-600 rounded-xl w-full" />
                            <div className="h-8 bg-gray-600 rounded-xl w-full" />
                            <div className="h-8 bg-gray-600 rounded-xl w-1/2" />
                        </div>
                    </div>
                    )}

                    {!loading && !error &&
                    <>
                    <div className="flex items-center justify-between">
                        <h1 
                        className="text-5xl font-extrabold px-6 pt-5 mb-5"
                        style={{color:note.text_color}}
                        >
                            {note.title}
                        </h1>
                        {(note.is_pinned) && 
                        <div className=" flex items-center justify-center w-14 h-12 bg-gray-700/60 rounded-lg mr-6">
                            <img 
                            src={pinIcon}
                            className="w-10 h-10 ml-1" 
                            />
                        </div>
                        }
                        
                    </div>  
                    <p 
                    className="text-2xl px-6 pb-5 break-all whitespace-pre-wrap"
                    style={{color:note.text_color}}
                    >
                        {note.content}
                    </p>
                    </> 
                    }
                </div>

                <div className="flex flex-col items-center justify-center gap-10 w-1/5 mr-20">
                   <button 
                    className=' h-fit text-white bg-gray-900 rounded-2xl py-4 px-28 font-extrabold text-4xl'
                    onClick={() => nav(`/noteForm/${id}`)}
                    >
                    EDIT
                    </button> 
                    <button 
                    className=' h-fit  text-white bg-gray-900 rounded-2xl py-4 px-24 font-extrabold text-4xl'
                    onClick={() => handelPin()}
                   >
                    { (!note.is_pinned) && <p>📌 PIN</p>} 
                    {(note.is_pinned)&& <p> UNPIN</p>}
                    </button> 
                    <button 
                    className=' h-fit border-4 border-red-700 bg-red-300 rounded-2xl py-4 px-24 font-extrabold text-4xl text-red-700'
                    onClick={() => deleteNote()}
                    >
                    DELETE
                    </button> 
                </div>
                
            </div>}
        
        </div>
  )

}

export default NotePage