import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import EachFeed from './EachFeed';
import styled from 'styled-components';
const StFeedSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

function Feed() {
  const [feeds, setFeeds] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'feeds'));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      const initialFeeds = [];
      querySnapshot.forEach((doc) => {
        initialFeeds.push({ id: doc.id, ...doc.data() });
      });
      setFeeds(initialFeeds);
      console.log(feeds);
    };
    fetchData();
  }, []);
  console.log(feeds);

  return (
    <StFeedSection>
      {feeds &&
        feeds.map((feed) => {
          return <EachFeed key={feed.id} feed={feed} />;
        })}
    </StFeedSection>
  );
}

export default Feed;
