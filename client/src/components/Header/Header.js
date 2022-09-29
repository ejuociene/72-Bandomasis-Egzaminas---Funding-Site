import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import axios from "axios";
import logo from "../../images/logo.jpg";
import MainContext from "../../context/MainContext";

const Header = () => {
  const { userInfo, setAlert, setUserInfo } = useContext(MainContext);
  const navigate = useNavigate();
  const logout = () => {
    axios
      .get("api/admins/logout")
      .then((resp) => {
        setUserInfo({});
        setAlert({ message: resp.data, status: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setAlert({ message: error.response.data, status: "danger" });
      });
  };
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <ul className="nav-list">
          <li>
            <Link to="/" className="nav-link">
              Idėjos
            </Link>
          </li>
          <li>
            <Link to="/newIdea" className="nav-link">
              + Nauja idėja
            </Link>
          </li>
          {userInfo.id ? (
            <>
              <li>
                <Link to="/admin" className="nav-link">
                  Administratorius
                </Link>
              </li>
              <li className="nav-link" onClick={() => logout()}>
                Atsijungti
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="nav-link">
                Prisijungti
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
