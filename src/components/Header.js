import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();
  const [collectionMessage, setCollectionMessage] = useState("");

  return (
    <div className="headercontainer">
      <div className="titlecontainer">
        <Link to="/" style={{ textDecoration: "none", fontSize: "50px" }}>
          GAMEPAD
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        {token ? (
          <button
            className="noframebutton"
            onClick={() => {
              navigate("/collection");
            }}
          >
            MY COLLECTION
          </button>
        ) : (
          <button
            className="noframebutton"
            onClick={() => {
              setUser(null);
              navigate("/");
              setCollectionMessage("Signup or login to acces your collection");
            }}
          >
            MY COLLECTION
          </button>
        )}
      </div>
      <div>
        {token ? (
          <button
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            LOGOUT
          </button>
        ) : (
          <div>
            <Link to="/signup">
              <button>SIGNUP</button>
            </Link>
            <Link to="/login">
              <button>LOGIN</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

/*
<div>
  {token ? (
    <button
      onClick={() => {
        setUser(null);
        navigate("/");
      }}
    >
      Se déconnecter
    </button>
  ) : (
    <>
      <Link to="/signup">S'inscrire</Link>
      <Link to="/login">Se connecter</Link>{" "}
    </>
  )}
</div>;
*/
