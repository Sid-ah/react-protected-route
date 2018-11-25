function isAuthenticated (authenticated) {
  return {
    type: 'AUTHENTICATED',
    payload: authenticated,
  };
}

module.exports = {isAuthenticated};
