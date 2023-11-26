import React from 'react';
import Modal from 'components/UI/Modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { openInputmodal, closeInputModal } from 'redux/modules/modal';
import PublicModal from './PublicModal';
import publicModal, { closePublicModal, showPublicModal } from 'redux/modules/publicModal';

function InputformLayout() {
  const modal = useSelector((state) => state.modal);
  const publicModal = useSelector((state) => state.publicModal);
  const currentEmail = useSelector((state) => state.currentEmail);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(openInputmodal());
  };

  const openModal_NOLogin = () => {
    dispatch(
      showPublicModal({
        isUse: true,
        title: '⭐로그인 필요⭐',
        message: '새 글 작성은 로그인 필요해요.',
        btnMsg: '확인',
        btnFn: () => dispatch(closePublicModal())
      })
    );
  };

  const isUserLogIn = Boolean(currentEmail);
  const handleClick = isUserLogIn ? openModal : openModal_NOLogin;

  return (
    <StSection>
      <Button onClick={handleClick}>
        <div> 새 글 작성시 여기를 클릭하세요!</div>
      </Button>
      {!isUserLogIn && publicModal.isUse && <PublicModal />}
      {isUserLogIn && modal.isUseInput && <Modal />}
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
