import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import SpotReviews from "./SpotReviews";
import "./SpotDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetails } from "../../store/currentSpot";

function SpotDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.currentSpot);

  useEffect(() => {
    dispatch(getSpotDetails(id));
  }, [dispatch]);

  if (!Object.values(spot).length) return null;

  let numReviews;
  if (spot.numReviews === 1) {
    numReviews = "1 review";
  } else if (spot.numReviews > 1) {
    numReviews = `${spot.numReviews} reviews`;
  } else {
    numReviews = null;
  }

  let previewImg = {};
  if (spot.SpotImages) previewImg = spot.SpotImages.find((img) => img.preview);

  return (
    <>
      <div className="spot-name">
        <h1>{spot.name}</h1>
        <h2>
          {spot.city}, {spot.state}, {spot.country}
        </h2>
      </div>
      <div className="spot-images">
        <div className="img-preview">
          <img src={previewImg?.url ? previewImg.url : null} alt={spot.name} />
        </div>
        <div className="img-small">
          {spot.SpotImages.map(
            (img) =>
              !img.preview && <img key={img.id} src={img.url} alt={spot.name} />
          )}
        </div>
      </div>
      <div className="spot-details">
        <h2>
          Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
        </h2>
        <p>{spot.description}</p>
        <div className="reserve-panel">
          <span>${spot.price}</span>
          <span>
            <i className="fa-solid fa-star"></i>
            {"  "}
            {spot.avgRating !== null
              ? " · " + Number(spot.avgRating).toFixed(1)
              : "new"}
            {}
            {numReviews}
          </span>
          <button
            onClick={() => {
              window.alert("Feature coming soon!");
            }}
          >
            Reserve
          </button>
        </div>
      </div>
      <SpotReviews id={id} avgRating={spot.avgRating} numReviews={numReviews} />
    </>
  );
}

export default SpotDetails;
