import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Review = ({ setUser }) => {
  const [reviewTitle, setReviewTitle] = useState();
  const [reviewText, setReviewText] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:4000/user/review", {
        review_title: reviewTitle,
        review_text: reviewText,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      console.log(error.response);

      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <form className="reviewform" onSubmit={handleSubmit}>
        <h1>REVIEW THIS GAME</h1>
        <input
          onChange={(event) => {
            setReviewTitle(event.target.value);
          }}
          type="text"
          value={reviewTitle}
          placeholder="Give a title"
          className="signupbutton"
        ></input>

        <textarea
          onChange={(event) => {
            setReviewText(event.target.value);
          }}
          type="text"
          value={reviewText}
          placeholder="Let us know what you think"
          className="signupbutton"
          rows="2"
          cols="50"
        ></textarea>

        <input
          className="submitbutton"
          type="submit"
          value={"publish"}
          style={{ color: "white" }}
        ></input>
        {error ? <p style={{ color: "red" }}>{error}</p> : <> </>}
      </form>
    </div>
  );
};

export default Review;
