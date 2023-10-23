import { useEffect, useState } from "react";
import { csrfFetch } from "../../../store/csrf";

function SpotReviews({ id }) {
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
    <div>
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
  );
}

export default SpotReviews;
