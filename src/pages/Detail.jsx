import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Detail() {
  const [feed, setFeed] = useState({});
  const params = useParams();
  console.log(params.id);
  // problem --> params.id 값은 feeds state에 저장되지만 서버엔 저장되지 않는다.
  // chosenCVS 객체의 field로 id 는 존재하지 않는다.
  // 필드를 검색하는것이 아닌 문서의 이름(id)를 검색하는 방법은 없는가?
  // useEffect(() => {}, []);

  useEffect(() => {
    const fetchData = async () => {
      const feedRef = doc(db, 'feeds', params.id);
      const docSnapshot = await getDoc(feedRef);
      console.log(docSnapshot.data());
      const initialFeed = { ...docSnapshot.data() };

      setFeed(initialFeed);
      console.log(feed);
    };
    fetchData();
  }, []);
  return (
    <>
      <div>Detail</div>
      <p>작성자 {feed.user}</p>
      <h1>{feed.title}</h1>
      <img src={feed.img_url} alt="" />
      <br />
      <p>{feed.content}</p>
      <br />
      <p>작성일 : {feed.date}</p>
      <p>문서id : {feed.id}</p>
      <p>편의점 : {feed.CVS}</p>
    </>
  );
}

export default Detail;
