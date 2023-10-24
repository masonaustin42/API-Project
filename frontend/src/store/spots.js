import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/GET_SPOTS";
const CREATE_SPOT = "spots/CREATE_SPOT";

const allSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots,
  };
};

const addSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot,
  };
};

export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");

  const data = await res.json();
  dispatch(allSpots(data.Spots));
  return res;
};

export const createSpot = (spot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addSpot(data));
    return data;
  }
  return res;
};

const spotsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_SPOTS:
      const spots = {};
      action.spots.forEach((spot) => {
        spots[spot.id] = spot;
      });
      return (newState.spots = spots);
    case CREATE_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    default:
      return state;
  }
};

export default spotsReducer;
