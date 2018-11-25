import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {ref, firebaseAuth} from './utils/auth';
import Login from './Login';
import Landing from './Landing';
import Protected from './Protected';
import {isAuthenticated} from './actions/index';

const fourOhFour = () => <h1>404</h1>;
const baseUrl = process.env.PUBLIC_URL;

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {authenticated: false};
    this.privateRoute = this.privateRoute.bind (this);
    this.authStateChanged = this.authStateChanged.bind (this);
    this.loginRoute = this.loginRoute.bind (this);
  }
  componentDidMount () {
    this.removeListener = firebaseAuth ().onAuthStateChanged (
      this.authStateChanged
    );
  }
  authStateChanged (user) {
    if (user) {
      const {uid} = firebaseAuth ().currentUser;
      ref.child (`users/${uid}`).once ('value').then (snap => {
        const userObj = snap.val ();
        if (!userObj || !userObj.can_refer) {
          firebaseAuth ().signOut ();
          this.props.isAuthenticated ({authenticated: false});
        } else {
          console.log (`inside here `);
          this.props.isAuthenticated ({authenticated: true});
        }
      });
    } else {
      firebaseAuth ().signOut ();
      this.props.isAuthenticated ({authenticated: false});
    }
  }
  privateRoute({component: Component, ...rest}) {
    return (
      <Route
        {...rest}
        render={props =>
          this.props.authenticated === true
            ? <Component {...props} />
            : <Redirect to={`${baseUrl}/login`} />}
      />
    );
  }
  loginRoute({component: Component, ...rest}) {
    console.log (`this.state.authenticated ${this.state.authenticated}`);
    return (
      <Route
        {...rest}
        render={props =>
          this.props.authenticated === true
            ? <Redirect to={`${baseUrl}/protected`} />
            : <Component {...props} />}
      />
    );
  }
  render () {
    const PrivateRoute = this.privateRoute;
    const LoginRoute = this.loginRoute;
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <PrivateRoute path={`${baseUrl}/protected`} component={Protected} />
            <LoginRoute path={`${baseUrl}/login`} component={Login} />
            <Route exact path={`${baseUrl}/`} component={Landing} />
            <Route component={fourOhFour} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

export default connect (mapStateToProps, {isAuthenticated}) (App);
