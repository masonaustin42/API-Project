import { csrfFetch } from "./csrf";

const SET_REVIEWS = "spots/SET_REVIEWS";

const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    reviews,
  };
};

export const getSpotReviews = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(setReviews(reviews.Reviews));
  }
  return res;
};

const reviewsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_REVIEWS:
      const reviews = {};
      action.reviews.forEach((review) => {
        reviews[review.id] = review;
      });
      return (newState.reviews = reviews);
    default:
      return state;
  }
};

export default reviewsReducer;
