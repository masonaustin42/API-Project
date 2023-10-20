import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { restoreUser } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser());
    setIsLoaded(true);
  }, [dispatch]);

  return (
    isLoaded && (
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    )
  );
}

export default App;