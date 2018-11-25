export default (state, action) => {
  if (action.type === 'AUTHENTICATED') {
    return action.payload;
  }
  return state;
};
