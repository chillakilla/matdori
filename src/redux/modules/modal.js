//1.action item
const OPEN_MODAL = 'OPEN_MODAL';

//2.action creator
export const open_modal = (payload) => {
  return { type: OPEN_MODAL, payload };
};

//3. initialState
const initialState = false;

//4. reducer
const modal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return (state = action.payload);

    default:
      return state;
  }
};

//5. reducer export
export default modal;
