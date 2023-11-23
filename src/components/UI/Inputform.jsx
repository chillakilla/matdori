import { auth, db, storage } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Inputform({ setData, currentEmail, setModalOpen }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [store, setStore] = useState('CU'); //편의점 이름

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //이미지 파일 업로드
  //try~catch 추가하기******
  const handleUpload = async () => {
    const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);

    // 저장된 image url :getDownloadURL(imageRef)
    return await getDownloadURL(imageRef);
  };

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (window.confirm('새글을 등록하시겠습니까?')) {
            //1. 이미지 파일 업로드 (파이어스토어보다 밑으로가면 비동기식이라 저장안되는 경우 발생)
            const uploadImageUrl = await handleUpload();

            const newData = {
              email: 'test',
              content,
              store,
              date: new Date(),
              title,
              image_url: uploadImageUrl
            };
            setData((prev) => [newData, ...prev]);

            //2. 파이어스토어에 데이터 저장
            const collectionRef = collection(db, 'newData');
            await addDoc(collectionRef, newData);

            setModalOpen(false);
          } else {
            return;
          }
        }}
      >
        <StSection>
          <div>
            <p>날짜</p>
          </div>
          <div>
            <p>작성자 : {currentEmail}</p>
          </div>

          <StDiv>
            <p>제목</p>
            <TitleInput
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="최대 20글자까지 작성가능합니다."
              maxLength={20}
            ></TitleInput>
          </StDiv>
          <StDiv>
            <p>편의점</p>
            <select value={store} onChange={(event) => setStore(event.target.value)}>
              <option>CU</option>
              <option>GS</option>
              <option>이마트24</option>
              <option>세븐일레븐</option>
            </select>
          </StDiv>
        </StSection>

        <StSection>
          <StContent
            placeholder="나만의 먹팁을 공유해주세요😆🍳"
            value={content}
            onChange={(event) => {
              setContent(event.currentTarget.value);
            }}
          ></StContent>
        </StSection>

        <StSection>
          <StDiv>
            <p>이미지 첨부</p>

            <input type="file" name="fileSelect" onChange={handleFileSelect}></input>
          </StDiv>
        </StSection>
        <BtnSection>
          <Button>등록하기</Button>
        </BtnSection>
      </form>
    </>
  );
}

const StSection = styled.section`
  padding: 10px;
  margin: 10px;
  & div {
    padding-bottom: 10px;
  }

  & p {
    font-weight: 600;
  }
`;

const StDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const StContent = styled.textarea`
  min-height: 100px;
  border: 1px solid #7579e7;
  resize: none;
  height: 200px;
  width: 100%;
  border-radius: 12px;
  padding: 10px;
  font-weight: 600;
`;
const BtnSection = styled.div`
  display: flex;
  justify-content: center;
  padding-right: 20px;
  border-radius: 12px;
  padding: 10px;
`;

const TitleInput = styled.input`
  width: 92%;
  border: 1px solid #7579e7;
  border-radius: 5px;
  padding-left: 7px;
`;

const Button = styled.button`
  background-color: #a3d8f4;
  border: none;
  margin: 10px;
  padding: 8px;
  font-weight: 700;
  border-radius: 12px;
  &:hover {
    border: 1px solid #7579e7;
    box-shadow: rgba(117, 121, 231, 0.4) 0px 0px 0px 3px;
  }
`;

export default Inputform;
