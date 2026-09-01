import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

function SignupPage() {

    const nav = useNavigate();
    const [signData,setSignData] = useState(
     {display_name:"", username:"", password:"", confirm_password:""}
    );
    const [error,setError] = useState(null);

    const handelSignup = async(e)=>{
        e.preventDefault();
        try{
          const res = await API.post("/auth/signUp",signData);
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          nav("/");  
        }catch(err){
            setError(err.response?.data?.message || "Registration failed");
        }
    }

    return(
        <div
        className="flex justify-around items-center w-full h-full gap-20"
        >      
            {error && <p>{error}</p>} 
            <form
            className="mb-4 ml-16 flex flex-col gap-8 justify-center items-center border-2 border-white/20 rounded-lg w-3/5 h-3/4 bg-transparent shadow-2xl"
            style={{backdropFilter: 'blur(20px)'}}
            onSubmit={handelSignup}
            >
                <h1 className="mb-12 font-extrabold text-6xl text-gray-200 ">Sign up</h1>
                <div className="flex flex-row gap-3 items-center justify-center">
                    <input
                    type="text"
                    className="h-16 w-3/4 rounded-full border-2 border-white/20 text-gray-100 bg-transparent focus:outline-none text-2xl placeholder:text-gray-200 px-6"
                    placeholder="Username"
                    maxLength={20}
                    minLength={4}
                    value={signData.username}
                    onChange={(e) => setSignData({...signData, username: e.target.value })}
                    />
                    <input
                    type="text"
                    className="h-16 w-3/4 rounded-full border-2 border-white/20 text-gray-100 bg-transparent focus:outline-none text-2xl placeholder:text-gray-200 px-6"
                    placeholder="Display name"
                    maxLength={20}
                    minLength={4}
                    value={signData.display_name}
                    onChange={(e) => setSignData({...signData, display_name: e.target.value })}
                    />
                </div>
                    <input
                    type="text"
                    className="h-16 w-5/6 rounded-full border-2 border-white/20 text-gray-100 bg-transparent focus:outline-none text-2xl placeholder:text-gray-200 px-6"
                    placeholder="Password"
                    maxLength={20}
                    minLength={8}
                     value={signData.password}
                    onChange={(e) => setSignData({...signData, password: e.target.value })}
                    />
                    <input
                    type="text"
                    className="h-16 w-5/6 rounded-full border-2 border-white/20 text-gray-100 bg-transparent focus:outline-none text-2xl placeholder:text-gray-200 px-6"
                    placeholder="Confirm password"
                    maxLength={20}
                    minLength={8} 
                     value={signData.confirm_password}
                    onChange={(e) => setSignData({...signData, confirm_password: e.target.value })}
                    />

                    <button
                    className="h-16 w-2/3 rounded-full font-bold bg-white text-gray-700 text-2xl px-6 hover:bg-purple-950 hover:text-white"
                    type='submit'
                    > 
                    Sign up
                    </button>

                    <p className="text-white text-xl"> Already have an account?{" "}  
                        <span 
                        className="font-bold cursor-pointer"
                        onClick={() => nav('/login')}
                        > 
                        Log in
                        </span>
                    </p>
            </form>
            <div
            className="mb-16 flex flex-col gap-6 justify-center items-start text-left p-10 rounded-lg w-2/4 h-3/4 "
            >
                <h1 className="text-7xl font-extrabold text-purple-100 leading-tight">
                  Clear Your <br />
                  <span className="text-purple-950 text-8xl font-black">Mind & Chaos</span> <br />
                  With Jotify
                </h1>
                <p className="text-gray-200 text-lg leading-relaxed">
                  A minimal space designed to capture fast notes, pin high-priority tasks, and organize <p>your daily thoughts effortlessly.</p>
                </p>
                
            </div>
            
        </div>

    )
}

export default SignupPage;