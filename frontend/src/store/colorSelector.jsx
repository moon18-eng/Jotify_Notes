import React from "react";
import { useState } from "react";

function ColorSelector({ label, selectedColor, onSelect }) {
  const colors = [
    "#ffffff",
    "#fef08a",
    "#bbf7d0",
    "#bfdbfe",
    "#fbcfe8",
    "#e9d5ff",
    "#fca5a5",
    "#000000",
  ];
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
        {isOpen && (
          <div
            className="w-screen h-screen absolute top-0 left-0 bg-black/25"
            onClick={() => setIsOpen(false)}
          />
        )}
      <div className="relative flex flex-row gap-10 justify-center items-center border-4 border-white bg-gray-300 h-24 w-4/5  rounded-xl">
        <h1 className="font-extrabold text-gray-600 text-3xl">{label}</h1>
        <div className="relative">
          <div
            className=" border-4 border-white w-14 h-14 rounded-lg cursor-pointer"
            style={{ backgroundColor: selectedColor }}
            onClick={(e) => {
              setIsOpen(true);
            }}
          />

          {isOpen && (
            <>
              <div className="absolute bottom-full mb-2g left-1/2 -translate-x-1/3  border-4 border-white bg-gray-300 cursor-pointer rounded-xl grid lg:grid-cols-4 content-start gap-3 p-4 w-max">
                {colors.map((color) => (
                  <div
                    onClick={() => onSelect(color)}
                    className="border-2 border-white w-11 h-11 rounded-lg"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ColorSelector;
