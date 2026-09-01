import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios"

function LoginPage() {

    const nav = useNavigate()
    const [loginData,setLoginData] = useState({username:"",password:""})
    const [error,setError] = useState(null)

    const handelLogin = async(e) => {
        e.preventDefault();

        try{     
            const res = await API.post("/auth/logIn",loginData)
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.data.user));
            nav("/");      
        }catch(err){
            setError(err.response?.data?.message || "Registration failed");

        }
    }

    return(
        <div
        className="flex justify-center items-center w-full h-full"
        >     
            <form
            className=" mb-4 flex flex-col gap-10 justify-center items-center  border-2 border-white/20 rounded-lg w-1/3 h-3/4 bg-transparent shadow-2xl"
            style={{backdropFilter: 'blur(20px)'}}
            onSubmit={handelLogin}
            >
                <h1 className="mb-11 font-extrabold text-6xl text-gray-200 ">Login</h1>
                <input
                type="text"
                className="h-16 w-4/5 rounded-full border-2 border-white/20 text-gray-100 bg-transparent focus:outline-none text-2xl placeholder:text-gray-200 px-6"
                placeholder="Username"
                maxLength={20}
                minLength={4}
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value })}
                />
                <input
                type="password"
                className="h-16 w-4/5 rounded-full border-2 border-white/20 text-gray-100 bg-transparent focus:outline-none text-2xl placeholder:text-gray-200 px-6"
                placeholder="Password"
                maxLength={20}
                minLength={8}
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value })}
                />
                <div className="flex flex-col w-4/5 items-center justify-center gap-5">
                    {error && <p className="text-red-500 text-xl font-medium">{error}</p>} 
                    {!error && <p>{""}</p> }
                    <button
                    className="h-16 w-4/5 rounded-full  hover:bg-purple-950 hover:text-white font-bold bg-white text-gray-700 text-2xl px-6"
                    type='submit'
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
            </form>
            
        </div>

    )
}

export default LoginPage