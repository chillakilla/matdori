import React from 'react';
import Modal from 'components/UI/Modal';
import styled from 'styled-components';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stored_feed } from 'redux/modules/addNewFeed';
import { open_modal } from 'redux/modules/modal';

function InputformLayout() {
  //redux
  const feeds = useSelector((state) => state.addNewFeed);
  const modal = useSelector((state) => state.modal);
  //const currentEmail = useSelector((state) => state.currentEmail);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        dispatch(stored_feed(initialTodos));
      } catch (Error) {
        console.log('InputformLayout.jsx (useEffect): ', Error);
      }
    };

    fetchData();
  }, []);

  const showModal = () => {
    //로그인 여부 체크 (자료형 false 반환 : "",null,undefined,0 NaN)
    // if (!currentEmail) {
    //   alert('로그인하셔야 새글 작성이 가능합니다.');
    //   return;
    // }
    dispatch(open_modal(true));
  };

  return (
    <>
      <Button onClick={showModal}>
        <div> 새 글 작성시 여기를 클릭하세요!</div>
      </Button>
      {modal && <Modal />}
    </>
  );
}

const Button = styled.button`
  margin-top: 100px;
  width: 400px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid black;

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
