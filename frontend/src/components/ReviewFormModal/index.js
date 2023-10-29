import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import "./ReviewForm.css";
import { createSpotReview } from "../../store/reviews";

function ReviewFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);
  const currentSpot = useSelector((state) => state.currentSpot);
  const [stars, setStars] = useState(0);
  const [filledIn, setFilledIn] = useState(0);
  const [description, setDescription] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (description.length < 10 || stars < 1) setDisableSubmit(true);
    else setDisableSubmit(false);
  }, [stars, description]);

  const changeStars = (e) => {
    setStars(Number(e.target.value));
    setFilledIn(0);
    setClassName(e.target.value);
  };

  const starValues = [1, 2, 3, 4, 5];

  const onSubmit = async (e) => {
    e.preventDefault();
    return dispatch(
      createSpotReview(
        currentSpot.id,
        {
          review: description,
          stars,
        },
        user
      )
    )
      .then(closeModal)
      .catch(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      });
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
      <div className="error-container">
        {Object.values(errors).length
          ? Object.values(errors).map((err) => <p className="err">{err}</p>)
          : null}
      </div>
      <form onSubmit={onSubmit}>
        <textarea
          placeholder="Leave your review here..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
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
        <button disabled={disableSubmit} className="submit-button">
          Submit Review
        </button>
      </form>
    </>
  );
}

export default ReviewFormModal;
