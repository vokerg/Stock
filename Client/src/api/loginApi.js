export const login = (username, password) => next =>
  fetch(`/auth/login?username=${username}&password=${password}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
  }})
  .then(response => {
    response.json().then(body => next({
      token: response.headers.get('authorization'),
      status: response.status,
      ...body
    }))
  });
