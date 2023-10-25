import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/session";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

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
          {errors.credential && <p className="err">{errors.credential}</p>}
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
          <button>Log In</button>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
