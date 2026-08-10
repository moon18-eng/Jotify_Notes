import React from "react";
import settingsIcon from "../assets/settings.png"
import calendarIcon from "../assets/calendar.png"

function Navbar(){

    return(
        <div className="flex flex-row items-center justify-between pt-5 border-b-2 border-gray-300 pb-3">
            <h1 className=" font-black text-5xl text-pink-700 pl-10">CUTE-NOTES </h1>
            <div className="flex flex-row items-center justify-center pr-12 gap-8">
                <img src={calendarIcon} alt="calendar" className="h-12 w-12 "></img>
                <img src={settingsIcon} alt="settings" className="h-12 w-12 "></img>
            </div>
        </div>
    )

}

export default Navbar