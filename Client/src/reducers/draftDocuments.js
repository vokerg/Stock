import uniqid from 'uniqid';

const draftDocuments = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_DRAFT': {
      let {draftId} = action.payload;
      draftId = draftId ? draftId : uniqid();
      return {...state, [draftId ? draftId : uniqid()]: {...action.payload, draftId}}
    }
    case 'CLEAR_DRAFT': {
      return (({[action.payload.draftId]:deleted, ...rest}) => rest)(state);
    }
    default: return state;
  }
}

export const getDraftsList = state => Object.values(state);
export const getDraft = (state, draftId) => state[draftId];

export default draftDocuments;
