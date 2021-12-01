import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
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
    <p>processing ...</p>
  ) : (
    <div>
      <body>
        <div className="homecontainer"></div>
        <h1>GAMEPAD</h1>
        <form>
          <input className="searchbar" type="text" onChange={research}></input>
        </form>

        <div>
          <span style={{ color: "white", marginTop: "20px" }}>
            Search among {data.count} games
          </span>
        </div>

        <div className="cardcontainer">
          {data.results.map((game, index) => {
            if (game.rating > 4.2) {
              return (
                <div className="gamecard">
                  <img src={game.background_image} alt="game-card-img" />
                  <h2> {game.name} </h2>
                </div>
              );
            }
          })}
        </div>
      </body>
    </div>
  );
};

export default Home;
