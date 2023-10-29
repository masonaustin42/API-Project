import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/session";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    if (credential.length < 4 || password.length < 6) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [credential, password]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(logIn({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <>
      <h2>Log In</h2>
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <div className="error-container">
            {<p className="err">{errors.credential || " "}</p>}
          </div>

          <label>
            Username or Email:
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
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
          <button disabled={buttonDisabled} className="submit-button">
            Log In
          </button>

          <button
            className="demo-user-button"
            onClick={(e) => {
              e.preventDefault();
              return dispatch(
                logIn({ credential: "Demo-lition", password: "password" })
              ).then(closeModal);
            }}
          >
            Log in as Demo User
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
