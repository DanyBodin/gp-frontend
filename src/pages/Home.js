import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = ({ setGame, setGameId, setSearch, isLoading, data }) => {
  return isLoading ? (
    <p>Processing ...</p>
  ) : (
    <div>
      <body>
        <div className="homecontainer"></div>

        <p className="title">GAMEPAD</p>

        <form>
          <input
            className="searchbar"
            type="text"
            placeholder={"Tell us what you looking for"}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          ></input>
        </form>

        <div>
          <span style={{ color: "white", marginTop: "20px" }}>
            Search among {data.count} games
          </span>
        </div>

        <div className="filtering">
          <h1>Most Revelant</h1>
        </div>

        <div className="cardcontainer">
          {data.results.map((game, index) => {
            return (
              <Link
                className="gamecardlink"
                to={`/games`}
                onClick={() => {
                  setGame(game.name);
                  setGameId(game.id);
                }}
              >
                <div key={index} className="gamecard">
                  <img src={game.background_image} alt="game-card-img" />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "2px",
                    }}
                  >
                    <h2> {game.name} </h2>
                    <div className="metascorebox">
                      <p className="metascoretext">{game.metacritic}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div>{data.next}</div>
      </body>
    </div>
  );
};

export default Home;
