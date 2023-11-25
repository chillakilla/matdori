import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import Header from 'components/UI/Header';
import { useDispatch } from 'react-redux';
import { current_Email } from 'redux/modules/currentEmail';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser !== null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        dispatch(current_Email(user ? auth.currentUser.email : ''));
      } else {
        setIsLoggedIn(false);
      }
      console.log(auth.currentUser);
    });

    return () => unsubscribe();
  }, []);

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

  const isValidEmail = (email) => {
    const emailRagex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRagex.test(email);
  };

  const signUp = async (event) => {
    event.preventDefault();

    try {
      const signUpCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('signUp', signUpCredential.user);

      setIsLoggedIn(true);
      alert('회원가입을 환영합니다.');
      setError('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('에러가 발생했습니다', error.message);
      setIsLoggedIn(false);
      setError('회원가입 중 오류가 발생했습니다.');
      setShowError(true);
    }
  };

  const signIn = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      setShowError(true);
      return;
    }

    if (!isValidEmail(email)) {
      setError('올바른 형식의 이메일이 아닙니다.');
      setShowError(true);
      return;
    }
    try {
      const signInCredential = await signInWithEmailAndPassword(auth, email, password);

      console.log('SignIn', signInCredential.user);
      setIsLoggedIn(true);
      setError('로그인 성공!');
      alert('로그인 되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('로그인 중 오류', error.message);
      setIsLoggedIn(false);
      setError('로그인 중 오류가 발생했습니다.');
      setShowError(true);
    }
  };
  const logOut = async (event) => {
    event.preventDefault();

    try {
      await signOut(auth);
      setIsLoggedIn(false);
      alert('로그아웃 되었습니다.');
      navigate('/');
    } catch (error) {
      console.log('로그아웃 중 오류가 발생했습니다.', error.message);
    }
  };

  const signWithGoogle = async (event) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('google sign in', result.user);
      setIsLoggedIn(true);
      setError('로그인 성공');
      alert('Google계정으로 로그인 되었습니다.');
      navigate('/');
    } catch (error) {
      console.log('google sign in error', error.message);
      setIsLoggedIn(false);
      setError('로그인 중 오류가 발생했습니다.');
      setShowError(true);
    }
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <LoginContainer>
        <InputContainer>
          <Form>
            <Title>로그인</Title>
            <IdContainer>
              <label>Email : &nbsp;</label>
              <Input
                type="email"
                value={email}
                name="email"
                onChange={onChange}
                required
                placeholder="asdasd@gmail.com"
                autoFocus
              ></Input>
            </IdContainer>
            <PasswordContainer>
              <label>Password : &nbsp;</label>
              <Input type="password" value={password} name="password" onChange={onChange} required></Input>
            </PasswordContainer>
            <ErrorTextContainer>{showError && <ErrorText>{error}</ErrorText>}</ErrorTextContainer>
          </Form>
          <ButtonContainer>
            {isLoggedIn ? (
              <LoginButton onClick={logOut}>로그아웃</LoginButton>
            ) : (
              <>
                <LoginButton onClick={signUp}>회원가입</LoginButton>
                <LoginButton onClick={signIn}>로그인</LoginButton>
                <LoginButton onClick={signWithGoogle}>Google 로그인</LoginButton>
              </>
            )}
          </ButtonContainer>
        </InputContainer>
      </LoginContainer>
    </>
  );
};

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const InputContainer = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const IdContainer = styled.div`
  font-weight: bold;
  padding: 10px;
  transform: translateX(5.5%);
`;

const Input = styled.input`
  padding: 5px;
`;

const PasswordContainer = styled.div`
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px;
`;

const LoginButton = styled.button`
  width: 80px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  color: white;
  background-color: black;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: white;
    color: black;
  }
  &:active {
    transform: scale(1.1);
  }
`;

const ErrorTextContainer = styled.div`
  width: max-content;
  height: 40px;
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 20px;
`;

export default Login;
