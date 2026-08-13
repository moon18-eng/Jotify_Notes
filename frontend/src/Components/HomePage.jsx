import{useEffect, useState } from "react";
import axios from "axios";

function HomePage(){

    const BASE_URL = "http://localhost:5000"
    const [notes,setNotes] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    
    const fetchNotes = async() => {
        try {
            setLoading(true);
            const respond = await axios.get(`${BASE_URL}/notes`);
            setNotes(respond.data.data);
            setError(null);
        } catch (err) {
            setError("something went wrong");
        } finally{
            setLoading(false);
        }
   };

   useEffect(() => {
    fetchNotes();
   },[]);

    return(
        <div className="flex-1 min-h-0 flex flex-col gap-6 px-12 mt-8">
            <div className="flex flex-row justify-between items-center">
                <button 
                    className="w-fit border-2 border-black bg-gray-400 rounded-md py-2 px-6 font-extrabold text-xl"
                    // onClick={change to /FormPage}
                    >
                    CREATE +
                </button>

                <button 
                    className="w-fit border-2 border-black bg-gray-300 rounded-md py-2 px-6 font-extrabold text-xl"
                    onClick={fetchNotes}>
                    🗘
                </button>
            </div>

             <div className="flex-1  overflow-y-auto mb-6 p-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 content-start [scrollbar-width:none] ">
                {loading && <p className="text-3xl" >loading...</p>}
                {error && <p className="text-3xl text-red-700">{error}</p>}
                {!error && !loading && notes.length == 0 && <p>No notes yet ...</p>}
                {!error && !loading && 
                notes.map((note) => 
                    <div style={{ 
                            backgroundColor: note.bg_color || '#ffffff', 
                            color: note.text_color || '#000000',
                            fontSize: '16px' 
                            }}
                         className="flex flex-col border-2 border-gray-800  h-64 rounded-xl ">
                         <h1 className="ml-2 mt-2 text-2xl font-bold">{note.title}</h1>
                         <p className="m-2 text-gray-700 line-clamp-[8] break-words">{note.content}</p>
                    </div>
                )}
             </div>
        </div>
    )

}

export default HomePage