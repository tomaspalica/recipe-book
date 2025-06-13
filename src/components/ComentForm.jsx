import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getGroqChatCompletion } from "../apiFetch/Api";
export const CommentForm = () => {
  const params = useParams();
  console.log(params);
  const [commentList, setCommentList] = useState([]);

  const groqfunc = async (comment) => {
    const completion = await getGroqChatCompletion(comment);
    return completion.choices[0]?.message?.content || "";
  };
  // groqfunc();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const censoredcomment = await groqfunc(e.target.comment.value);
    console.log(censoredcomment);
    if (censoredcomment !== 0) {
      console.log(censoredcomment);

      setCommentList([
        { user: "gość", comment: censoredcomment },
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
