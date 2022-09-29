import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainContext from "../../context/MainContext";

const Admin = () => {
  const { setAlert } = useContext(MainContext);
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  useEffect(() => {
    axios
      .get("/api/ideas")
      .then((resp) => setIdeas(resp.data))
      .catch((error) => {
        console.log(error);
        setAlert({ message: error.response.data, status: "danger" });
      });
  }, [setAlert, navigate, refresh]);
  const handleDelete = (id) => {
    axios.delete(`api/ideas/delete/${id}`).then(resp => {
      setAlert({message: resp.data, status: "success"})
      setRefresh(prevState => !prevState)
    }).catch((error) => {
      console.log(error);
      setAlert({ message: error.response.data, status: "danger" });
      if (error.response.status === 401) navigate("/login");
    });
  }
  const confirmIdea = (id) => {
    axios.put(`api/ideas/confirm/${id}`).then(resp => {
      setRefresh(prevState => !prevState)
      setAlert({message: resp.data, status: "success"});
    }).catch((error) => {
      console.log(error);
      setAlert({ message: error.response.data, status: "danger" });
      if (error.response.status === 401) navigate("/login");
    });
  }
  
  return (
    <div className="container">
      <div className="heading">
        <h1 className="title">Aministratoriaus panelė:</h1>
      </div>
      <div className="idea-container">
        {ideas?.map((idea) => {
          return (
            <div key={idea.id} className="idea-card">
              <img src={idea.image} alt={idea.id} className="idea-img" />
              <div className="idea-info">
                <div className="idea-header">
                  <div className="bold">TIKSLAS: {idea.goal} EUR</div>
                  <div className="bold">SURINKTA: {idea.raisedAmount} EUR</div>
                  <div className="bold">
                    LIKO: {idea.goal - idea.raisedAmount} EUR
                  </div>
                </div>
                <p className="idea-text">{idea.text}</p>
              </div>
              <div className="admin-actions">
                <div>
                  Statusas: <span className="bold">
                    {idea.status ? "Patvirtinta" : "Laukia patvirtinimo"}
                    </span>
                </div>
                <button disabled={idea.status && "disabled"} onClick={() => confirmIdea(idea.id)} className={idea.status ? "disabled-btn": "btn"}>Patvirtinti</button>
                <button onClick={() => handleDelete(idea.id)} className="btn">Ištrinti</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;
