import { csrfFetch } from "./csrf";

const GET_SPOTS = "currentSpots/GET_SPOTS";
const SET_CURRENT_SPOT = "currentSpots/SET_CURRENT_SPOT";

const allSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots,
  };
};

export const setCurrentSpot = (spot) => {
  return {
    type: SET_CURRENT_SPOT,
    spot,
  };
};

export const getAllCurrentSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");

  const data = await res.json();
  if (res.ok) dispatch(allSpots(data.Spots));
  return res;
};

const currentSpotsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SPOTS:
      const spots = {};
      action.spots.forEach((spot) => {
        spots[spot.id] = spot;
      });
      return spots;
    case SET_CURRENT_SPOT:
      return { ...state, currentSpot: action.spot };
    default:
      return state;
  }
};

export default currentSpotsReducer;
