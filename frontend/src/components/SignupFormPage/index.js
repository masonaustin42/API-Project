import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signUp } from "../../store/session";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (password !== passwordConfirm) {
      setErrors({ ...errors, passwordConfirm: "Passwords do not match" });
    } else {
      setErrors({ ...errors, passwordConfirm: null });
    }
  }, [password, passwordConfirm]);

  if (sessionUser) return <Redirect to="/" />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (password === passwordConfirm) {
      return dispatch(
        signUp({
          username,
          firstName,
          lastName,
          email,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p>{errors.username}</p>}
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && <p>{errors.firstName}</p>}
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && <p>{errors.lastName}</p>}
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p>{errors.email}</p>}
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
          <label>
            Confirm Password:
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </label>
          {errors.passwordConfirm && <p>{errors.passwordConfirm}</p>}
          <button>Create Account</button>
        </form>
      </div>
    </>
  );
}

export default SignupFormPage;
