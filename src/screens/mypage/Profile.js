import React, { useState } from 'react';
import styled from 'styled-components';

const Profile = () => {
  const [profileImage, setProfileImage] = useState('/images/default-profile.jpg');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contact, setContact] = useState({
    phone: '',
    kakaoUrl: ''
  });

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

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // 비밀번호 변경 로직 구현
    setIsPasswordModalOpen(false);
  };

  const handleContactUpdate = (e) => {
    e.preventDefault();
    // 연락처 정보 업데이트 로직 구현
    setIsContactModalOpen(false);
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
            <SettingButton onClick={() => setIsPasswordModalOpen(true)}>
              변경하기
            </SettingButton>
          </SettingItem>

          <SettingItem>
            <SettingTitle>연락처 H.P.</SettingTitle>
            <SettingButton onClick={() => setIsContactModalOpen(true)}>
              {contact.phone ? '수정하기' : '등록하기'}
            </SettingButton>
          </SettingItem>

          <DeleteAccountButton>회원탈퇴</DeleteAccountButton>
        </SettingsSection>
      </ProfileContainer>

      {/* 비밀번호 변경 모달 */}
      {isPasswordModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>비밀번호 변경</ModalTitle>
            <form onSubmit={handlePasswordChange}>
              <InputGroup>
                <Label>현재 비밀번호</Label>
                <Input type="password" required />
              </InputGroup>
              <InputGroup>
                <Label>새 비밀번호</Label>
                <Input type="password" required />
              </InputGroup>
              <InputGroup>
                <Label>새 비밀번호 확인</Label>
                <Input type="password" required />
              </InputGroup>
              <ButtonGroup>
                <CancelButton type="button" onClick={() => setIsPasswordModalOpen(false)}>
                  취소
                </CancelButton>
                <ConfirmButton type="submit">변경하기</ConfirmButton>
              </ButtonGroup>
            </form>
          </ModalContainer>
        </ModalOverlay>
      )}

      {/* 연락처 설정 모달 */}
      {isContactModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>연락처 설정</ModalTitle>
            <form onSubmit={handleContactUpdate}>
              <InputGroup>
                <Label>휴대폰 번호</Label>
                <Input 
                  type="tel" 
                  value={contact.phone}
                  onChange={(e) => setContact({...contact, phone: e.target.value})}
                  placeholder="010-0000-0000"
                  required 
                />
              </InputGroup>
              <InputGroup>
                <Label>오픈 카카오톡 방🙏</Label>
                <Input 
                  type="url" 
                  value={contact.kakaoUrl}
                  onChange={(e) => setContact({...contact, kakaoUrl: e.target.value})}
                  placeholder="https://open.kakao.com/..."
                  required 
                />
              </InputGroup>
              <ButtonGroup>
                <CancelButton type="button" onClick={() => setIsContactModalOpen(false)}>
                  취소
                </CancelButton>
                <ConfirmButton type="submit">저장하기</ConfirmButton>
              </ButtonGroup>
            </form>
          </ModalContainer>
        </ModalOverlay>
      )}
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
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  width: 400px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const CancelButton = styled(Button)`
  background: white;
  border: 1px solid #ddd;
  color: #666;

  &:hover {
    background: #f5f5f5;
  }
`;

const ConfirmButton = styled(Button)`
  background: #000;
  border: none;
  color: white;

  &:hover {
    background: #333;
  }
`;

export default Profile;