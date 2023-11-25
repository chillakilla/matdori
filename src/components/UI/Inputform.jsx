import { auth, db, storage } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { open_modal } from 'redux/modules/modal';

function Inputform() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [CVS, setCVS] = useState('CU'); //편의점 이름

  //
  const currentEmail = useSelector((state) => state.currentEmail);

  //dispatch
  const dispatch = useDispatch();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //이미지 파일 업로드
  const handleUpload = async () => {
    //[파일선택] 버튼 안눌러서 선택한 파일 없는경우
    if (selectedFile === '') {
      return '';
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

  let formattedDate = new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'full',
    timeStyle: 'short'
  }).format(new Date());

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
                date: formattedDate,
                title,
                image_url: uploadImageUrl,
                user: currentEmail
              };

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
            <p>새 글 작성</p>
          </div>

          <div>
            <p>{currentEmail}</p>
          </div>
          <StDiv>
            <p>제목</p>
            <TitleInput
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="제목을 입력해주세요."
              maxLength={30}
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
          <FileUplod>
            <p>이미지 첨부</p>
            <input type="file" name="fileSelect" id="fileAttach" onChange={handleFileSelect}></input>
            <label for="fileAttach">사진 첨부하기</label>
          </FileUplod>
        </StSection>
        <BtnSection>
          <Button>등록하기</Button>
        </BtnSection>
      </form>
    </>
  );
}

const FileUplod = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;

  & input {
    //width: 0.1px;
    //height: 0.1px;
    //opacity: 0;
    //overflow: hidden;
    //position: absolute;
    //z-index: -1;
  }

  & label {
    border: 1px solid #d9e1e8;
    background-color: #fff;
    color: #7579e7;
    border-radius: 10px;
    padding: 8px 17px 8px 17px;
    font-weight: 500;
    font-size: 15px;
    box-shadow: 1px 2px 3px 0px #f2f2f2;
    outline: none;
  }
`;

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
  background-color: #7579e7;
  color: white;
  border: none;
  margin: 10px;
  padding: 8px;
  font-weight: 700;
  border-radius: 10px;
  &:hover {
    border: 1px solid #7579e7;
    box-shadow: rgba(117, 121, 231, 0.4) 0px 0px 0px 3px;
  }
`;

export default Inputform;
