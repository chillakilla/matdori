import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StFeedDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid transparent;
  width: 60%;
  min-width: 550px;
  align-items: flex-start;
  cursor: pointer;

  margin: 10px;
  padding: 20px;
  border-radius: 15px 15px 15px 15px;
  background-color: #9ab3f5;
  color: black;

  img {
    width: 100%;
  }
`;

const StWriterDiv = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: #7579e7;
  border-radius: 10px;
  padding: 10px;
  img {
    width: 50px;
    margin-right: 20px;
    border-radius: 100%;
  }
`;

const StTitle = styled.h1`
  font-size: 1.5rem;
`;

//아래 그라데이션 div가 길이가 짧은 글일 경우엔 나올 필요 없는데 어떻게 안나오게 하는지 몰루겠음...
const StGradientDiv = styled.div`
  display: inline-block;
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-image: linear-gradient(rgba(154, 179, 245, 0) 0%, rgba(154, 179, 245, 0.5) 50%, rgb(154, 179, 245) 100%);
`;

const StFeedMainDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  align-items: center;
  max-height: 300px;
  overflow: hidden;
  background-color: white;
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
      <StWriterDiv>
        <img
          src="https://global.discourse-cdn.com/turtlehead/optimized/2X/c/c830d1dee245de3c851f0f88b6c57c83c69f3ace_2_250x250.png"
          alt=""
        />
        <span>작성자 {feed.user}</span>
      </StWriterDiv>
      <StTitle>{feed.title}</StTitle>
      <br />
      <StFeedMainDiv>
        <div>
          <img src={feed.img_url} alt="" />
          <br />

          <p>{feed.content}</p>
          <br />
        </div>
        <StGradientDiv></StGradientDiv>
      </StFeedMainDiv>
      <p>작성일 : {feed.date}</p>
      <p>문서id : {feed.id}</p>
      <p>편의점 : {feed.CVS}</p>
    </StFeedDiv>
  );
}

export default EachFeed;
