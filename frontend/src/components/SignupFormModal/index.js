import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    if (password !== passwordConfirm) {
      setErrors({ ...errors, passwordConfirm: "Passwords do not match" });
    } else {
      setErrors({ ...errors, passwordConfirm: null });
    }
  }, [password, passwordConfirm]);

  useEffect(() => {
    if (
      username.length < 4 ||
      !firstName.length ||
      !lastName.length ||
      !email.length ||
      password.length < 6 ||
      !passwordConfirm.length ||
      passwordConfirm !== password
    ) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  });

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
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <div className="error-container">
        {<p className="err">{errors.username || " "}</p>}
        {<p className="err">{errors.firstName || " "}</p>}
        {<p className="err">{errors.lastName || " "}</p>}
        {<p className="err">{errors.email || " "}</p>}
        {<p className="err">{errors.password}</p>}
        {<p className="err">{errors.passwordConfirm || " "}</p>}
      </div>
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
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </label>
          <button disabled={submitDisabled} className="submit-button">
            Create Account
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
