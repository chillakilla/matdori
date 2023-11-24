import React, { useState } from 'react';
import Feed from 'components/Feed';
import Sidebar from 'components/Sidebar';
import Header from '../components/UI/Header';
import { auth } from '../firebase';

function Home() {
  const [isLoggedIn] = useState(auth.currentUser !== null);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <span>홈입니다</span>
      <Sidebar />
      <Feed />
    </>
  );
}
export default Home;
