import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./SpotPreview.css";

function SpotPreview({ id }) {
  const spot = useSelector((state) => state.spots[id]);
  const history = useHistory();

  const redirect = () => {
    history.push(`/spots/${id}`);
  };

  if (!spot) return null;

  return (
    <div className="spot" onClick={redirect} title={spot.name}>
      <img src={spot.previewImage} alt={`${spot.name} preview`} />
      <div>
        <span className="location">
          {spot.city}, {spot.state}
        </span>
        <span className="rating">
          <i className="fa-solid fa-star"></i>{" "}
          {spot.avgRating !== null ? Number(spot.avgRating).toFixed(1) : "new"}
        </span>
        <span className="price">${spot.price} night</span>
      </div>
    </div>
  );
}

export default SpotPreview;
