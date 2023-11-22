import React from 'react';
import styled from 'styled-components';
const StFeedDiv = styled.div`
  display: flex;
  border: 2px solid transparent;
  width: 60%;
  flex-direction: column;
  align-items: center;

  margin: 10px;
  padding: 20px;
  border-radius: 15px 15px 15px 15px;
  background-color: rgba(0, 0, 0, 0.1);
  color: black;
  img {
    width: 80%;
  }
`;

function EachFeed({ feed }) {
  return (
    <StFeedDiv>
      <p>작성자 {feed.user}</p>
      <p>{feed.title}</p>
      <br />
      <img src={feed.img_url} alt="" />
      <p>{feed.content}</p>
      <br />
      <p>작성일 : {feed.date}</p>
      <p>문서id : {feed.id}</p>
      <p>편의점 : {feed.CVS}</p>
    </StFeedDiv>
  );
}

export default EachFeed;
