import React, { useEffect, useState } from 'react';
import Feed from 'components/Feed';
import Sidebar from 'components/Sidebar';

import { auth } from '../firebase';
import InputformLayout from 'components/UI/InputformLayout';
import { useDispatch } from 'react-redux';
import { getAll } from 'redux/modules/filterConfig';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser !== null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAll());
  }, []);

  return (
    <>
      <Sidebar />
      <InputformLayout isLoggedIn={isLoggedIn} />
      {/* 인풋폼레이아웃 부분 변경 */}
      <Feed />
    </>
  );
}
export default Home;
