import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { closeModal } from 'redux/modules/publicModal';

function PublicModal(props) {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeModal(false));
  };

  return (
    <BackGround>
      <Container>
        <header>
          <h2>{props.title}</h2>
        </header>
        <div>
          <p>{props.message}</p>
        </div>
        <footer>{props.btnMsg && <button onClick={props.btnFn}>{props.btnMsg} </button>}</footer>
        <button onClick={closeModal}>닫기 </button>
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
  width: 300px;
  height: 200px;

  /*최상단 위치 */
  z-index: 999;

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

  border: none;

  font-weight: 700;
  border-radius: 12px;
`;

export default PublicModal;
