import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Review from "./pages/Review";
import Footer from "./components/Footer";
import { useState } from "react";
import Cookies from "js-cookie";
import Game from "./pages/Game";
import Collection from "./pages/Collection";

function App() {
  const [token, setToken] = useState();
  const [game, setGame] = useState();

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 0.003 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              token={token}
              setUser={setUser}
              game={game}
              setGame={setGame}
            />
          }
        ></Route>
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/review" element={<Review setUser={setUser} />} />
        <Route
          path={"/games"}
          element={
            <Game
              token={token}
              setUser={setUser}
              game={game}
              setGame={setGame}
            />
          }
        />
        <Route path="/collection" element={<Collection setUser={setUser} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

//5a7fbaf7083f4bdb95deb7ee55437b66
