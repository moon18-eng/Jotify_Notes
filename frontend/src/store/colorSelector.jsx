import React, { useState } from 'react'

function ColorSelector({ label, selectedColor, onSelectColor, gapClass }) {
  const [isOpen, setIsOpen] = useState(false)

  const presetColors = [
    "#ffffff", "#fef08a", "#bbf7d0", "#bfdbfe",
    "#fbcfe8", "#e9d5ff", "#fca5a5", "#000000"
  ]

  return (
    <div className={`relative flex flex-row items-center ${gapClass} border-4 border-white bg-gray-300 rounded-xl text-3xl font-extrabold text-gray-600 px-8 py-3`}>
      <p>{label}</p>
      
      {/* Active Color Button */}
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)} 
        className="h-16 w-20 border-2 border-white rounded cursor-pointer shadow-md" 
        style={{ backgroundColor: selectedColor }}
      />

      {/* Handmade Palette Window */}
      {isOpen && (
        <div className="absolute right-0 top-24 p-3 bg-gray-300 border-4 border-white rounded-xl shadow-2xl z-20 grid grid-cols-4 gap-3">
          {presetColors.map((color) => (
            <button
              key={color}
              type="button"
              className={`w-10 h-10 rounded border-2 border-white cursor-pointer transition-transform hover:scale-110 ${
                selectedColor === color ? 'ring-4 ring-black' : ''
              }`}
              style={{ backgroundColor: color }}
              onClick={() => {
                onSelectColor(color)
                setIsOpen(false)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ColorSelector