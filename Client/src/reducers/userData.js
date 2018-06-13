const userData = (state={
  authorization: null,
  user: null
}, action) => {
  switch(action.type) {
    case 'LOGIN': return {...action.payload};
    case 'LOGOUT': return {authorization: null, user: null};
    default: return state;
  }
}

export const getCurrentUser = state => state.user;
export const getAuthorizationToken = state => state.authorization;

export default userData;
