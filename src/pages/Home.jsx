import React, { useState } from 'react';
import Feed from 'components/Feed';
import Sidebar from 'components/Sidebar';

function Home() {
  const [chosenCVS, setChosenCVS] = useState({ compare: '!=', value: '임시' });
  return (
    <>
      <span>홈입니다</span>
      <Sidebar setChosenCVS={setChosenCVS} />
      <Feed chosenCVS={chosenCVS} />
    </>
  );
}

export default Home;
