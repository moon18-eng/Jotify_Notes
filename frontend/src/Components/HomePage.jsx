import{useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import pinIcon from "../assets/clip.png";
import notFoundIcon from "../assets/404-error.png";
import API from "../api/axios";


function HomePage(){

    const BASE_URL = "http://localhost:5000"
    const [notes,setNotes] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const nav = useNavigate();
    
    const token = localStorage.getItem("token");
    if (!token) {
        nav("/login",{ replace: true });
    }

    const fetchNotes = async() => {
        try {
            setLoading(true);
            const respond = await API.get("/notes");
            setNotes(respond.data.data);

        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
            nav("/login"); 
            } else {
            setError("Something went wrong...");
            }
        } finally{
            setLoading(false);
        }
   };

   useEffect(() => {
    fetchNotes();
   },[]);

    return(
        
        <div className="flex-1 min-h-0 flex flex-col gap-6 px-20 mt-8">
            <div className="flex flex-row justify-between items-center">
                <button 
                    className="w-fit text-white bg-gray-600 rounded-xl py-3 px-7 font-extrabold text-2xl"
                    onClick={() => nav('/noteForm/0')}
                    >
                    CREATE +
                </button>

            </div>

            {!loading && !error && (notes.length == 0) && 
                <div className="flex flex-col h-full items-center justify-center "> 
                <img src={notFoundIcon} className="w-80"/> 
                <p className="text-3xl font-extrabold">There is no notes!</p>
                </div>
            }

            {error && !loading &&  
                <div className="flex flex-col h-full items-center justify-center "> 
                <img src={notFoundIcon} className="w-80"/> 
                <p className="text-3xl font-extrabold">{error}</p>
                </div>
            }



            <div className="flex-1  overflow-y-auto mb-6 p-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 content-start [scrollbar-width:none] ">
                {loading && 
                <>
                    <div 
                    className="flex flex-col border-2 border-slate-300  h-64 rounded-xl p-3 cursor-pointer bg-slate-300 animate-pulse"
                    />  
                     <div 
                    className="flex flex-col border-2 border-slate-300  h-64 rounded-xl p-3 cursor-pointer bg-slate-300 animate-pulse"
                    />  
                     <div 
                    className="flex flex-col border-2 border-slate-300  h-64 rounded-xl p-3 cursor-pointer bg-slate-300 animate-pulse"
                    />  
                     <div 
                    className="flex flex-col border-2 border-slate-300  h-64 rounded-xl p-3 cursor-pointer bg-slate-300 animate-pulse"
                    />  
                     <div 
                    className="flex flex-col border-2 border-slate-300  h-64 rounded-xl p-3 cursor-pointer bg-slate-300 animate-pulse"
                    />  
                     <div 
                    className="flex flex-col border-2 border-slate-300  h-64 rounded-xl p-3 cursor-pointer bg-slate-300 animate-pulse"
                    />  
                     <div 
                    className="flex flex-col border-2 border-slate-300  h-64 rounded-xl p-3 cursor-pointer bg-slate-300 animate-pulse"
                    />  
                     <div 
                    className="flex flex-col border-2 border-slate-300  h-64 rounded-xl p-3 cursor-pointer bg-slate-300 animate-pulse"
                    />  
                     <div 
                    className="flex flex-col border-2 border-slate-300  h-64 rounded-xl p-3 cursor-pointer bg-slate-300 animate-pulse"
                    />  
                </>
                    
                }
               
                {!error && !loading && 
                notes.map((note) => 
                    <div 
                    key={note.id}
                    style={{ 
                     backgroundColor: note.bg_color || '#ffffff', 
                     color: note.text_color || '#000000',
                     fontSize: '18px' 
                    }}
                    className="flex flex-col border-2 border-gray-800  h-64 rounded-xl p-3 cursor-pointer"
                    onClick={() => nav(`/note/${note.id}`)}
                    >
                     <div className="flex flex-row justify-between">
                        <h1 className="ml-2 mt-2 text-3xl font-bold">{note.title}</h1>
                        {(note.is_pinned) && 
                        <img 
                        src={pinIcon} 
                        className="w-10 h-10 bg-zinc-700/70 rounded-lg "             
                        />
                        }
                     </div>
                        <p className="m-2 line-clamp-[8] break-all whitespace-pre-wrap ">{note.content}</p>
                    </div>
                )}
             </div>
        </div>
    )

}

export default HomePage