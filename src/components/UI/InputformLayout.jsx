import React, { useState } from 'react';
import Modal from 'components/UI/Modal';
import styled from 'styled-components';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect } from 'react';
import Auth from './Auth';
/*Home.jsx에서 [글작성] 레이아웃*/
function InputformLayout() {
  const initialState = [
    {
      email: 'test00',
      content: '내용',
      store: null,
      date: new Date(),
      title: '제목',
      image_url: null
    }
  ];

  const [data, setData] = useState(initialState);

  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      const q = query(collection(db, 'newData'));
      const querySnapshot = await getDocs(q);

      const initialTodos = [];

      // document의 id와 데이터를 initialTodos에 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshot.forEach((doc) => {
        initialTodos.push({ ...doc.data() });
      });

      setData(initialTodos);
    };

    fetchData();
  }, []);

  //모달 부분
  const [modalOpen, setModalOpen] = useState(false);

  //로그인 정보 -- 로그인한 사용자가 댓글을 달 수 있도록
  const [currentEmail, setCurrentEmail] = useState('');
  const showModal = () => {
    //로그인 여부 체크 (자료형 false 반환 : "",null,undefined,0 NaN)
    if (!currentEmail) {
      alert('로그인하셔야 새글 작성이 가능합니다.');
      return;
    }
    setModalOpen(true);
  };

  return (
    <>
      <Auth currentEmail={currentEmail} setCurrentEmail={setCurrentEmail} />

      <Button onClick={showModal}>
        <div> 새 글 작성시 여기를 클릭하세요!</div>
      </Button>
      {modalOpen && <Modal setModalOpen={setModalOpen} setData={setData} currentEmail={currentEmail} />}

      {data.map((data) => {
        return (
          <ResultDiv>
            <div>제목: {data.title}</div>
            <div>내용: {data.content}</div>
            <div>이미지: {data.image_url}</div>
            <div>편의점: {data.store}</div>
          </ResultDiv>
        );
      })}
    </>
  );
}

const Button = styled.button`
  width: 400px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid black;
  margin: 20px;

  &:hover {
    border: 1px solid #7579e7;
    box-shadow: rgba(117, 121, 231, 0.4) 0px 0px 0px 3px;
  }
`;

const ResultDiv = styled.div`
  padding: 10px;
  border: 1px solid blue;
  margin: 10px;
`;

export default InputformLayout;
