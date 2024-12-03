import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axios'; 
import InputComponent from '../../components/InputComponent';
import Title from '../../components/Title';

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
      console.log("로그인 응답:", res.data); // 서버에서 어떤 데이터가 오는지 확인
      if (res.status === 200) {
        console.log("저장할 userId:", userId); // undefined인지 확인
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('userId', userId); // 서버에서 반환하는 실제 사용자 ID 저장
        navigate('/home');
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        // 상태 코드에 따른 메시지 처리
        switch (status) {
          case 400:
            alert(`잘못된 요청: ${data.message}`);
            break;
          case 401:
            alert(`인증 실패: ${data.message}`);
            break;
          case 403:
            alert(`권한 없음: ${data.message}`);
            break;
          case 404:
            alert(`자원을 찾을 수 없음: ${data.message}`);
            break;
          case 409:
            alert(`충돌: ${data.message}`);
            break;
          case 500:
            alert(`서버 오류: ${data.message}`);
            break;
          default:
            alert(`알 수 없는 오류: ${data.message}`);
        }
      } else {
        alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <LoginWrapper>
      <TitleContainer>
        <Title />
      </TitleContainer>
      <LoginForm onSubmit={handleSubmit(loginUser)}>
        <LoginTitle>로그인</LoginTitle>
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

const LoginTitle = styled.h1`
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

const TitleContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
`;

export default Login;
