import React from 'react';
import styled from 'styled-components';
import Inputform from './Inputform';
import { open_modal } from 'redux/modules/modal';
import { useDispatch } from 'react-redux';
import publicModal from 'redux/modules/publicModal';

function Modal() {
  //redux
  const dispatch = useDispatch();

  const closeModal = () => {
    alert('정말 나가시겠어요?!');
    dispatch(closeModal(false));

    //dispatch(open_modal(false));
  };

  const closeModal_outside = (event) => {
    //event.target = 내가 지금 클릭한 곳
    //event.currentTarget = onClick이 할당된 element(Background)
    if (event.target === event.currentTarget) {
      alert('정말 나가시겠어요?!');
      dispatch(open_modal(false));
    }
  };

  return (
    <BackGround onClick={(event) => closeModal_outside(event)}>
      <Container>
        <Button onClick={closeModal}>닫기</Button>

        <Inputform />
      </Container>
    </BackGround>
  );
}

const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: saturate(180%) blur(8px);
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 1000px;
  top: 0;
  border: none;
`;

const Container = styled.div`
  //position: relative;
  width: 560px;
  height: 450px;

  //border: 1px solid black;

  /*최상단 위치 */
  z-index: 100;

  /*중앙배치 */
  /*translate:본인 사이즈 기준 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: white;

  border-radius: 20px;
`;

const Button = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
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

export default Modal;
