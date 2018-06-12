import { combineReducers } from 'redux';

const authenticatedData = (state={
  authorization: '',
  user: {
    id:'',
    username:'',
    viewstocks:[],
    admin:false,
    productCreator:false
  }
}, action) => {
  switch(action.type) {
    case 'LOAD_FROM_LOCAL_STORAGE': return {...action.payload}
    default: return state;
  };
}


export default combineReducers({authenticatedData});
