/* eslint "class-methods-use-this": [2, { "exceptMethods": ["handleRequest", "fetchDisbursements", "historyTable", "getDecodedToken", "getHeaders"]}] */
/* eslint-env es6 */
/*eslint class-methods-use-this: ["error", { "exceptMethods": ["render", "componentDidMount"] }] */
import React from 'react';
import { firebaseAuth } from './utils/auth';
import Header from './Header';

class Protected extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
    }
  }
  componentDidMount () {
    const {uid} = firebaseAuth ().currentUser;
  }

  render () {
    return (
      <div className="protected-app">
        <Header />
        <p>Hello new tab</p>
      </div>
    )
  }
}

export default Protected;
