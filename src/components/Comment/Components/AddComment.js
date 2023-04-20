import { useState } from "react";
import "./Styles/AddComment.scss";
import Rating from "@mui/material/Rating";

const AddComment = ({ buttonValue, addComments }) => {
  const [comment, setComment] = useState("");
  // const [text] = useState("");
  const [ratingValue, setRatingValue] = useState(0);

  const handleRating = (rate) => {
    setRatingValue(rate);
  };

  const clickHandler = () => {
    if (comment === "" || comment === " ") return;

    const newComment = {
      content: comment,
      rate: ratingValue,
      currentUser: true,
    };

    addComments(newComment, comment, ratingValue);
    setComment("");
  };

  return (
    <div className="add-comment">
      <div>
        {/* {avatar !== null ? (
          <img
            className={`profile-pic`}
            src={references.base_address + avatar}
          ></img>
        ) : (
          <img className={`profile-pic`} src={im}></img>
        )} */}
        <img className={`profile-pic`}></img>
      </div>
      <Rating onClick={handleRating} ratingValue={ratingValue} size={20} />
      <textarea
        className="comment-input"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <div className="send-btn-container">
        {/* <div className="profile-pic" /> */}

        <button className="btn btn-primary hotel-roomc" onClick={clickHandler}>
          {buttonValue}
        </button>
      </div>
    </div>
  );
};

export default AddComment;
