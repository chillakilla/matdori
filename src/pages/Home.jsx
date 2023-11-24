import React, { useState } from 'react';
import NavBar from '../components/UI/NavBar';
import { auth } from '../firebase';

function Home() {
  const [isLoggedIn] = useState(auth.currentUser !== null);
  return <NavBar isLoggedIn={isLoggedIn} />;
}

export default Home;
