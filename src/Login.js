/* eslint react/prop-types: 0 */
import React from 'react';
import {connect} from 'react-redux';
import {firebaseAuth} from './utils/auth';
import {isAuthenticated} from './actions/index';

const baseUrl = process.env.PUBLIC_URL;

class Login extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleLogin = this.handleLogin.bind (this);
    this.authStateChanged = this.authStateChanged.bind (this);
  }
  componentDidMount () {
    this.removeListener = firebaseAuth ().onAuthStateChanged (
      this.authStateChanged
    );
  }
  authStateChanged (user) {
    if (user) {
      const {uid} = firebaseAuth ().currentUser;
      console.log(uid)
      if (uid) {
        console.log('about to set isAuthenticated to true')
        this.props.isAuthenticated ({authenticated: true});
      } else {
        firebaseAuth ().signOut ();
        this.props.isAuthenticated ({authenticated: false});
     }
    } else {
      firebaseAuth ().signOut ();
      this.props.isAuthenticated ({authenticated: false});
    }
  }
  handleLogin () {
    const {email, password} = this.state;
    this.setState ({logging_in: true, login_error: null});
    firebaseAuth ()
      .signInWithEmailAndPassword (email, password)
      .then (() => this.props.history.push (`${baseUrl}/protected`))
      .catch (err => {
        alert (`error logging in: ${err}`);
        this.setState ({
          logging_in: false,
          login_error: 'Incorrect email or password',
        });
      });
  }

  render () {
    return (
      <div className="landing">
        <h1>let's store data!</h1>
        <input
          className="custom-input"
          type="text"
          onChange={e => this.setState ({email: e.target.value})}
          placeholder="email"
        />
        <br /><br />
        <input
          className="custom-input"
          type="password"
          onChange={e => this.setState ({password: e.target.value})}
          placeholder="password"
        />
        <br /><br />
        <button className="login" onClick={this.handleLogin}>Log in</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

export default connect (mapStateToProps, {isAuthenticated}) (Login);
// export default Login;
