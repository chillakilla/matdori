import NavBar from 'components/UI/Header';
import React, { useState } from 'react';
import { auth } from '../firebase';

function MyPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser !== null);

  return <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
}

export default MyPage;
