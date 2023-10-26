import { csrfFetch } from "./csrf";

const GET_SPOT = "currentSpot/GET_CURRENT_SPOT";
const RESET_SPOT = "currentSpot/RESET_CURRENT_SPOT";

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot,
  };
};

export const resetSpot = () => {
  return {
    type: RESET_SPOT,
  };
};

export const getSpotDetails = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getSpot(data));
  }
  return res;
};

const currentSpotReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SPOT:
      return action.spot;
    case RESET_SPOT:
      return {};
    default:
      return state;
  }
};

export default currentSpotReducer;
