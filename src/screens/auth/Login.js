import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axios'; 
import InputComponent from '../../components/InputComponent';

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const loginUser = async (data) => {
    console.log("로그인 시도 데이터:", data); // 로그인 데이터 확인
    const { userId, userPwd } = data;
    try {
      const res = await axiosApi.post('/login', {
        userId,
        userPwd,
      });
      console.log("로그인 응답:", res); // 서버 응답 확인
      if (res.status === 200) {
        localStorage.setItem('accessToken', res.data.accessToken);
        navigate('/home');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 입력해주세요.');
    }
  };

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit(loginUser)}>
        <Title>로그인</Title>
        <FormContent>
          <InputComponent
            id="userId"
            label="아이디"
            type="text"
            placeholder="아이디를 입력하세요"
            register={register("userId")}
            required
          />
          <InputComponent
            id="userPwd"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요"
            register={register("userPwd")}
            required
          />
          <ButtonGroup>
            <SignUpButton type="button" onClick={() => navigate('/register')}>회원가입</SignUpButton>
            <LoginButton type="submit">로그인</LoginButton>
          </ButtonGroup>
        </FormContent>
      </LoginForm>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: black;
`;

const FormContent = styled.div`
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;

const Button = styled.button`
  width: calc(50% - 0.25rem);
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const SignUpButton = styled(Button)`
  background-color: white;
  color: black;
`;

const LoginButton = styled(Button)`
  background-color: black;
  color: white;
`;

export default Login;
