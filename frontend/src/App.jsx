
import { Routes, Route } from "react-router";
import Navbar from "./Components/Navbar";
import NotePage from "./Components/NotePage";
import HomePage from "./Components/HomePage";
import FormPage from "./Components/formPage";


function App() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/note/:id" element={<NotePage />} />
        <Route path="/noteForm" element={<FormPage />}/>
      </Routes>
    </div>
     
  )
}

export default App
