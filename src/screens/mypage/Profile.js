import React, { useState } from 'react';
import styled from 'styled-components';

const Profile = () => {
  const [profileImage, setProfileImage] = useState('/images/default-profile.jpg');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Content>
      <ContentHeader>
        <h2>프로필</h2>
      </ContentHeader>

      <ProfileContainer>
        <ProfileSection>
          <ProfileImageContainer>
            <ProfileImage src={profileImage} alt="프로필 이미지" />
            <ImageUploadLabel htmlFor="profile-upload">
              사진 변경
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </ImageUploadLabel>
          </ProfileImageContainer>
        </ProfileSection>

        <SettingsSection>
          <SettingItem>
            <SettingTitle>비밀번호 변경</SettingTitle>
            <SettingButton>변경하기</SettingButton>
          </SettingItem>

          <SettingItem>
            <SettingTitle>연락처 링크</SettingTitle>
            <SettingButton>등록하기</SettingButton>
          </SettingItem>

          <DeleteAccountButton>회원탈퇴</DeleteAccountButton>
        </SettingsSection>
      </ProfileContainer>
    </Content>
  );
};

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    font-size: 24px;
    font-weight: bold;
  }
`;

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ProfileSection = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
`;

const ImageUploadLabel = styled.label`
  display: inline-block;
  padding: 8px 16px;
  background-color: #000;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #333;
  }
`;

const SettingsSection = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #eee;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const SettingTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const SettingButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const DeleteAccountButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 24px;
  border: 1px solid #dc3545;
  background-color: #fff;
  color: #dc3545;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #dc3545;
    color: #fff;
  }
`;

export default Profile;