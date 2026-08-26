
import { Routes, Route } from "react-router";
import Navbar from "./Components/Navbar";
import NotePage from "./Components/NotePage";
import HomePage from "./Components/HomePage";
import FormPage from "./Components/formPage";
import bg from "../src/assets/ikhlas-gJDvDw889RI-unsplash.jpg"
import NotFoundPage from "./Components/NotFound";


function App() {
  return (
    <div className="w-screen h-screen flex flex-col bg-cover bg-center bg-no-repeat bg-fixed"
    style={{backgroundImage : `url("${bg}")`}}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/noteForm/:id" element={<FormPage />}/>
        <Route path="/note/:id" element={<NotePage />} />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
     
  )
}

export default App
