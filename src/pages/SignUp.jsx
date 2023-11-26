import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const SignUp = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', displayName: '' });
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!isValidEmail(credentials.email)) {
      setError('올바른 형식의 이메일이 아닙니다.');
      setShowError(true);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;
      const db = getFirestore();

      await setDoc(doc(db, 'users', user.uid), {
        email: credentials.email,
        displayName: credentials.displayName
      });

      alert('회원가입을 환영합니다.');
      navigate('/');
    } catch (error) {
      setError(`${error.message}`);
      setShowError(true);
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <LoginContainer>
        <FormContainer>
          <Title>회원가입</Title>
          <InputForm>
            <InputContainer>
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
            </InputContainer>
            <PwInputContainer>
              <label>Password : &nbsp;</label>
              <Input
                type="password"
                value={credentials.password}
                name="password"
                onChange={onChange}
                required
                placeholder="대문자, 숫자, 특수문자 포함 최소 8자 이상"
              ></Input>
            </PwInputContainer>
            <InputContainer>
              <label>Name : &nbsp;</label>
              <Input
                type="text"
                value={credentials.displayName}
                name="displayName"
                onChange={onChange}
                required
              ></Input>
            </InputContainer>
            <ErrorTextContainer>{showError && <ErrorText>{error}</ErrorText>}</ErrorTextContainer>
          </InputForm>
          <ButtonContainer>
            <LoginButton onClick={handleSignUp}>회원가입</LoginButton>
          </ButtonContainer>
        </FormContainer>
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

const FormContainer = styled.div`
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  font-weight: bold;
  padding: 10px;
`;
const PwInputContainer = styled.div`
  font-weight: bold;
  padding: 10px;
  transform: translateX(-4.8%);
`;
const Input = styled.input`
  padding: 5px;
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

export default SignUp;
