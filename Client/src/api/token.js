import { getCurrentState } from '../storeProvider';
import { getAuthorizationToken } from '../reducers';

export const authorization = () => {
  const authToken = getAuthorizationToken(getCurrentState());
  return (authToken) ? {Authorization: authToken} : {}
}
