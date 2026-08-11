
import { Routes, Route } from "react-router";
import Navbar from "./Components/Navbar";
import NotePage from "./Components/NotePage";
import HomePage from "./Components/HomePage";


function App() {
  return (
    <div className="w-screen h-screen flex flex-col gap-8 ">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes/:id" element={<NotePage />} />
      </Routes>
    </div>
     
  )
}

export default App
