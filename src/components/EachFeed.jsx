import React, { useRef } from 'react';
import styled from 'styled-components';
const StFeedDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid transparent;
  width: 60%;
  align-items: center;
  /* max-height: 400px;
  overflow: hidden; */

  margin: 10px;
  padding: 20px;
  border-radius: 15px 15px 15px 15px;
  background-color: rgba(0, 0, 0, 0.1);
  color: black;

  img {
    width: 90%;
  }
`;

const StFeedMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* max-height: 300px; */
  /* overflow: hidden; */
  /* ${(props) =>
    props.$heightBool &&
    `
    max-height:300px;
    overflow:hidden;
    `} */
`;

function EachFeed({ feed }) {
  //   const feedDivRef = useRef('');
  //   let height = feedDivRef.current.clientHeight;
  //   console.log(height);
  //   let heightBool = height >= 400 ? true : false;
  //   console.log(heightBool);
  return (
    <StFeedDiv>
      <p>작성자 {feed.user}</p>
      <p>{feed.title}</p>
      <br />
      <StFeedMainDiv>
        <img src={feed.img_url} alt="" />
        <br />

        <p>{feed.content}</p>
        <br />
      </StFeedMainDiv>
      <p>작성일 : {feed.date}</p>
      <p>문서id : {feed.id}</p>
      <p>편의점 : {feed.CVS}</p>
    </StFeedDiv>
  );
}

export default EachFeed;
