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
import Admin from "./pages/admin/Admin";
import "./App.css";

function App() {
  const [alert, setAlert] = useState({
    message: "",
    status: "",
  });
  const [userInfo, setUserInfo] = useState({});
  const [refresh, setRefresh] = useState(false);
  const contextValues = { userInfo, setUserInfo, alert, setAlert, setRefresh };
  useEffect(() => {
    axios
      .get("/api/admins/check-auth/")
      .then((resp) => {
        setUserInfo(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);
  console.log(userInfo)
  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <Alert />
        <div className="App">
          <Routes>
            <Route path="/" element={<Ideas />} />
            <Route path="/newIdea" element={<NewIdea />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Ideas />} />
           {userInfo.id && <Route path="/admin" element={<Admin />} />}
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  );
}

export default App;
