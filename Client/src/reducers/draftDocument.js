import uniqid from 'uniqid';

const draftDocument = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_DRAFT': {
      let {draftDocumentId} = action.payload;
      return {...state, [draftDocumentId ? draftDocumentId : uniqid()]: {...action.payload}}
    }

    case 'CLEAR_DRAFT': {
      return state.filter((draft, id) => !(id === action.payload.draftDocumentId));
    }

    default: return state;
  }
}

export const getDraftNames = state => Object.keys(state);

export default draftDocument;
