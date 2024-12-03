import React, { useState } from 'react';
import styled from 'styled-components';
import axiosApi from '../../axios';

const Profile = () => {
  const [profileImage, setProfileImage] = useState('/images/default-profile.jpg');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    userName: '',
    userPhoto: null,
    openKakaoLink: ''
  });

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
      const response = await axiosApi.put('/users/update', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 200) { 
        alert('프로필이 성공적으로 업데이트되었습니다.');
      }
    } catch (error) {
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
          <DeleteAccountButton type="button">회원탈퇴</DeleteAccountButton>
        </FormSection>
      </ProfileForm>
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
  text-align: center;
  margin-bottom: 32px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
`;

const ImageUploadLabel = styled.label`
  display: inline-block;
  padding: 8px 16px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

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

export default Profile;