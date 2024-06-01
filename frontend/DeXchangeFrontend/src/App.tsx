import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/Signup";
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Signup" element={<SignUp />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Home" element={<MainComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
