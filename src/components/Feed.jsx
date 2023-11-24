import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import EachFeed from './EachFeed';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setFeed } from 'redux/modules/feeds';

//styled-components
const StFeedSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

//처음 피드들을 서버에서 받아오는 로직
function Feed() {
  const filterConfig = useSelector((state) => state.filterConfig);
  const feeds = useSelector((state) => state.feeds);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'feeds'));
      const querySnapshot = await getDocs(q);
      const initialFeeds = [];
      querySnapshot.forEach((doc) => {
        initialFeeds.push({ id: doc.id, ...doc.data() });
      });
      dispatch(setFeed(initialFeeds));
    };
    fetchData();
  }, []);

  //조건에 맞춰 필터링하는 로직
  let filterdFeeds;
  filterdFeeds = filterConfig.value === '전체' ? feeds : feeds.filter((feed) => feed.CVS === filterConfig.value);

  console.log('서버에서 받아온 전체 피드들', feeds);
  console.log('필터링조건', filterConfig);
  console.log('필터링된 피드들', filterdFeeds);
  return (
    <StFeedSection>
      {!filterdFeeds.length && <p>일치하는 항목이 없습니다.</p>}
      {filterdFeeds &&
        filterdFeeds.map((feed) => {
          return <EachFeed key={feed.id} feed={feed} />;
        })}
    </StFeedSection>
  );
}

export default Feed;
