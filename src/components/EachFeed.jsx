import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StFeedDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid transparent;
  width: 60%;
  min-width: 550px;
  align-items: center;
  cursor: pointer;
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

const StTitle = styled.h1`
  font-size: 1.5rem;
`;

const StFeedMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* max-height: 300px;
  overflow: hidden; */
  /* ${(props) =>
    props.$heightBool &&
    `
    max-height:300px;
    overflow:hidden;
    `} */
`;

function EachFeed({ feed }) {
  const navigate = useNavigate();
  //   const feedDivRef = useRef('');
  //   let height = feedDivRef.current.clientHeight;
  //   console.log(height);
  //   let heightBool = height >= 400 ? true : false;
  //   console.log(heightBool);
  const feedClickHndlr = () => {
    navigate(`/detail/${feed.id}`);
  };

  return (
    <StFeedDiv onClick={feedClickHndlr}>
      <p>작성자 {feed.user}</p>
      <StTitle>{feed.title}</StTitle>
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
