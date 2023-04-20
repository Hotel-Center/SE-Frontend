import { useState } from "react";

import "./Styles/Comment.scss";
import DeleteModal from "./DeleteModal";
import CommentHeader from "./CommentHeader";
import CommentFooter from "./CommentFooter";
import axios from "axios";
import { cookies, makeURL } from "../../../Utils/common";

import Rating from "@mui/material/Rating";

const Comment = ({
  setc,
  setc1,
  c,
  c1,
  commentData,
  rate,
  time,
  first,
  last,
  avatar,
  hotelid,
  comId,
  commentDelete,
  setDeleteModalState,
  writer,
}) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData);
  const [deleting, setDeleting] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const handleRating = (rate) => {
    setRatingValue(rate);
  };

  // console.log(avatar);
  const updateComment = () => {
    axios
      .put(
        makeURL("/hotel/" + hotelid + "/" + "comments/" + comId + "/"),
        {
          rate: ratingValue / 20,
          text: content,
        },
        {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        }
      )
      .then((response) => {
        console.log(response, "commnet changed");

        // setc1(c1.filter((e) => e.id !== comId));
        // setc(c.filter((e) => e.id !== comId));

        const index = c1.findIndex((object) => {
          return object.id === comId;
        });

        if (index !== -1) {
          c1[index].text = content;
          c1[index].rate = ratingValue;
        }
      })
      .catch((error) => {
        console.log(error, "comment change error");
      });

    //   editComment(content, commentData.id, "comment");
    setEditing(false);
  };

  const deleteComment = (id, type) => {
    const finalType = type !== undefined ? type : "comment";
    const finalId = id !== undefined ? id : commentData.id;
    commentDelete(finalId, finalType, commentData.id);
    setDeleting(false);
  };

  return (
    <div className={`comment-container ${""}`}>
      <div className="comment">
        <div className="comment--body">
          <CommentHeader
            commentData={commentData}
            rate={rate}
            time={time}
            first={first}
            last={last}
            avatar={avatar}
            setDeleting={setDeleting}
            setDeleteModalState={setDeleteModalState}
            setEditing={setEditing}
            writer={writer}
          />

          {/* <div className="comment-content">{commentData}</div> */}

          {!editing ? (
            <div className="comment-content">{commentData}</div>
          ) : (
            <div>
              <div className="col">
                <div className="row">
                  <Rating
                    onClick={handleRating}
                    ratingValue={ratingValue}
                    size={20}
                  />
                </div>
                <div className="row">
                  <textarea
                    className="content-edit-box"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {editing && (
            <button className="update-btn" onClick={updateComment}>
              update
            </button>
          )}
        </div>
        <CommentFooter
          commentData={commentData}
          time={time}
          setDeleting={setDeleting}
          setDeleteModalState={setDeleteModalState}
          // setEditing={setEditing}
        />
      </div>

      {deleting && (
        <DeleteModal
          setc={setc}
          setc1={setc1}
          c={c}
          c1={c1}
          hotelid={hotelid}
          comId={comId}
          setDeleting={setDeleting}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />
      )}
    </div>
  );
};

export default Comment;
