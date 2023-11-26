import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import EachFeed from './EachFeed';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setFeeds } from 'redux/modules/feeds';
import { useLocation } from 'react-router-dom';

//styled-components
const StFeedSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const StFallbackP = styled.p`
  margin-top: 20px;
`;

function Feed() {
  const filterConfig = useSelector((state) => state.filterConfig);
  const feeds = useSelector((state) => state.feeds);
  const dispatch = useDispatch();

  //EachFeed에 location path를 props로 전달. Detail.jsx의 조건부 렌더링을 위함.
  const location = useLocation();
  //서버에서 자료 가져오는 개선된 버전 -> 자료 수정/삭제/추가 에따라 실시간 업데이트
  //cf ) onSnapshot 은 비동기 작업이 아님--> async/await 미사용
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'feeds'), (querySnapshot) => {
      const updatedFeeds = [];
      querySnapshot.forEach((doc) => {
        updatedFeeds.push({ id: doc.id, ...doc.data() });
      });
      dispatch(setFeeds(updatedFeeds));
    });

    return () => unsubscribe(); // cleanup 함수로 리스너 해제(컴포 언마운트 될때!!)
  }, []);

  //조건에 맞춰 필터링하는 로직
  let filterdFeeds;
  const field = filterConfig.field;
  filterdFeeds = filterConfig.value === '전체' ? feeds : feeds.filter((feed) => feed[field] === filterConfig.value);

  // console.log('서버에서 받아온 전체 피드들', feeds);
  // console.log('필터링조건', filterConfig);
  // console.log('필터링된 피드들', filterdFeeds);
  return (
    <StFeedSection>
      {!filterdFeeds.length && <StFallbackP>일치하는 항목이 없습니다.</StFallbackP>}
      {filterdFeeds &&
        filterdFeeds.map((feed) => {
          return <EachFeed key={feed.id} feed={feed} location={location.pathname} />;
        })}
    </StFeedSection>
  );
}

export default Feed;
