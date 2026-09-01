
import { Routes, Route , useLocation } from "react-router";
import NotePage from "./Components/NotePage";
import HomePage from "./Components/HomePage";
import FormPage from "./Components/formPage";
import bg from "./assets/bgg.jpeg"
import NotFoundPage from "./Components/NotFound";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import Navbar from "./Components/Navbar";

function App() {
  const location = useLocation()
  const isAuth = location.pathname === '/login' || location.pathname == '/signUp'
  return (
    <div className="w-screen h-screen flex flex-col bg-cover bg-center bg-no-repeat bg-fixed"
    style={ isAuth?
      
        {backgroundImage : `url("${bg}")`}
        : {backgroundColor:"#1e1e2f" }
        }>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/noteForm/:id" element={<FormPage />}/>
        <Route path="/note/:id" element={<NotePage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signUp" element={<SignupPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
     
  )
}

export default App
