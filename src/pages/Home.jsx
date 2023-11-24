import React from 'react';
import Feed from 'components/Feed';
import Sidebar from 'components/Sidebar';

function Home() {
  return (
    <>
      <span>홈입니다</span>
      <Sidebar />
      <Feed />
    </>
  );
}

export default Home;
