import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import MainContext from "./context/MainContext";
import Header from "./components/Header/Header";
import Alert from "./components/Alert/Alert";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Ideas from "./pages/public/Ideas";
import NewIdea from "./pages/public/NewIdea";
import AdminIdeas from "./pages/admin/ideas/Ideas";
import "./App.css";

function App() {
  const [userInfo, setUserInfo] = useState({});
  const contextValues = { userInfo, setUserInfo };
  // useEffect(() => {
  // 	axios.get("/api/users/check-auth/")
  // 	.then(resp => {
  // 			setUserInfo(resp.data)
  // 		}).catch(err => {
  // 		console.log(err)
  // 		})}, [])
  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <Alert />
        <div className="App">
          <Routes>
            <Route path="/admin/ideas" element={<AdminIdeas />} />
            <Route path="/" element={<Ideas />} />
            <Route path="/newIdea" element={<NewIdea />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Ideas />} />
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  );
}

export default App;
