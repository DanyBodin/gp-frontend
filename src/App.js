import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Review from "./pages/Review";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Game from "./pages/Game";
import Collection from "./pages/Collection";
import axios from "axios";

require("dotenv").config();

function App() {
  const [token, setToken] = useState();
  const [game, setGame] = useState();
  const [slug, setSlug] = useState();
  const [gameId, setGameId] = useState();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 0.003 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  //5a7fbaf7083f4bdb95deb7ee55437b66
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${
            process.env.GP_API_KEY
          }&search=${search}&search_precise=${true}`,
          { params: { page_size: 50000 } }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  });

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setUser={setUser}
              setGame={setGame}
              setGameId={setGameId}
              setSearch={setSearch}
              data={data}
              setData={setData}
              isLoading={isLoading}
            />
          }
        ></Route>
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/review"
          element={<Review token={token} setUser={setUser} gameId={gameId} />}
        />
        <Route
          path={"/games"}
          element={
            <Game
              token={token}
              setUser={setUser}
              game={game}
              setGame={setGame}
              gameId={gameId}
            />
          }
        />
        <Route
          path="/user/collection"
          element={
            <Collection
              token={token}
              setUser={setUser}
              game={game}
              setGame={setGame}
              gameId={gameId}
              setGameId={setGameId}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
