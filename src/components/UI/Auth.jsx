// components/Auth.js
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { current_Email } from './redux/modules/currentEmail';
import { useDispatch, useSelector } from 'react-redux';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //redux
  const currentEmail = useSelector((state) => state.currentEmail);
  const dispatch = useDispatch();

  //현재 로그인한 사용자 가져오기
  useEffect(() => {
    //(onAuthStateChanged)
    // 인증 객체의 상태변화 감지 리스너 (로그인/로그아웃)
    auth.onAuthStateChanged((user) => {
      dispatch(current_Email(user ? auth.currentUser.email : ''));
    });
  }, [dispatch, currentEmail]);

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const signUp = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('user', userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signUp', errorCode, errorMessage);
    }
  };

  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('user with signIn', userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signIn', errorCode, errorMessage);
    }
  };

  const logOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
  };

  return (
    <div>
      <h2>로그인 컴포넌트</h2>
      <form>
        <div>
          <label>이메일 : </label>
          <input type="email" value={email} name="email" onChange={onChange} required></input>
        </div>
        <div>
          <label>비밀번호 : </label>
          <input type="password" value={password} name="password" onChange={onChange} required></input>
        </div>
        <button onClick={signUp}>회원가입</button>
        <button onClick={signIn}>로그인</button>
        <button onClick={logOut}>로그아웃</button>
      </form>

      <div>
        <p>로그인 정보: {currentEmail}</p>
      </div>
    </div>
  );
};

export default Auth;
