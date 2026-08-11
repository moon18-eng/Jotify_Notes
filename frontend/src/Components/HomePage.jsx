import React from "react";

function HomePage(){
    
    return(
        <div className="flex-1 min-h-0 flex flex-col gap-6 px-12">
            <button 
                className="w-fit border-2 border-black bg-gray-300 rounded-md py-2 px-6 font-extrabold text-xl">
                CREATE +
             </button>

             <div className="flex-1 min-h-0 border-8 border-red-700 overflow-y-auto mb-6">
                HELLO   
             </div>
        </div>
    )

}

export default HomePage