import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { deleteReview, getSpotReviews } from "../../store/reviews";

function ConfirmDeleteReviewModal({ reviewId, spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});

  const confirmDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteReview(reviewId))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    return dispatch(getSpotReviews(spotId));
  };

  const confirmKeep = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to remove this review?</h3>
      <div className="error-container">
        {Object.values(errors).length
          ? Object.values(errors).map((err) => <p className="err">{err}</p>)
          : null}
      </div>
      <div>
        <button onClick={confirmDelete} className="confirm">
          Yes (Remove Review)
        </button>
        <button onClick={confirmKeep} className="no-confirm">
          No (Keep Review)
        </button>
      </div>
    </>
  );
}

export default ConfirmDeleteReviewModal;
