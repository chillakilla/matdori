import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { closePublicModal } from 'redux/modules/publicModal';
import { closeInputModal } from 'redux/modules/modal';

function PublicModal() {
  const { title, message, btnMsg, btnFn, btnMsg2, btnFn2 } = useSelector((state) => state.publicModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closePublicModal());
    dispatch(closeInputModal()); //기존 모달
  };

  return (
    <BackGround>
      <Container>
        <TitieAndContent>
          <h2>{title}</h2>
          <p>{message}</p>
        </TitieAndContent>
        <ButtonDiv>
          {btnMsg && <FirstBtn onClick={btnFn}>{btnMsg} </FirstBtn>}
          {btnMsg2 && <SecondtBtn onClick={btnFn2}>{btnMsg2} </SecondtBtn>}
        </ButtonDiv>
      </Container>
    </BackGround>
  );
}

const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: saturate(180%) blur(8px);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 1000px;
  top: 0;
  border: none;
`;

const Container = styled.div`
  width: 300px;
  height: 200px;

  /*최상단 위치 */
  z-index: 999;

  /*중앙배치 */
  /*translate:본인 사이즈 기준 */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 20px;
`;

const TitieAndContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 20px;
  //padding-bottom: 10px;
  gap: 10px;
  & h2 {
    font-weight: 600;
    font-size: 19px;
    padding-bottom: 10px;
  }
  & p {
    font-size: 14px;
    white-space: pre-wrap;
    min-height: 30px;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const FirstBtn = styled.button`
  border: 1px solid #7579e7;
  background-color: #fff;
  color: #7579e7;
  border-radius: 10px;
  padding: 6px 15px 6px 15px;
  font-weight: 500;
  font-size: 15px;
  box-shadow: 1px 2px 3px 0px #f2f2f2;
  outline: none;
`;

const SecondtBtn = styled.button`
  border: 1px solid #7579e7;
  background-color: #7579e7;
  color: white;
  border-radius: 10px;
  padding: 6px 15px 6px 15px;
  font-weight: 500;
  font-size: 15px;
  box-shadow: 1px 2px 3px 0px #f2f2f2;
  outline: none;
`;

export default PublicModal;
