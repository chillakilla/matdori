import React, { useEffect, useState } from 'react';
import Feed from 'components/Feed';
import Sidebar from 'components/Sidebar';
import { auth } from '../firebase';
import InputformLayout from 'components/UI/InputformLayout';
import { useDispatch } from 'react-redux';
import { getAll } from 'redux/modules/filterConfig';
import styled from 'styled-components';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser !== null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAll());
  }, []);

  return (
    <>
      <MainContent>
        <Sidebar />
        <InputformLayout isLoggedIn={isLoggedIn} />
        {/* 인풋폼레이아웃 부분 변경 */}
        <Feed />
      </MainContent>
    </>
  );
}

const MainContent = styled.div`
  margin-top: 60px;
  width: 1160px;
  margin: 0 auto;
`;
export default Home;
