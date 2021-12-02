import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Paginate = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.rawg.io/api/games?key=5a7fbaf7083f4bdb95deb7ee55437b66"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
  });
  return isLoading ? (
    <p>Processing ...</p>
  ) : (
    <div>
      <Link to={"/"}>button</Link>
      Paginate
    </div>
  );
};

export default Paginate;
