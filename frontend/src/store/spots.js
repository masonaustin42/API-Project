import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/GET_SPOTS";

const allSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots,
  };
};

export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");

  const data = await res.json();
  dispatch(allSpots(data.Spots));
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
    default:
      return state;
  }
};

export default spotsReducer;
