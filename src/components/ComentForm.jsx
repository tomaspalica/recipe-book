import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { moderateComment } from "../apiFetch/Api";
export const CommentForm = () => {
  const params = useParams();
  console.log(params);
  const [commentList, setCommentList] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.comment.value.trim().length !== 0) {
      console.log(e.target.comment.value);
      const { allowed, reason } = moderateComment(e.target.comment.value);
      console.log(allowed);
      setCommentList([
        { user: "gość", comment: e.target.comment.value },
        ...commentList,
      ]);
      console.log(commentList);
    } else {
      console.log("type in a comment");
    }

    e.target.comment.value = "";
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="comment" />
        <button>comment</button>
      </form>

      <ul className="comment-list">
        {commentList.map((el, index) => {
          console.log(el);
          return (
            <li className="comment-list-element" key={index}>
              <h4>{el.user}</h4>
              <p>{el.comment}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};
