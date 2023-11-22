import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import EachFeed from './EachFeed';
import styled from 'styled-components';
const StFeedSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

function Feed({ chosenCVS }) {
  const [feeds, setFeeds] = useState();
  console.log(chosenCVS);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'feeds'), where(chosenCVS.field, chosenCVS.compare, chosenCVS.value)); //where를 사용하여 조건을 걸 수 있다.
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
  }, [chosenCVS]);
  console.log(feeds);

  return (
    <StFeedSection>
      {/* {!feeds.length && <p>일치하는 항목이 없습니다.</p>} */}
      {feeds &&
        feeds.map((feed) => {
          return <EachFeed key={feed.id} feed={feed} />;
        })}
    </StFeedSection>
  );
}

export default Feed;
