import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const StDetailSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 10px;
  min-width: 700px;
  margin: 60px auto;
`;

const StAuthorDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* background-color: #9ab3f5; */
  border: 2px solid #9ab3f5;
  width: 80%;
  padding: 10px;
  font-size: larger;
  border-radius: 10px;
  margin: 0 0 20px 0;
  position: relative;
  img {
    margin-right: 10px;
    width: 60px;
    height: 60px;
    border-radius: 100%;
  }
`;
const StDivForNameAndStore = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  span {
    font-size: 17px;
  }
`;
const StdateSpan = styled.span`
  position: absolute;
  right: 10px;
  font-size: 15px;
`;
const StTitleH2 = styled.h2`
  font-size: 30px;
  padding-bottom: 10px;
  /* position: absolute; */
  left: 0px;
`;
const StMainArea = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
`;
const StBtnDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 50px;
  button {
    padding: 0.3rem;
    width: 100px;
    cursor: pointer;
    font-size: large;
    border-radius: 20px;
    border-color: transparent;
  }
  button:first-of-type {
    background-color: #9ab3f5;
  }
  button:last-of-type {
    background-color: #7579e7;
    color: white;
  }
`;
const StTextAreaForContent = styled.p`
  resize: none;
  width: 100%;
  min-width: 500px;
  height: auto;
  border-radius: 10px;
  border-color: transparent;
  background-color: transparent;
  white-space: pre-wrap;
  font-size: large;
`;
const StTextAreaForEdit = styled.textarea`
  resize: none;
  width: 100%;
  min-width: 500px;

  min-height: 100px;
  background-color: #ffc0cb1d;
  border-radius: 10px;
  border-color: transparent;
  font-size: large;
`;
const StTextAreaForTitleEdit = styled.textarea`
  resize: none;
  width: 100%;
  background-color: #ffc0cb1d;
  border-radius: 10px;
  border-color: transparent;

  font-size: large;
`;

function Detail() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const feeds = useSelector((state) => state.feeds);
  console.log(feeds);
  const params = useParams();
  const filteredFeed = feeds.filter((feed) => feed.id === params.id);
  const feed = filteredFeed[0];

  //제목+ 타이틀 한번에 수정
  const [editData, setEditData] = useState({ ...feed });

  const deletBtnHndlr = () => {
    if (window.confirm('삭제할까요?')) {
      const feedRef = doc(db, 'feeds', feed.id);
      deleteDoc(feedRef);
      navigate(-1);
    } else {
      return;
    }
  };

  /**
   * 혜민 수정
   * 1. 제목 + 내용 2개 동시에 수정
   * editBtnHndlr() / editChangeHndlr() 수정
   */

  const editBtnHndlr = () => {
    if (isEditing) {
      const feedRef = doc(db, 'feeds', feed.id);
      updateDoc(feedRef, {
        content: editData.content,
        title: editData.title
      });
    }
    setIsEditing((prev) => !prev);
  };

  /**
   * [대괄호] : 객체에서 키 동적 변경
   */
  const editChangeHndlr = (event, field) => {
    setEditData({ ...editData, [field]: event.target.value });
  };

  //lastlocation에 따라 수정/삭제 버튼을 조건부 렌더링 하기 위한 코드
  const getQueryParam = (name) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  };
  const lastLocation = getQueryParam('lastlocation');
  const isFromMyPage = lastLocation === '/mypage';

  return (
    <StDetailSection>
      <StAuthorDiv>
        <img
          src="https://global.discourse-cdn.com/turtlehead/optimized/2X/c/c830d1dee245de3c851f0f88b6c57c83c69f3ace_2_250x250.png"
          alt=""
        />
        <StDivForNameAndStore>
          <p>{feed.user}</p>
          <span>편의점 : {feed.CVS}</span>
        </StDivForNameAndStore>
        <StdateSpan>{feed.date}</StdateSpan>
      </StAuthorDiv>

      <StMainArea>
        {/**
         * 혜민 수정
         * 1. isEditing ? 수정화면 (StTextAreaForEdit) : 수정x 화면 (StTitleH2)
         * 2. 수정 : 제목 + 내용 수정
         * 3. 수정 후 : {editData.title}으로 수정사항 반영
         */}

        {isEditing ? (
          <>
            <StTextAreaForTitleEdit onChange={(event) => editChangeHndlr(event, 'title')} value={editData.title} />
            <img src={feed.image_url} alt="" />
            <StTextAreaForEdit
              autoFocus
              onChange={(event) => editChangeHndlr(event, 'content')}
              value={editData.content}
            />
          </>
        ) : (
          <>
            <StTitleH2>{editData.title}</StTitleH2>
            <img src={feed.image_url} alt="" />
            <StTextAreaForContent disabled>{editData.content}</StTextAreaForContent>
          </>
        )}
        <br />
      </StMainArea>
      <p>문서id : {feed.id}(개발완료후 삭제할것)</p>
      {isFromMyPage && (
        <StBtnDiv>
          <button onClick={editBtnHndlr}>{isEditing ? '수정완료' : '수정'}</button>
          <button onClick={deletBtnHndlr}>삭제</button>
        </StBtnDiv>
      )}
    </StDetailSection>
  );
}

export default Detail;
