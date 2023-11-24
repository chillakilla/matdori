import { auth, db, storage } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { add_feed } from 'redux/modules/feeds';
import { open_modal } from 'redux/modules/modal';

function Inputform() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [CVS, setCVS] = useState('CU'); //편의점 이름

  //dispatch
  const dispatch = useDispatch();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //이미지 파일 업로드
  const handleUpload = async () => {
    //[파일선택] 버튼 안눌러서 선택한 파일 없는경우
    if (selectedFile === '') {
      return false;
    }
    const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    try {
      await uploadBytes(imageRef, selectedFile);
      // 저장된 image url :getDownloadURL(imageRef)
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.log('Inputform.jsx (handleUpload): ', error);
      throw error;
    }
  };

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          try {
            if (window.confirm('새글을 등록하시겠습니까?')) {
              //1. 이미지 파일 업로드
              const uploadImageUrl = await handleUpload();

              //2. 모달창에 입력된 새로운 데이터
              const newData = {
                email: 'test',
                content,
                CVS,
                date: new Date(),
                title,
                image_url: uploadImageUrl
              };

              dispatch(add_feed(newData));

              //3. 파이어스토어에 데이터 저장
              const collectionRef = collection(db, 'feeds');
              await addDoc(collectionRef, newData);

              //4. 모달닫기
              dispatch(open_modal(false));
            } else {
              return;
            }
          } catch (Error) {
            console.log('[form Error] (Inputform.jsx): ', Error);
          }
        }}
      >
        <StSection>
          <div>
            <p>날짜</p>
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
            <select value={CVS} onChange={(event) => setCVS(event.target.value)}>
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
