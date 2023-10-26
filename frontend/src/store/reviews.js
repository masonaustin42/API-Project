import { csrfFetch } from "./csrf";

const SET_REVIEWS = "reviews/SET_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";

const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    reviews,
  };
};

const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
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

export const createSpotReview = (id, review, user) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const data = await res.json();
    data.User = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    dispatch(addReview(data));
  }
  return res;
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

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
    case ADD_REVIEW:
      return { ...state, [action.review.id]: action.review };
    default:
      return state;
  }
};

export default reviewsReducer;
