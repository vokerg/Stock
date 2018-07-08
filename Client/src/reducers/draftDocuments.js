import uniqid from 'uniqid';

const draftDocuments = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_DRAFT': {
      let {draftId} = action.payload;
      return {...state, [draftId ? draftId : uniqid()]: {...action.payload}}
    }
    case 'CLEAR_DRAFT': {
      return (({[action.payload.draftId]:deleted, ...rest}) => rest)(state);
    }
    default: return state;
  }
}

export const getDraftNames = state => Object.keys(state);
export const getDraft = (state, draftId) => state[draftId];

export default draftDocuments;
