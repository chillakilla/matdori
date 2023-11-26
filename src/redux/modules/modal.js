//1.action item
const OPENINPUTMODAL = 'OPENINPUTMODAL';
const CLOSEINPUTMODAL = 'CLOSEINPUTMODAL';
//2.action creator
export const closeInputModal = () => {
  return { type: CLOSEINPUTMODAL };
};

export const openInputmodal = () => {
  return { type: OPENINPUTMODAL };
};

//3. initialState
const initialState = { isUseInput: false };

//4. reducer
const modal = (state = initialState, action) => {
  switch (action.type) {
    case CLOSEINPUTMODAL:
      return { ...state, isUseInput: false };

    case OPENINPUTMODAL:
      return { ...state, isUseInput: true };

    default:
      return state;
  }
};

//5. reducer export
export default modal;
