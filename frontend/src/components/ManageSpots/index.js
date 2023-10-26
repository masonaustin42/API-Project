import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCurrentSpots, resetSpots } from "../../store/spots.js";
import SpotPreview from "../SpotsIndex/SpotPreview.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import { resetSpot } from "../../store/currentSpot";
import OpenModalButton from "../OpenModalButton/index.js";
import ConfirmDeleteModal from "../ConfirmDeleteModal/index.js";

function ManageSpots() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userSpots = Object.values(useSelector((state) => state.spots));

  useEffect(() => {
    dispatch(resetSpots());
    dispatch(getAllCurrentSpots());
    dispatch(resetSpot());
  }, [dispatch]);

  if (!userSpots) return null;

  return (
    <>
      <h1>Manage Your Spots</h1>
      <div className="spots-index">
        {userSpots.map((spot) => (
          <div key={spot.id}>
            <SpotPreview key={spot.id} id={spot.id} />
            <button
              onClick={() => {
                history.push(`/spots/${spot.id}/update`);
              }}
            >
              Update Spot
            </button>
            <OpenModalButton
              buttonText="Delete Spot"
              modalComponent={<ConfirmDeleteModal id={spot.id} />}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default ManageSpots;
