import { csrfFetch } from "./csrf";

const LOGIN = "session/LOGIN";
const LOGOUT = "session/LOGOUT";

const logIntoState = (user) => {
  return {
    type: LOGIN,
    user,
  };
};

const logOutOfState = () => {
  return {
    type: LOGOUT,
  };
};

export const logIn =
  ({ credential, password }) =>
  async (dispatch) => {
    const res = await csrfFetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credential,
        password,
      }),
    });

    if (res.ok) {
      const userResponse = await res.json();
      dispatch(logIntoState(userResponse.user));
      return userResponse.user;
    } else {
      return res.json();
    }
  };

export const logOut = () => async (dispatch) => {
  const res = await csrfFetch("/api/session", {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(logOutOfState());
    return await res.json();
  }
};

const sessionReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.user };
    case LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

export default sessionReducer;
