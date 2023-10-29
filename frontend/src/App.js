import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { restoreUser } from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/SpotsIndex";
import SpotDetails from "./components/SpotDetails";
import CreateSpot from "./components/CreateSpot";
import ManageSpots from "./components/ManageSpots";
import ReviewFormModal from "./components/ReviewFormModal";
import NotFound from "./components/NotFound";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser());
    setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SpotsIndex />
          </Route>
          <Route exact path="/spots/new">
            <CreateSpot />
          </Route>
          <Route exact path="/spots/current">
            <ManageSpots />
          </Route>
          <Route exact path="/spots/:id">
            <SpotDetails />
          </Route>
          <Route exact path="/spots/:id/update">
            <CreateSpot />
          </Route>
          <Route exact path="/page-not-found">
            <NotFound />
          </Route>
          <Route>
            <Redirect to="/page-not-found" />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
