export const stateLogin = (authorization, user) => ({
  type: 'LOGIN',
  payload: {
    authorization,
    user
  }
});

export const stateLogout = () => ({
  type: 'LOGOUT'
})
