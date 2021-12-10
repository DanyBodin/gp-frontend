import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Collection = ({ token }) => {
  const [userCollection, setUserCollection] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/user/collection`
        );
        setUserCollection(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, []);

  console.log(userCollection);
  return isLoading ? (
    <p>Processing ...</p>
  ) : (
    <div className="collectioncontainer">
      <p>THIS IS YOUR LIBRARY</p>
      <div className="collectionboard">
        {userCollection.map((game, i) => {
          return (
            <div className="collectioncard">
              <div>
                <span
                  style={{
                    marginLeft: "10px",
                    color: "white",
                    marginTop: "10px",
                  }}
                >
                  {game.game_name}
                </span>
                <input type="checkbox"></input>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collection;

/*

      <div className="collectionboard">
        {userCollection.map((game, i) => {
          return (
            <div className="collectioncard">
              <div>
                <span style={{ marginLeft: "10px", color: "white" }}>
                  {game.game_name}
                </span>
                <input type="checkbox"></input>
              </div>
            </div>
          );
        })}
      </div>

*/
