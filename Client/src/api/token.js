export const authorization = () => {
  const authToken = localStorage.getItem('authorization');
  return (authToken) ? {Authorization: authToken} : {}
}
