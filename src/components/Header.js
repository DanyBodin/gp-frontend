import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="headercontainer">
      <div className="titlecontainer">
        <h1>GAMEPAD</h1>
      </div>
      <div>
        <button className="noframebutton">My Collection</button>
        <Link to="/signup">
          <button>SIGNUP</button>
        </Link>
        <Link to="/login">
          <button>LOGIN</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
