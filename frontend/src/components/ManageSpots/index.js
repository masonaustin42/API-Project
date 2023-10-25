import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCurrentSpots } from "../../store/currentUserSpots.js";
import SpotPreview from "../SpotsIndex/SpotPreview.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import { resetSpot } from "../../store/currentSpot";

function ManageSpots() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userSpots = Object.values(useSelector((state) => state.currentSpots));

  useEffect(() => {
    dispatch(getAllCurrentSpots());
    dispatch(resetSpot());
  }, [dispatch]);

  if (!userSpots) return null;

  return (
    <>
      <h1>Manage Your Spots</h1>
      <div className="spots-index">
        {userSpots.map((spot) => (
          <div>
            <SpotPreview key={spot.id} id={spot.id} />
            <button
              onClick={() => {
                history.push(`/spots/${spot.id}/update`);
              }}
            >
              Update Spot
            </button>
            <button>Delete Spot</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default ManageSpots;
