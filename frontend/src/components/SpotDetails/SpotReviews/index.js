import { useEffect, useState } from "react";
import { csrfFetch } from "../../../store/csrf";

function SpotReviews({ id, avgRating, numReviews }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      const allReviews = await csrfFetch(`/api/spots/${id}/reviews`);
      if (allReviews.ok) {
        const data = await allReviews.json();
        setReviews(data.Reviews);
      }
    })();
  }, [id]);

  if (!reviews) return null;

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
      <div className="reviews">
        {reviews.toReversed().map((review) => (
          <div key={review.id}>
            <h3>
              {review.User.firstName} {review.User.lastName}
            </h3>
            <h4>{review.createdAt}</h4>
            <span>
              <i className="fa-solid fa-star"></i> {review.stars}
            </span>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default SpotReviews;
