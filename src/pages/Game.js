import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Game = ({ token, setUser, game }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");

  console.log(game);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/games`, {
          params: { name: game },
        });
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, [game]);

  return isLoading ? (
    <p>Processing ... </p>
  ) : (
    <div className="gamepage">
      <h1>{game}</h1>
      <div className="gamedescription">
        <div className="leftgamepage">
          <img src={data.background_image} alt={data.name} />
        </div>
        <div className="rightgamepage">
          <div className="gamebuttons">
            <button className="gamebutton">SAVE TO COLLECTION</button>
            <Link to="/review">
              <button className="gamebutton">REVIEW THE GAME</button>
            </Link>
          </div>

          <div className="gamedescriptiontext">
            <div className="leftdescription">
              <p>Plateforms</p>
              <div>
                {data.platforms.map((platform, index) => {
                  return <p>{platform.name}</p>;
                })}
              </div>
              <p>Realeased date</p>
              <div style={{ color: "white" }}>{data.released}</div>
              <p>Publisher</p>
              <div style={{ color: "white" }}>{data.released}</div>
            </div>
            <div className="rigthdescription">
              <p>Genre</p>
              <p>Developper</p>
              <p>Age rating</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1> GAME LIKE : {game}</h1>
      </div>

      <div>RIBBON</div>
    </div>
  );
};

export default Game;
