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
  }, [reviews]);

  return (
    <>
      <p>
        <span>
          <i className="fa-solid fa-star"></i>
          {"  "}
          {avgRating !== null ? " · " + Number(avgRating).toFixed(1) : "new"}
          {numReviews}
        </span>
      </p>
      {reviewButton && (
        <OpenModalButton
          buttonText="Post Your Review"
          modalComponent={<ReviewFormModal />}
        />
      )}
      <div className="reviews">
        {!reviews.length && <p>Be the first to post a review!</p>}
        {reviews.toReversed().map((review) => {
          return (
            <div key={review.id}>
              <h3>
                {review?.User.firstName} {review?.User.lastName}
              </h3>
              <h4>{review.createdAt}</h4>
              <span>
                <i className="fa-solid fa-star"></i> {review.stars}
              </span>
              <p>{review.review}</p>
              {user?.id === review.User.id && (
                <OpenModalButton
                  buttonText="Delete Review"
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
