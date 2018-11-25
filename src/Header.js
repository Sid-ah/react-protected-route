/* eslint react/prop-types: 0 */
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {firebaseAuth} from './utils/auth';
import logo from './img/azure-comos-DB.png';

const baseUrl = process.env.PUBLIC_URL;

class Header extends React.Component {
  constructor () {
    super ();
    this.linkToUse = this.linkToUse.bind (this);
    this.handleSignOut = this.handleSignOut.bind (this);
    this.firebaseAuth = firebaseAuth;
  }
  handleSignOut () {
    this.firebaseAuth ().signOut ();
  }
  linkToUse () {
    if (window.location.href.includes ('/protected')) {
      return (
        <button className="login " onClick={() => this.handleSignOut ()}>
          Sign out
        </button>
      );
    }
    if (this.props.authenticated) {
      return (
        <Link className="login" to={`${baseUrl}/protected`}>Dashboard</Link>
      );
    }
    return <Link className="login" to={`${baseUrl}/login`}>Login</Link>;
  }

  render () {
    const LinkToUse = this.linkToUse;
    return (
      <header>
        <div className="header-div">
          <img alt="logo" className="logo" src={logo} />
          <h1 className="cosmos-name">Cosmos DB</h1>
        </div>
        <LinkToUse />
      </header>
    );
  }
}
const mapStateToProps = state => ({
  authenticated: state.authenticated,
});
export default connect (mapStateToProps, {}) (Header);
