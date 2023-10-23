import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import SpotPreview from "./SpotPreview";

function SpotsIndex() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  const spots = Object.values(useSelector((state) => state.spots));

  if (!spots) return null;

  return (
    <div className="spots-index">
      {spots.map((spot) => (
        <SpotPreview key={spot.id} id={spot.id} />
      ))}
    </div>
  );
}

export default SpotsIndex;
