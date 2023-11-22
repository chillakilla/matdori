import React from 'react';
import styled from 'styled-components';

const StSidebarDiv = styled.div`
  width: 120px;
  height: 300px;
  border: 1px solid black;

  //나중에 헤더 생기면 위치 수정 필요!!
  position: fixed;
  top: 50px;
  left: 10px;

  //화면 가로폭이 좁아지면 사이드바 숨김
  @media (max-width: 670px) {
    display: none;
  }

  li {
    cursor: pointer;
    margin-top: 10px;
  }
`;

function Sidebar({ setChosenCVS }) {
  const onCUclick = () => {
    setChosenCVS({
      compare: '==',
      value: 'CU'
    });
  };
  const onSevElevclick = () => {
    setChosenCVS({
      compare: '==',
      value: '세븐일레븐'
    });
  };
  const onGSclick = () => {
    setChosenCVS({
      compare: '==',
      value: 'GS'
    });
  };
  const onEmartclick = () => {
    setChosenCVS({
      compare: '==',
      value: 'Emart'
    });
  };
  const onAllclick = () => {
    setChosenCVS({
      compare: '!=',
      value: '임시'
    });
  };

  return (
    <StSidebarDiv>
      <p>🎇편의점 선택</p>
      <br />
      <ul>
        <li onClick={onAllclick}>전체보기</li>
        <li onClick={onCUclick}>CU</li>
        <li onClick={onSevElevclick}>세븐일레븐</li>
        <li onClick={onGSclick}>GS</li>
        <li onClick={onEmartclick}>이마트24</li>
      </ul>
    </StSidebarDiv>
  );
}

export default Sidebar;
