import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Contact from './Contact';
import Feed from './Feed';
import About from './About';
import Callback from './Callback/Callback';
import Auth from '../Auth/Auth';
import history from '../history';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route
          path="/"
          render={props => <App auth={auth} {...props} />} />
        <Route
          path="/feed"
          render={ props => <Feed auth={auth} {...props} /> }
        />
        <Route
          path="/contact"
          render={ props => <Contact auth={auth} {...props} /> }
        />
        <Route
          path="/about"
          render={ props => <About auth={auth} {...props} /> }
        />
        <Route
          path="/callback"
          render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
    </Router>
  );
}
