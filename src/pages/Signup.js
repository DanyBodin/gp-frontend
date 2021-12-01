import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Sign = ({ setUser }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:4000/user/signup", {
        username: username,
        email: email,
        password: password,
      });
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="signupmaincontainer">
      <div className="signupleftcontent">
        <p>TEXTE HERE</p>
        <p>TEXTE HERE</p>
        <p>TEXTE HERE</p>
      </div>
      <div className="signuprightcontent">
        <form className="signupform" onSubmit={handleSubmit}>
          <h1>SIGN UP</h1>
          <input
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            type="text"
            value={username}
            placeholder="Username"
            className="signupbutton"
          ></input>
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            type="email"
            value={email}
            placeholder="Email"
            className="signupbutton"
          ></input>

          <div className="passwordbox">
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="password"
              placeholder="Password"
              className="passwordbutton"
            ></input>
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="password"
              placeholder="Confirm Password"
              className="passwordbutton"
            ></input>
          </div>

          <div className="signupletter">
            <input type="checkbox" className="checkbox"></input>
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p className="signupcondition">
            En m'inscrivant je confirme avoir lu et accepté les termes et
            conditions et Politique de Vinted. Je confirme avoir au moins 18
            ans.
          </p>

          <input
            className="submitbutton"
            type="submit"
            value={"S'inscrire"}
          ></input>
          <Link
            style={{
              textDecoration: "none",
              color: "gray",
              fontSize: "12px",
            }}
            to="/login"
          >
            <p>Tu as déjà un compte ? Connecte-toi !</p>
          </Link>
          {error ? <p style={{ color: "red" }}>{error}</p> : <> </>}
        </form>
      </div>
    </div>
  );
};

export default Sign;
