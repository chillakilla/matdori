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
const StTextAreaForContent = styled.textarea`
  resize: none;
  width: 100%;
  border-radius: 10px;
  border-color: transparent;
  background-color: transparent;
  font-size: large;
`;
const StTextAreaForEdit = styled.textarea`
  resize: none;
  width: 100%;
  background-color: #ffc0cb1d;
  border-radius: 10px;
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
  const [editText, setEditText] = useState(feed.content);

  const deletBtnHndlr = () => {
    if (window.confirm('삭제할까요?')) {
      const feedRef = doc(db, 'feeds', feed.id);
      deleteDoc(feedRef);
      navigate(-1);
    } else {
      return;
    }
  };
  const editBtnHndlr = () => {
    if (isEditing) {
      const feedRef = doc(db, 'feeds', feed.id);
      updateDoc(feedRef, {
        content: editText
      });
    }
    setIsEditing((prev) => !prev);
  };
  const editChangeHndlr = (e) => {
    setEditText(e.target.value);
  };

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
        <StTitleH2>{feed.title}</StTitleH2>
        <img src={feed.image_url} alt="" />
        <br />
        {!isEditing && <StTextAreaForContent disabled value={feed.content} />}
        {isEditing && <StTextAreaForEdit onChange={editChangeHndlr} value={editText} />}
        <br />
      </StMainArea>
      <p>문서id : {feed.id}(개발완료후 삭제할것)</p>
      <StBtnDiv>
        <button onClick={editBtnHndlr}>{isEditing ? '수정완료' : '수정'}</button>
        <button onClick={deletBtnHndlr}>삭제</button>
      </StBtnDiv>
    </StDetailSection>
  );
}

export default Detail;
