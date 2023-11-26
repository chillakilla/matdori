//action item
const CLOSEMODAL = 'CLOSEMODAL';
const SHOWMODAL = 'SHOWMODAL';

//action creator
export const closePublicModal = () => {
  return { type: CLOSEMODAL };
};

export const showModal = (payload) => {
  return { type: SHOWMODAL, payload };
};

//initaiState
const initaiState = { isUse: false, title: '제목', message: '메세지', btnMsg: '', btnFn: '', btnMsg2: '', btnFn2: '' };

//reducer
const publicModal = (state = initaiState, action) => {
  switch (action.type) {
    case CLOSEMODAL:
      return { ...state, isUse: false };

    case SHOWMODAL:
      console.log('reducer', action.payload);
      //const data = action.payload;
      return { ...action.payload };

    default:
      return state;
  }
};

//export
export default publicModal;
