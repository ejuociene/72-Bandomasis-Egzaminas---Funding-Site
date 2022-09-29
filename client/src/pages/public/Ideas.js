import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../../context/MainContext";
import axios from "axios";
import communityImg from "../../images/community.png"

const Ideas = () => {
  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false)
  const [ideas, setIdeas] = useState([]);
  const [fund, setFund] = useState({})

  useEffect(() => {
    axios
      .get("/api/ideas/confirmed")
      .then((resp) => setIdeas(resp.data))
      .catch((error) => {
        console.log(error);
        setAlert({ message: error.response.data, status: "danger" });
      });
  }, [setAlert, navigate, refresh]);
  const handleChange = (e) => {
    setFund((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submitFunding = (id) => {
	axios.post(`/api/fundings/new/${id}`, fund).then(resp => {
		setAlert({message: resp.data, status: "success"})
		setRefresh(prevState => !prevState)
		setFund({})
	
	}).catch((error) => {
        console.log(error);
        setAlert({ message: error.response.data, status: "danger" });
      });
  }
  return (
    <div className="container">
      <div className="intro">
        <h1 className="intro-heading">Pildyk savo svajones ir prisidėk prie bendruomenės!</h1>
        <img src={communityImg} alt="community" className="intro-img"></img>
      </div>
      <div className="heading">
        <h2 className="title">Visos idėjos:</h2>
      </div>
      <div className="idea-container">
        {ideas?.map((idea) => {
          return (
            <div key={idea.id} className="idea-card">
              <img src={idea.image} alt={idea.id} className="idea-img" />
              <div className="idea-info">
                <div className="idea-header">
                  <div>TIKSLAS: <span className="bold">{idea.goal} EUR</span></div>
                  <div>SURINKTA: <span className="bold">{idea.raisedAmount} EUR</span></div>
                  <div>
                    LIKO: <span className="bold">{idea.goal - idea.raisedAmount} EUR</span>
                  </div>
                </div>
                <p className="idea-text">{idea.text}</p>
              </div>
              <div className="idea-fundings-container">
                {idea.fundings.length > 0 ? <div className="bold"> Prie tikslo prisidėjo:</div> : <div className="bold">Prisidėk ir Tu:</div>}
                <table className="funder-table">
                  <thead>
                    <tr>
                      <th>Vardas</th>
                      <th>Suma</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {idea.fundings?.map((funding) => {
                      return (
                        <tr key={funding.id} className="funder">
                          <td>{funding.fullName}</td>
                          <td>{funding.amount} EUR</td>
                        </tr>
                      );
                    })}
					{idea.isCompleted ? <div>

            Tikslas pasiektas!  
          </div> :
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Jūsų vardas"
                          className="form-input"
						  onChange={(e) => handleChange(e)}
                        />
                      </td>
                      <td>
                        <input type="number" name="amount" placeholder="Suma"  className="form-input"  onChange={(e) => handleChange(e)}/>
                      </td>
                      <td>
                        <button onClick={() => submitFunding(idea.id)} className="form--btn">Prisidėti</button>
                      </td>
                    </tr>}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ideas;
