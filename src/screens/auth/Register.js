import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axios';
import InputComponent from '../../components/InputComponent';

function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const registerUser = async (data) => {
    const { loginId, name, password } = data;
    try {
      const res = await axiosApi.post("/join", {
        loginId,
        name,
        password,
      });
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <RegisterWrapper>
      <RegisterForm onSubmit={handleSubmit(registerUser)}>
        <Title>회원가입</Title>
        <FormContent>
          <InputComponent
            id="name"
            label="이름"
            type="text"
            placeholder="이름을 입력하세요"
            register={{...register("name")}}
            required
          />
          <InputComponent
            id="loginId"
            label="아이디"
            type="text"
            placeholder="아이디를 입력하세요"
            register={{...register("loginId")}}
            required
          />
          <InputComponent
            id="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요"
            register={{...register("password")}}
            required
          />
          <InputComponent
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요"
            register={{...register("comfirmPassword")}}
            required
          />
          <ButtonGroup>
            <BackButton type="button" onClick={() => navigate('/')}>돌아가기</BackButton>
            <RegisterButton type="submit">가입하기</RegisterButton>
          </ButtonGroup>
        </FormContent>
      </RegisterForm>
    </RegisterWrapper>
  );
}

const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
`;

const RegisterForm = styled.form`
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

const BackButton = styled(Button)`
  background-color: white;
  color: black;
`;

const RegisterButton = styled(Button)`
  background-color: black;
  color: white;
`;

export default Register;