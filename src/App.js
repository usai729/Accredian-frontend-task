import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/auth-login/Login";
import SignupForm from "./Components/Signup/SignupForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/register" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
