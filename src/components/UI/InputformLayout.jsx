import React from 'react';
import Modal from 'components/UI/Modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { open_modal } from 'redux/modules/modal';
import PublicModal from './PublicModal';

function InputformLayout() {
  //redux
  const feeds = useSelector((state) => state.addNewFeed);
  const modal = useSelector((state) => state.modal);
  const currentEmail = useSelector((state) => state.currentEmail);
  const dispatch = useDispatch();

  const showModal = () => {
    //로그인 여부 체크 (자료형 false 반환 : "",null,undefined,0 NaN)
    if (!currentEmail) {
      alert('로그인하셔야 새글 작성이 가능합니다.');
      return;
    }
    dispatch(open_modal(true));
  };

  return (
    <StSection>
      <Button onClick={showModal}>
        <div> 새 글 작성시 여기를 클릭하세요!</div>
      </Button>
      {modal && <Modal />}
    </StSection>
  );
}
const StSection = styled.div`
  //position: relative;
  margin-top: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
  //min-width: 480px;
  width: 100%;
  height: 20px;

  margin-bottom: 20px;
  border-bottom: 1px solid gray;
  padding: 10px;

  border: none;

  img {
    width: 50px;
    margin-right: 20px;
    border-radius: 100%;
  }
`;

const Button = styled.button`
  display: flex;
  //flex-direction: row;
  align-items: center;

  min-width: 550px;
  width: 60.5%;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid #7579e7;
  border-radius: 12px;
  min-height: 40px;
  padding-left: 7px;

  &:hover {
    border: 1px solid #7579e7;
    box-shadow: rgba(117, 121, 231, 0.4) 0px 0px 0px 3px;
  }
  & div {
    color: #808080;
  }
`;

export default InputformLayout;
