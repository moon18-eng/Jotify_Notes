import React from "react";
import settingsIcon from "../assets/settings.png"
import calendarIcon from "../assets/calendar.png"

function Navbar(){

    return(
        <div className="flex flex-row items-center justify-between pt-8 pb-3">
            <h1 className=" font-black text-5xl text-gray-100 pl-20">Jotify</h1>
            <div className="flex flex-row items-center justify-center pr-20 gap-10">
                <h1 className=" font-bold text-2xl text-gray-200">About</h1>
                <h1 className=" font-bold text-2xl text-gray-200">Theme</h1>
                <h1 className=" font-bold text-2xl text-gray-200 border-2 rounded-lg border-gray-200 px-7 py-2 hover:bg-white hover:text-gray-700 cursor-pointer">Login</h1>

            </div>
        </div>
    )

}

export default Navbar