import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getAll, getCU, getGS, getSeven, getEmart } from 'redux/modules/filterConfig';

const StSidebarDiv = styled.div`
  width: 120px;
  height: 200px;
  border: 1px solid #7579e7;
  border-radius: 15px;

  //나중에 헤더 생기면 위치 수정 필요!!
  position: fixed;
  top: 100px;
  left: 10px;
  padding: 5px;

  //화면 가로폭이 좁아지면 사이드바 숨김
  @media (max-width: 850px) {
    display: none;
  }

  li {
    cursor: pointer;
    margin-top: 10px;
  }
`;

function Sidebar() {
  const dispatch = useDispatch();
  const onCUclick = () => {
    dispatch(getCU());
  };
  const onSevElevclick = () => {
    dispatch(getSeven());
  };
  const onGSclick = () => {
    dispatch(getGS());
  };
  const onEmartclick = () => {
    dispatch(getEmart());
  };
  const onAllclick = () => {
    dispatch(getAll());
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
