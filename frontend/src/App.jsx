import NavBar from "./components/NavBar"
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Otp from "./pages/Otp";
import ResetPassword from "./pages/ResetPassword";

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  )
}

export default App
