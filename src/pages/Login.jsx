import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase';
import Header from 'components/UI/Header';
import { useDispatch } from 'react-redux';
import { current_Email } from 'redux/modules/currentEmail';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      dispatch(current_Email(user ? user.email : ''));
    });
    return () => unsubscribe();
  }, [dispatch]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAuth = async (event, authFunction, successMessage) => {
    event.preventDefault();
    if (authFunction === signInWithEmailAndPassword && !isValidEmail(credentials.email)) {
      setError('올바른 형식의 이메일이 아닙니다.');
      setShowError(true);
      return;
    }
    try {
      const userCredential = await authFunction(auth, credentials.email, credentials.password);
      setIsLoggedIn(true);
      alert(successMessage);
      navigate('/');
    } catch (error) {
      setIsLoggedIn(false);
      setError(`${error.message}`);
      setShowError(true);
    }
  };

  const signIn = async (event) => handleAuth(event, signInWithEmailAndPassword, '로그인 성공');
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

  const initializeAuthProvider = (provider) => {
    const authProvider = new provider();
    return authProvider;
  };

  const signWithProvider = async (event, provider, successMessage, errorMessage) => {
    try {
      const authProvider = initializeAuthProvider(provider);
      const result = await signInWithPopup(auth, authProvider);
      setIsLoggedIn(true);
      setError(successMessage);
      alert('로그인 되었습니다.');
      navigate('/');
    } catch (error) {
      setIsLoggedIn(false);
      setError(`${errorMessage} ${error.message}`);
      setShowError(true);
    }
  };

  const signWithGoogle = (event) =>
    signWithProvider(
      event,
      GoogleAuthProvider,
      'Google 계정으로 로그인 되었습니다.',
      'Google 로그인 중 오류가 발생했습니다.'
    );
  const signWithGithub = (event) =>
    signWithProvider(
      event,
      GithubAuthProvider,
      'Github 계정으로 로그인 되었습니다.',
      'Github 로그인 중 오류가 발생했습니다.'
    );

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
                value={credentials.email}
                name="email"
                onChange={onChange}
                required
                placeholder="sparta@gmail.com"
                autoFocus
              ></Input>
            </IdContainer>
            <PasswordContainer>
              <label>Password : &nbsp;</label>
              <Input type="password" value={credentials.password} name="password" onChange={onChange} required></Input>
            </PasswordContainer>
            <ErrorTextContainer>{showError && <ErrorText>{error}</ErrorText>}</ErrorTextContainer>
          </Form>
          <ButtonContainer>
            {isLoggedIn ? (
              <LoginButton onClick={logOut}>로그아웃</LoginButton>
            ) : (
              <>
                <LoginButton onClick={signIn}>로그인</LoginButton>
                <LoginButton onClick={signWithGoogle}>Google 로그인</LoginButton>
                <LoginButton onClick={signWithGithub}>Github 로그인</LoginButton>
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
  background-color: #7579e7;
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
