import { csrfFetch } from "./csrf";

const SET_SPOT = "spots/SET_SPOT";

const setSpotDetails = (spot) => {
  return {
    type: SET_SPOT,
    spot,
  };
};

export const getSpotDetails = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`);

  if (res.ok) {
    const data = await res.json();
    console.log("🚀 ~ getSpotDetails ~ data:", data);
    dispatch(setSpotDetails(data));
  }
  return res;
};

const spotDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SPOT:
      return action.spot;
    default:
      return state;
  }
};

export default spotDetailsReducer;
