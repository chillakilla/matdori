import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { closePublicModal } from 'redux/modules/publicModal';
import { open_modal } from 'redux/modules/modal';

function PublicModal() {
  const { title, message, btnMsg, btnFn, btnMsg2, btnFn2 } = useSelector((state) => state.publicModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closePublicModal());
    dispatch(open_modal(false)); //기존 모달
  };

  return (
    <BackGround>
      <Container>
        <TitieAndContent>
          <h2>{title}</h2>
          <p>{message}</p>
        </TitieAndContent>
        <ButtonDiv>
          {btnMsg && <button onClick={btnFn}>{btnMsg} </button>}
          {btnMsg2 && <button onClick={btnFn2}>{btnMsg2} </button>}
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
  z-index: 150;

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
  padding: 50px;
  //padding-bottom: 10px;
  gap: 10px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;

  border: none;

  font-weight: 700;
  border-radius: 12px;
`;

export default PublicModal;
