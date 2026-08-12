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
        <div className="flex-1 min-h-0 flex flex-col gap-6 px-12">
            <button 
                className="w-fit border-2 border-black bg-gray-300 rounded-md py-2 px-6 font-extrabold text-xl">
                CREATE +
             </button>

             <div className="flex-1 min-h-0 border-8 border-red-700 overflow-y-auto mb-6">
                {loading && <p className="text-3xl" >loading...</p>}
                {error && <p className="text-3xl text-red-700">{error}</p>}
                {!error && !loading && notes.length == 0 && <p>No notes yet ...</p>}
                {!error && !loading && 
                notes.map((note) => 
                    <div className="border-2 border-gray-800 "> {note.title} </div>
                )}
             </div>
        </div>
    )

}

export default HomePage