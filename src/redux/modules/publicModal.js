//action item
const CLOSEMODAL = 'CLOSEMODAL';
const SHOWMODAL = 'SHOWMODAL';

//action creator
export const closeModal = () => {
  return { type: CLOSEMODAL };
};

export const showModal = (payload) => {
  return { type: SHOWMODAL, payload };
};

//initaiState
const initaiState = { isUse: false, title: '', message: '', btnMsg: '', btnFn: '' };

//reducer
const publicModal = (state = initaiState, action) => {
  switch (action.type) {
    case CLOSEMODAL:
      return { ...state, isUse: false };
    case SHOWMODAL:
      const data = action.payload;
      return { ...state, isUse: true, ...action.payload };

    default:
      return state;
  }
};

//export
export default publicModal;
