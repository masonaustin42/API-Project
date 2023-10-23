import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SpotPreview({ id }) {
  const spot = useSelector((state) => state.spots[id]);
  const history = useHistory();

  const redirect = () => {
    history.push(`/spots/${id}`);
  };

  if (!spot) return null;

  return (
    <div className="spot" onClick={redirect}>
      <img src={spot.previewImage} alt={`${spot.name} preview`} />
      <span>
        {spot.city}, {spot.state}
      </span>
      <span>
        <i className="fa-solid fa-star"></i>{" "}
        {spot.avgRating !== null ? Number(spot.avgRating).toFixed(1) : "new"}
      </span>
      <span>${spot.price} night</span>
    </div>
  );
}

export default SpotPreview;
