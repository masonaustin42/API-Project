import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import "./ReviewForm.css";

function ReviewFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [stars, setStars] = useState(0);
  const [filledIn, setFilledIn] = useState(0);
  const [description, setDescription] = useState("");

  const changeStars = (e) => {
    setStars(Number(e.target.value));
  };

  const starValues = [1, 2, 3, 4, 5];

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const setClassName = (ele) => {
    let cssClass = "star";
    if (filledIn > 0) {
      if (filledIn >= ele) return (cssClass = cssClass + " selecting");
    }
    if (stars >= ele) return (cssClass = cssClass + " selected");
    return cssClass;
  };

  return (
    <>
      <h2>How was your stay?</h2>
      <div>
        <form onSubmit={onSubmit}>
          <textarea
            placeholder="Leave your review here..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          {stars}
          <div
            className="star-container"
            onMouseLeave={() => {
              setFilledIn(0);
            }}
          >
            {starValues.map((ele) => (
              <input
                key={ele}
                type="radio"
                name="stars"
                value={ele}
                checked={stars === ele}
                onChange={changeStars}
                onMouseEnter={() => {
                  setFilledIn(ele);
                }}
                className={setClassName(ele)}
              />
            ))}
          </div>
          <button>Submit Review</button>
        </form>
      </div>
    </>
  );
}

export default ReviewFormModal;
