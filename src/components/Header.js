import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();

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
            onClick={() => {
              navigate("/collection");
            }}
          >
            MY COLLECTION
          </button>
        ) : (
          <button
            onClick={() => {
              setUser(null);
              navigate("/");
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
