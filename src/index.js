import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from './reducer/rootReducer';
import { BrowserRouter as Router} from "react-router-dom";

import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from 'firebase';
import 'firebase/auth';
// import 'firebase/firestore';
import * as config from './config/fbConfig';

// Initialize Firebase instance
firebase.initializeApp(config.fbConfig)

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider
        firebase={firebase}
        config={config.rfConfig}
        dispatch={store.dispatch}>
      <Router>
        <App />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

