import React from 'react';
import { useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase';
import { useSelector } from 'react-redux';

function Detail() {
  const feeds = useSelector((state) => state.feeds);
  const params = useParams();
  const filteredFeed = feeds.filter((feed) => feed.id === params.id);
  const feed = filteredFeed[0];

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
      <p>편의점 : {feed.CVS}</p>
      <p>문서id : {feed.id}</p>
    </>
  );
}

export default Detail;
