import React from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const nav = useNavigate()

    return(
        <div
        className="flex justify-center items-center w-full h-full"
        >     
            <div
            className=" mb-4 flex flex-col gap-10 justify-center items-center  border-2 border-white/20 rounded-lg w-1/3 h-3/4 bg-transparent shadow-2xl"
            style={{backdropFilter: 'blur(20px)'}}
            >
                <h1 className="mb-11 font-extrabold text-6xl text-gray-200 ">Login</h1>
                    <input
                    type="text"
                    className="h-16 w-4/5 rounded-full border-2 border-white/20 text-gray-100 bg-transparent focus:outline-none text-2xl placeholder:text-gray-200 px-6"
                    placeholder="Username"
                    />
                    <input
                    type="text"
                    className="h-16 w-4/5 rounded-full border-2 border-white/20 text-gray-100 bg-transparent focus:outline-none text-2xl placeholder:text-gray-200 px-6"
                    placeholder="Password"
                    />

                     <button
                    className="h-16 w-4/5 rounded-full  hover:bg-purple-950 hover:text-white font-bold bg-white text-gray-700 text-2xl px-6"
                    > 
                    login
                    </button>
                    <p className="text-white text-xl"> Don't have an account?  
                        <span 
                        className="font-bold cursor-pointer"
                        onClick={() => nav('/signUp')}
                        >   
                        {" "} Sign up
                        </span>
                    </p>
                </div>
            
        </div>

    )
}

export default LoginPage