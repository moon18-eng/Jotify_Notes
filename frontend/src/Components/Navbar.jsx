import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar(){
    const nav = useNavigate()
    const location = useLocation()

    let buttonText = "Log out";
    let buttonPath = "/login";

    if (location.pathname === "/login") {
        buttonText = "Sign up";
        buttonPath = "/signUp";
    } else if (location.pathname === "/signUp") {
        buttonText = "Log in";
        buttonPath = "/login";
    }

    const handleButtonClick = () => {
        if (buttonText === "Log out") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            nav(buttonPath, { replace: true });
        } else {
            nav(buttonPath);
        }
    }

    return(
        <div className="flex flex-row items-center justify-between pt-8 pb-3">
            <h1 
            className=" font-black text-5xl text-gray-100 pl-20 cursor-pointer"
            onClick={()=>nav("/")}
            >
              Jotify Notes
            </h1>
            <div className="flex flex-row items-center justify-center pr-20 gap-10">
                <h1 className=" font-bold text-2xl text-gray-200">About</h1>
                <h1 className=" font-bold text-2xl text-gray-200">Theme</h1>
                <h1
                className=" font-bold text-2xl text-gray-200 border-2 rounded-lg border-gray-200 px-7 py-2 hover:bg-white hover:text-gray-700 cursor-pointer"
                onClick={handleButtonClick}
                >
                    {buttonText}
                </h1>
            </div>
        </div>
    )
}

export default Navbar