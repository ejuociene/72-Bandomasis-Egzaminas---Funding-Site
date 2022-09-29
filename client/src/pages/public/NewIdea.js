import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../../context/MainContext";
import axios from "axios";

const NewIdea = () => {
  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    text: "",
    image: "",
    goal: "",
  });
  const handleChange = (e) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]:
          e.target.name === "image" ? e.target.files[0] : e.target.value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const ideaForm = new FormData();
    for (const key in form) {
      ideaForm.append(key, form[key]);
    }
    axios
      .post("/api/ideas/new", ideaForm)
      .then((resp) => {
        setAlert({ message: resp.data, status: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setAlert({ message: error.response.data, status: "danger" });
        if (error.response.status === 401) navigate("/login");
      });
  };
  console.log(form);
  return (
    <div className="container">
      <div className="heading">
        <h1 className="title">Pridėti naują idėją:</h1>
      </div>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <textarea
          className="form-input"
          rows={10}
          name="text"
          onChange={(e) => handleChange(e)}
        />
        <div className="form--item">
          <label>Sumos tikslas:</label>
          <input
            type="number"
            className="form-input narrow-input"
            name="goal"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form--item">
          <label>Nuotrauka:</label>
          <input
            type="file"
            name="image"
            className="form-upload"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <button className="btn">Siųsti patvirtinimui</button>
      </form>
    </div>
  );
};

export default NewIdea;
