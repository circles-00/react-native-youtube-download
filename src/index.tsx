import React, { useEffect } from "react";
import Navigation from "./navigation";
import { useDispatch, useSelector } from "react-redux";
import { LoginScreen } from "./screens";
import {
  authWithAccessToken
} from "./services/actions/auth/authActions";
import { IRootReducerState } from "./interfaces/state/IRootReducerState.interface";
import LoadingSpinner from "./components/LoadingSpinner";
import useAudioHandler from "./services/music_player/AudioStateHandler";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector<IRootReducerState>(
    state => state.auth.isAuthenticated
  );

  const showSpinner = useSelector<IRootReducerState, boolean>(
    state => state.feedback.showSpinner
  );

  useEffect(() => {
    dispatch(authWithAccessToken());
  }, [dispatch]);

  useAudioHandler();

  return (
    <React.Fragment>
      {/*{MusicStateHandler()}*/}
      <LoadingSpinner show={showSpinner} />
      {isAuthenticated ? <Navigation /> : <LoginScreen />}
    </React.Fragment>
  );
};

export default App;
