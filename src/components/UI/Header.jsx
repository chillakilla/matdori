import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMyPage = location.pathname === '/mypage';

  const logOut = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      alert('로그아웃 되었습니다.');
      navigate('/');
    } catch (error) {
      console.log('로그아웃 중 오류가 발생했습니다.', error.message);
    }
  };

  return (
    <HeaderContainer>
      <Logo
        onClick={() => {
          navigate('/');
        }}
      >
        🏬편의점맛도리
      </Logo>
      <ButtonContainer>
        {isLoggedIn ? (
          <>
            <Link to={isMyPage ? '/' : '/mypage'}>
              <Button>{isMyPage ? '홈으로' : '내 페이지'}</Button>
            </Link>
            <Link>
              <Button onClick={logOut}>로그아웃</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button1>로그인</Button1>
            </Link>
            <Link to="/signup">
              <Button>회원가입</Button>
            </Link>
          </>
        )}
      </ButtonContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  border-bottom: 1px solid #7579e7;
`;

const Logo = styled.h1`
  padding: 10px;
  color: #7579e7;
  margin-left: 20px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 80px;
  margin-right: 30px;
  padding: 10px;
  background-color: #7579e7;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
  }
  &:active {
    transform: scale(1.1);
  }
`;

const Button1 = styled.button`
  width: 80px;
  margin-right: 30px;
  padding: 10px;
  background-color: white;
  color: #555555;
  border: 1px solid #efefef;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #7579e7;
    color: white;
  }
  &:active {
    transform: scale(1.1);
  }
`;

export default Header;
