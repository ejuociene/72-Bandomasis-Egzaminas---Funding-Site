import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../../context/MainContext";
import axios from "axios";

const Ideas = () => {
  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  // const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    axios
      .get("/api/ideas")
      .then((resp) => setIdeas(resp.data))
      .catch((error) => {
        console.log(error);
        setAlert({ message: error.response.data, status: "danger" });
        if (error.response.status === 401) navigate("/login");
      });
  }, [setAlert, navigate]);
  console.log(ideas);
  return (
    <div className="container">
      <div className="heading">
        <h1 className="title">Visos idėjos:</h1>
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
            <div className="idea-fundings-container">
              <div className="bold">Jau prisidėjo:</div>
              <table>
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
                <tr>
                  <td>
                    <input type="text" name="fullName" placeholder="Jūsų vardas"/>
                  </td>
                  <td>
                    <input type="number" name="amount" placeholder="suma" />
                  </td>
                  <td>
                    <button>Prisidėti</button>
                  </td>
                </tr>
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
