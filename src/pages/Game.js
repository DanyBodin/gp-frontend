import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Game = ({ token, setUser, game, gameId, setGameId, setGame }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [publishers, setPublishers] = useState("");
  const [developers, setDevelopers] = useState("");
  const [reviews, setReviews] = useState("");
  const [series, setSeries] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/games`, {
          params: { name: game },
        });
        setData(response.data);

        const responsePublishers = await axios.get(
          `http://localhost:4000/publishers`
        );
        setPublishers(responsePublishers.data);

        const responseDevelopers = await axios.get(
          `http://localhost:4000/developers`
        );
        setDevelopers(responseDevelopers.data);

        const responseReviews = await axios.get(
          `http://localhost:4000/game/reviews`,
          { params: { game_id: gameId } }
        );
        setReviews(responseReviews.data);

        const responseSeries = await axios.get(
          `http://localhost:4000/game/series`,
          {
            params: { game_id: gameId },
          }
        );
        setSeries(responseSeries.data);

        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, [game, gameId]);

  console.log(series);

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
            <div className="gamebutton">
              <button>SAVE TO COLLECTION</button>
            </div>

            <Link to="/review">
              <button className="gamebutton">REVIEW THE GAME</button>
            </Link>
          </div>

          <div className="gamedescriptiontext">
            <div className="leftdescription">
              <p className="gamecardsubtitle">PLATFORMS</p>
              <div>
                {data.platforms.map((obj, i) => {
                  return (
                    <span style={{ color: "white" }}>{obj.platform.name}</span>
                  );
                })}
              </div>
              <p className="gamecardsubtitle">REALESED DATE</p>
              <div style={{ color: "white" }}>{data.released}</div>
              <p className="gamecardsubtitle">PUBLISHER</p>
              <div style={{ color: "white" }}>
                {publishers.map((obj, i) => {
                  return obj.games.map((gme, j) => {
                    return gme.name === game ? (
                      <span style={{ color: "white" }}> {obj.name} </span>
                    ) : (
                      <></>
                    );
                  });
                })}
              </div>
            </div>
            <div className="rigthdescription">
              <p className="gamecardsubtitle">GENRE</p>
              <div>
                {data.genres.map((genre, i) => {
                  return <span style={{ color: "white" }}>{genre.name}</span>;
                })}
              </div>
              <p className="gamecardsubtitle">DEVELOPER</p>
              <div style={{ color: "white" }}>
                {developers.map((obj, i) => {
                  return obj.games.map((gme, j) => {
                    return gme.name === game ? (
                      <span style={{ color: "white" }}> {obj.name} </span>
                    ) : (
                      <></>
                    );
                  });
                })}
              </div>
              <p className="gamecardsubtitle">AGE RATING</p>
              <div>
                <span style={{ color: "white" }}>{data.esrb_rating.slug}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1> GAME LIKE : {game}</h1>
      </div>

      <div className="ribboncontainer">
        {series.map((serie, i) => {
          return (
            <div className="ribboncard">
              <Link className="serielink" to={"/games"}>
                <img src={serie.background_image} alt={serie.name} />
                <h3> {serie.name} </h3>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="reviewsfooter">
        <div className="reviewstitle">
          <h2>Reviews for this game</h2>
          <p style={{ fontSize: "15px", color: "red", marginLeft: "5px" }}>
            {reviews.length}
          </p>
        </div>

        <div className="reviewscontainer">
          {reviews.length > 0 ? (
            reviews.map((review, i) => {
              return (
                <div className="reviewsbox">
                  <p>{review.review_title}</p>
                  <p>{review.review_text}</p>
                  <div className="reviewboxfooter">
                    <button> + </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ color: "white" }}>{"NO REVIEW YET"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
