import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;ㅁ
  width: 300px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const InputLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px;
  width: 48%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SignUpButton = styled(Button)`
  background-color: white;
  color: black;
  border: 1px solid black;
`;

const LoginButton = styled(Button)`
  background-color: black;
  color: white;
`;

function LoginPage() {
  return (
    <LoginContainer>
      <LoginForm>
        <Title>로그인</Title>
        <InputLabel>아이디</InputLabel>
        <Input type="text" placeholder="아이디를 입력하세요" />
        <InputLabel>비밀번호</InputLabel>
        <Input type="password" placeholder="비밀번호를 입력하세요" />
        <ButtonContainer>
          <SignUpButton type="button">회원가입</SignUpButton>
          <LoginButton type="submit">로그인</LoginButton>
        </ButtonContainer>
      </LoginForm>
    </LoginContainer>
  );
}

export default LoginPage;