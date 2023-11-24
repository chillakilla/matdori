import React, { useState } from 'react';
import Header from '../components/UI/Header';
import { auth } from '../firebase';

function Home() {
  const [isLoggedIn] = useState(auth.currentUser !== null);
  return <Header isLoggedIn={isLoggedIn} />;
}

export default Home;
