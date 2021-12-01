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

function App() {
  const [token, setToken] = useState();

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
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup setUser={setUser} />}></Route>
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route path="/Review" element={<Review setUser={setUser} />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

//5a7fbaf7083f4bdb95deb7ee55437b66
