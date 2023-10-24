import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { csrfFetch } from "../../store/csrf";
import SpotReviews from "./SpotReviews";

function SpotDetails() {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);

  useEffect(() => {
    (async () => {
      const spotDetails = await csrfFetch(`/api/spots/${id}`);
      if (spotDetails.ok) {
        const data = await spotDetails.json();
        setSpot({ ...data });
      }
    })();
  }, [id]);

  if (!spot) return null;

  let numReviews;
  if (spot.numReviews === 1) {
    numReviews = "1 review";
  } else if (spot.numReviews > 1) {
    numReviews = `${spot.numReviews} reviews`;
  } else {
    numReviews = null;
  }

  return (
    <>
      <h1>{spot.name}</h1>
      <h2>
        {spot.city}, {spot.state}, {spot.country}
      </h2>
      <div>
        {spot.SpotImages.map((img) => (
          <img
            key={img.url}
            src={img.url}
            alt={spot.name}
            className={img.preview ? "img-main" : "img"}
          />
        ))}
      </div>
      <div>
        <h2>
          Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
        </h2>
        <p>{spot.description}</p>
        <div>
          <span>${spot.price}</span>
          <span>
            <i className="fa-solid fa-star"></i>{" "}
            {spot.avgRating !== null
              ? Number(spot.avgRating).toFixed(1)
              : "new"}{" "}
            {numReviews}
          </span>
          <button>Reserve</button>
        </div>
      </div>
      <SpotReviews id={id} />
    </>
  );
}

export default SpotDetails;
