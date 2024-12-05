import { Routes, Route } from "react-router-dom";
//pages import
import Home  from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import Register from "./pages/UserSignup";
import CaptainRegister from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
const App = () => {
  return (
    <div className="text-[#000]">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<UserLogin/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/captainRegister" element={<CaptainRegister/>} />
          <Route path="/captainLogin" element={<CaptainLogin/>} />
        </Routes>
    </div>
  )
}

export default App;