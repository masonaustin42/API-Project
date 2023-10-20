import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logIn } from "../../store/session";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(logIn({ credential, password })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <>
      <h2>Log In</h2>
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <label>
            Username or Email:
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          {errors.credential && <p>{errors.credential}</p>}
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p>{errors.password}</p>}
          <button>Log In</button>
        </form>
      </div>
    </>
  );
}

export default LoginFormPage;
