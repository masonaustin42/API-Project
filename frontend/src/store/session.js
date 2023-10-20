import { csrfFetch } from "./csrf";

const LOGIN = "session/LOGIN";
const LOGOUT = "session/LOGOUT";

const setUser = (user) => {
  return {
    type: LOGIN,
    user,
  };
};

const removeUser = () => {
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
      dispatch(setUser(userResponse.user));
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
    dispatch(removeUser());
    return await res.json();
  }
};

export const restoreUser = () => async (dispatch) => {
  const res = await csrfFetch("/api/session");

  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
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
