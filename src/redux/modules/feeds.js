const initialState = [];

//action types
const SET_FEED = 'feeds/SET_FEED';

//action creators
export const setFeed = (payload) => {
  return { type: SET_FEED, payload };
};

// 리듀서
const feeds = (state = initialState, action) => {
  switch (action.type) {
    case SET_FEED:
      return [...action.payload];

    default:
      return state;
  }
};

export default feeds;
