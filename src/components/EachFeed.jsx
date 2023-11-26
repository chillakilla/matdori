import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import smile from '../assets/smile.svg';

const StFeedDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  min-width: 550px;
  align-items: flex-start;
  margin: 0 0 40px 0;
  padding: 20px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
  color: black;

  img {
    width: 100%;
  }
  h1 {
    margin-top: 24px;
  }
`;

const StWriterDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ededed;
  position: relative;
  img {
    width: 24px;
    margin-right: 8px;
    border-radius: 100%;
  }
  span {
    color: #555555;
    font-size: 14px;
  }
  button {
    position: absolute;
    right: 0px;
    cursor: pointer;
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
  background-image: linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgb(255, 255, 255) 100%);
`;

const StPforContent = styled.p`
  text-align: left;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const StFeedMainDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  align-items: center;
  max-height: 400px;
  overflow: hidden;
  background-color: white;

  div {
    width: 100%;
  }
`;
const StDetailBtn = styled.button`
  margin-top: 20px;
  width: 100%;
  height: 40px;
  background-color: inherit;
  border: 1px solid #7579e7;
  border-radius: 5px;
  color: #7579e7;
  padding: 0.5rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #7579e7;
    color: #fff;
  }
`;

function EachFeed({ feed, location }) {
  const navigate = useNavigate();

  const deletBtnHndlr = () => {
    if (window.confirm('삭제할까요?')) {
      const feedRef = doc(db, 'feeds', feed.id);
      deleteDoc(feedRef);
    } else {
      return;
    }
  };

  const feedClickHndlr = () => {
    navigate(`/detail/${feed.id}?lastlocation=${location}`);
  };

  return (
    <StFeedDiv>
      <StWriterDiv>
        <img src={smile} alt="" />

        <span>{feed.user}</span>

        <button onClick={deletBtnHndlr}>삭제</button>
      </StWriterDiv>
      <StTitle>{feed.title}</StTitle>
      <br />
      <StFeedMainDiv>
        <div>
          <img src={feed.image_url} alt="" />
          <br />

          <StPforContent>{feed.content}</StPforContent>
          <br />
        </div>
        <StGradientDiv></StGradientDiv>
      </StFeedMainDiv>
      {/* <p>작성일 : {feed.date}</p>
      <p>문서id : {feed.id}</p>
      <p>편의점 : {feed.CVS}</p> */}
      <StDetailBtn onClick={feedClickHndlr}>자세히 보기</StDetailBtn>
    </StFeedDiv>
  );
}

export default EachFeed;
