import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from "../../../store/reviews";
import OpenModalButton from "../../OpenModalButton";
import ReviewFormModal from "../../ReviewFormModal";
import ConfirmDeleteReviewModal from "../../ConfirmDeleteReviewModal";

function SpotReviews({ id, avgRating, numReviews, ownerId, spotId }) {
  const dispatch = useDispatch();
  const reviews = Object.values(useSelector((state) => state.reviews));
  const user = useSelector((state) => state.session.user);
  const [reviewButton, setReviewButton] = useState(false);
  const [isNoReviews, setIsNoReviews] = useState(false);

  useEffect(() => {
    dispatch(getSpotReviews(id));
  }, [dispatch]);

  useEffect(() => {
    if (
      user &&
      user?.id != ownerId &&
      !reviews.find((review) => review.userId === user?.id)
    ) {
      setReviewButton(true);
    } else {
      setReviewButton(false);
    }

    if (!reviews.length && user?.id !== ownerId) {
      setIsNoReviews(true);
    } else {
      setIsNoReviews(false);
    }
  }, [reviews]);

  return (
    <>
      <p id="avg-rating">
        <span>
          <i className="fa-solid fa-star"></i>
          {"  "}
          {avgRating !== null ? Number(avgRating).toFixed(1) : "new"}
          {numReviews}
        </span>
      </p>
      {reviewButton && (
        <OpenModalButton
          cssClass="review-button"
          buttonText="Post Your Review"
          modalComponent={<ReviewFormModal />}
        />
      )}
      <div className="reviews">
        {isNoReviews && <p>Be the first to post a review!</p>}
        {reviews.toReversed().map((review) => {
          const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          const date = new Date(review.createdAt);
          return (
            <div key={review.id} className="review-div">
              <h3>{review?.User.firstName}</h3>
              <h4>
                {months[date.getMonth()]} {date.getFullYear()}
              </h4>
              <p>{review.review}</p>
              {user?.id === review.User.id && (
                <OpenModalButton
                  buttonText="Delete Review"
                  cssClass="gray-button"
                  modalComponent={
                    <ConfirmDeleteReviewModal
                      spotId={spotId}
                      reviewId={review.id}
                    />
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SpotReviews;
