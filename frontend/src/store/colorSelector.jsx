import React from "react";
import { useState } from "react";

function ColorSelector({ selectedColor, onSelect }) {
  const colors = [
  "#d1d5db", 
  "#fef9c3", 
  "#bbf7d0", 
  "#bfdbfe",
  "#fbcfe8", 
  "#e9d5ff", 
  "#fecdd3", 
  "#fed7aa",
  "#fef3c7", 
  "#ccfbf1",
  "#e0e7ff", 
  "#e2e8f0", 
  ];
  

  return (
    <>   
   
      <h1 className="font-extrabold text-gray-500 text-3xl">Colors</h1>  
        <div 
        className=" bg-gray-600 cursor-pointer rounded-xl grid lg:grid-cols-3 content-start gap-3 p-4 w-max"
        >
          {colors.map((color) => (
            <div
              onClick={() => onSelect(color)}
              className="border-2 border-white w-16 h-16 rounded-lg"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>    
        
    </>
  );
}

export default ColorSelector;
