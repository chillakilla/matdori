//1.action item
const CURRENTEMAIL = 'CURRENTEMAIL';

//2.action creator
export const current_Email = (payload) => {
  return { type: CURRENTEMAIL, payload };
};
//3. initialState
const initialState = '';

//4. reducer
const currentEmail = (state = initialState, action) => {
  switch (action.type) {
    case CURRENTEMAIL:
      return (state = action.payload);

    default:
      return state;
  }
};

//5.export reducer
export default currentEmail;
