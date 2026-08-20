import React from "react";

function ColorSelector({label, selectedColor, onSelect}) {
    const colors = [
      "#ffffff", "#fef08a", "#bbf7d0", "#bfdbfe",
      "#fbcfe8", "#e9d5ff", "#fca5a5", "#000000"
    ]

    return(
    <div className="flex flex-col">
        {colors.map((color) => 
            <div 
            onClick={onSelect(color)} 
            className="border border-white" 
            style={{backgroundColor: color}}>
            </div>
        )}
    </div>
    
    )
}

export default ColorSelector