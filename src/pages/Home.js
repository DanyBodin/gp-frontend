import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = ({ setGame, setGameId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [search, setSearch] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.rawg.io/api/games?key=5a7fbaf7083f4bdb95deb7ee55437b66",
          { params: { page_size: 50000 } }
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const research = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  return isLoading ? (
    <p>Processing ...</p>
  ) : (
    <div>
      <body>
        <div className="homecontainer"></div>

        <p className="title">GAMEPAD</p>

        <form>
          <input className="searchbar" type="text" onChange={research}></input>
          <FontAwesomeIcon icon="search" className="search-input-icon" />
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
