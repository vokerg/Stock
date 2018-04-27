export const login = (username, password) => next =>
  fetch(`/auth/login?username=${username}&password=${password}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
    .then(response => next(response.headers.get('authorization')));
