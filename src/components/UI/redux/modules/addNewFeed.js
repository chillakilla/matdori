//1.action iems
const ADD_FEED = 'ADD_FEED';
const STORED_FEED = 'STORED_FEED';

//2.action creator
export const add_feed = (payload) => {
  return { type: ADD_FEED, payload };
};

export const stored_feed = (payload) => {
  return { type: STORED_FEED, payload };
};

//3. initialState
const initialState = [
  { email: 'test', content: '내용', store: 'CU', date: new Date(), title: '제목', image_url: 'url주소' },
  { email: 'test22', content: '내용22', store: 'GS', date: new Date(), title: '제목22', image_url: 'url주소22' }
];

//4.reducer
const addNewFeed = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FEED:
      const addFeed = action.payload;
      return [addFeed, ...state];

    case STORED_FEED:
      const storedFeed = action.payload;
      return [...storedFeed, ...state];

    default:
      return state;
  }
};

//5.reducer를 export
export default addNewFeed;
