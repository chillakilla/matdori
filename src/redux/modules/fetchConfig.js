const initialState = { field: 'CVS', compare: '!=', value: '임시' };

//action types
const GET_ALL = 'fetch/GET_ALL';
const GET_GS = 'fetch/GET_GS';
const GET_CU = 'fetch/GET_CU';
const GET_SEVEN = 'fetch/GET_SEVEN';
const GET_EMART = 'fetch/GET_EMART';
const GET_BY_USER = 'fetch/GET_BY_USER';

//action creators
export const getAll = (payload) => {
  return { type: GET_ALL, payload };
};
export const getGS = (payload) => {
  return { type: GET_GS, payload };
};

export const getCU = (payload) => {
  return { type: GET_CU, payload };
};
export const getSeven = (payload) => {
  return { type: GET_SEVEN, payload };
};
export const getEmart = (payload) => {
  return { type: GET_EMART, payload };
};
export const getByUser = (uid) => {
  return { type: GET_BY_USER, payload: uid };
};

// 리듀서
const fetchConfig = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      return { field: 'CVS', compare: '!=', value: '임시' };

    case GET_GS:
      return {
        field: 'CVS',
        compare: '==',
        value: 'GS'
      };

    case GET_SEVEN:
      return {
        field: 'CVS',
        compare: '==',
        value: '세븐일레븐'
      };
    case GET_CU:
      return {
        field: 'CVS',
        compare: '==',
        value: 'CU'
      };
    case GET_EMART:
      return {
        field: 'CVS',
        compare: '==',
        value: 'Emart'
      };
    case GET_BY_USER:
      const userId = action.payload;
      return {
        field: 'user', //필드 이름이 뭐가 될지는 미정임. 팀원과 상의할것!!
        compare: '==',
        value: userId
      };

    default:
      return state;
  }
};

export default fetchConfig;
