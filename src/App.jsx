import React from "react";
import { Route, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import Home from "./Home";
import Login from "./Login";
import Protected from "./Protected";
import config from "./config";

import logo from "./logo.svg";
import "./App.css";
import "./CSS/home.css";
import store from "./Utils/store";
import { Provider } from "react-redux";
import ProjectBoard from "./Components/ProjectBoard";
import CreateProject from "./Components/CreateProject";
import CreateIssue from "./Components/CreateIssue";

const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push("/login");
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "", window.location.origin));
  };

  return (
    <Provider store={store}>
      <div className="App">
        <header>
          <Security
            oktaAuth={oktaAuth}
            onAuthRequired={customAuthHandler}
            restoreOriginalUri={restoreOriginalUri}
          >
            <Route path="/" exact component={Home} />
            <SecureRoute path="/projectBoard" component={ProjectBoard} />
            <SecureRoute path="/createProject" component={CreateProject} />
            <SecureRoute path="/createIssue" component={CreateIssue} />
            <div className="center1">
              <Route
                path="/login"
                render={() => (
                  <Login
                    config={{
                      email: "admin@test.com",
                      password: "123456",
                    }}
                  />
                )}
              />
            </div>

            <Route path="/login/callback" component={LoginCallback} />
          </Security>
        </header>
      </div>
    </Provider>
  );
};

export default App;
