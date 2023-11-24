//1.action iems
const ADD_FEED = 'ADD_FEED';

//2.action creator
export const add_feed = (payload) => {
  return { type: ADD_FEED, payload };
};

const initialState = [];

//action types
const SET_FEEDS = 'feeds/SET_FEEDS';

//action creators
export const setFeeds = (payload) => {
  return { type: SET_FEEDS, payload };
};

// 리듀서
const feeds = (state = initialState, action) => {
  switch (action.type) {
    case SET_FEEDS:
      return [...action.payload];

    case ADD_FEED:
      const addFeed = action.payload;
      return [addFeed, ...state];

    default:
      return state;
  }
};

export default feeds;
