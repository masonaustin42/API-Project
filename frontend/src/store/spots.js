import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/GET_SPOTS";
const CREATE_SPOT = "spots/CREATE_SPOT";
const SET_CURRENT_SPOTS = "spots/SET_CURRENT_SPOTS";
const RESET_SPOTS = "spots/RESET_SPOTS";

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

const setCurrentSpots = (spots) => {
  return {
    type: SET_CURRENT_SPOTS,
    spots,
  };
};

export const resetSpots = () => {
  return {
    type: RESET_SPOTS,
  };
};

export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");

  const data = await res.json();
  dispatch(allSpots(data.Spots));
  return res;
};

export const getAllCurrentSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");

  const data = await res.json();
  if (res.ok) dispatch(setCurrentSpots(data.Spots));
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

export const updateSpot = (spot, id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`, {
    method: "PUT",
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addSpot(data));
    return data;
  }
  return res;
};

export const deleteSpot = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(getAllSpots);
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
    case SET_CURRENT_SPOTS:
      const currentSpots = {};
      action.spots.forEach((spot) => {
        currentSpots[spot.id] = spot;
      });
      return currentSpots;
    case CREATE_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    case RESET_SPOTS:
      return {};
    default:
      return state;
  }
};

export default spotsReducer;
