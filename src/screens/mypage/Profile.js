import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosApi from '../../axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState('/기본 프로필.jpg');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    userName: '',
    userPhoto: null,
    openKakaoLink: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 프로필 정보 로드
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosApi.get('/users/profile');
        if (response.status === 200) {
          const userData = response.data;
          setFormData(prev => ({
            ...prev,
            userName: userData.userName || '',
            openKakaoLink: userData.openKakaoLink || ''
          }));
          if (userData.userPhoto) {
            setProfileImage(userData.userPhoto);
          }
        }
      } catch (error) {
        console.error('프로필 정보 로드 실패:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      
      setFormData(prev => ({
        ...prev,
        userPhoto: file
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitFormData = new FormData();
      
      // 비밀번호가 입력된 경우에만 전송
      if (formData.currentPassword) {
        submitFormData.append('currentPassword', formData.currentPassword);
      }
      if (formData.newPassword) {
        submitFormData.append('newPassword', formData.newPassword);
      }

      // 나머지 필드 추가
      if (formData.userName) {
        submitFormData.append('userName', formData.userName);
      }
      if (formData.userPhoto) {
        submitFormData.append('userPhoto', formData.userPhoto);
      }
      if (formData.openKakaoLink) {
        submitFormData.append('openKakaoLink', formData.openKakaoLink);
      }

      // 요청 전 데이터 확인
      console.log('=== 전송할 데이터 ===');
      for (let pair of submitFormData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await axiosApi.put('/users/update', submitFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 200) { 
        alert('프로필이 성공적으로 업데이트되었습니다.');
        // 프로필 업데이트 후 새로운 정보 반영
        if (response.data.userPhoto) {
          setProfileImage(response.data.userPhoto);
        }
      }
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            alert('잘못된 요청입니다.');
            break;
          case 401:
            alert('현재 비밀번호가 일치하지 않습니다.');
            break;
          default:
            alert('프로필 업데이트 중 오류가 발생했습니다.');
        }
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axiosApi.delete('/delete');
      if (response.status === 204) {
        alert('회원 탈퇴 성공');
        navigate('/'); // 로그인 화면으로 리다이렉트
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            alert('401 인증되지 않은 사용자입니다. 다시 로그인 해주세요.');
            break;
          case 500:
            alert('500 서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
            break;
          default:
            console.error('회원 탈퇴 실패:', error);
            alert('회원 탈퇴 중 오류가 발생했습니다.');
        }
      } else {
        console.error('회원 탈퇴 실패:', error);
        alert('네트워크 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Container>
      <Title>프로필 설정</Title>
      
      <ProfileForm onSubmit={handleSubmit}>
        <ImageSection>
          <ProfileImage src={profileImage} alt="프로필 이미지" />
          <ImageUploadLabel htmlFor="profile-upload">
            프로필 사진 변경
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </ImageUploadLabel>
        </ImageSection>

        <FormSection>
          <InputGroup>
            <Label>현재 비밀번호</Label>
            <Input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="현재 비밀번호를 입력하세요"
            />
          </InputGroup>

          <InputGroup>
            <Label>새 비밀번호</Label>
            <Input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="새 비밀번호를 입력하세요"
            />
          </InputGroup>

          <InputGroup>
            <Label>오픈채팅 URL</Label>
            <Input
              type="url"
              name="openKakaoLink"
              value={formData.openKakaoLink}
              onChange={handleInputChange}
              placeholder="https://open.kakao.com/..."
            />
            <Description>물품 대여 요청 시 표시될 오픈채팅방 URL을 입력해주세요.</Description>
          </InputGroup>

          <UpdateButton type="submit">프로필 업데이트</UpdateButton>
          <DeleteAccountButton type="button" onClick={() => setIsModalOpen(true)}>회원탈퇴</DeleteAccountButton>
        </FormSection>
      </ProfileForm>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>회원 탈퇴</ModalTitle>
            <ModalMessage>정말 탈퇴하시겠습니까?</ModalMessage>
            <ButtonContainer>
              <CancelButton onClick={() => setIsModalOpen(false)}>취소</CancelButton>
              <ConfirmButton onClick={handleDeleteAccount}>탈퇴하기</ConfirmButton>
            </ButtonContainer>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
`;

const ProfileForm = styled.form`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ImageSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const ImageUploadLabel = styled.label`
  display: inline-block;
  padding: 8px 16px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0;

  &:hover {
    background-color: #e9ecef;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #495057;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const Description = styled.p`
  font-size: 12px;
  color: #868e96;
  margin-top: 4px;
`;

const UpdateButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }
`;

const DeleteAccountButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: white;
  color: #dc3545;
  border: 1px solid #dc3545;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #dc3545;
    color: white;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 10px;
`;

const ModalMessage = styled.p`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  background: #ccc;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

export default Profile;