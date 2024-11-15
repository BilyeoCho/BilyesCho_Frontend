import React, { useState } from 'react';
import styled from 'styled-components';
import InputComponent from '../../components/InputComponent';

const ItemRegisterMain = () => {
  const [imagePreview, setImagePreview] = useState(null);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <RegisterContainer>
      <RegisterTitle>물품 등록하기</RegisterTitle>
      <RegisterSubtitle>소중한 물품을 등록해주세요</RegisterSubtitle>
      
      <ImageUploadButton onClick={() => document.getElementById('imageInput').click()}>
        {imagePreview ? (
          <PreviewImage src={imagePreview} alt="Preview" />
        ) : (
          <UploadText>사진을 첨부해주세요</UploadText>
        )}
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </ImageUploadButton>

      <FormSection>
        <InputGroup>
          <Label>상품명</Label>
          <Input placeholder="제품명을 입력해주세요" />
          <SubText>물품 이름 설명</SubText>
        </InputGroup>

        <InputGroup>
          <Label>가격</Label>
          <Input placeholder="가격을 입력해주세요" />
          <SubText>대여 가격 설정</SubText>
        </InputGroup>

        <CategorySection>
          <Label>카테고리</Label>
          <CategoryWrapper>
            <CategoryButton>Sports</CategoryButton>
            <CategoryButton>Fashion</CategoryButton>
            <CategoryButton>Electronics</CategoryButton>
            <CategoryButton>Instruments</CategoryButton>
            <CategoryButton>Camera</CategoryButton>
            <CategoryButton>Book</CategoryButton>
            <CategoryButton>Others</CategoryButton>
          </CategoryWrapper>
          <SubText>물품 카테고리 선택</SubText>
        </CategorySection>

        <InputGroup>
          <Label>상세 설명</Label>
          <TextArea placeholder="물품에 대한 설명해주세요" />
          <SubText>물품 상세 설명</SubText>
        </InputGroup>

        <SubmitButton>Submit</SubmitButton>
      </FormSection>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const RegisterTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const RegisterSubtitle = styled.p`
  color: #666;
  margin-bottom: 32px;
`;

const ImageUploadButton = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 40px;
`;

const UploadText = styled.span`
  color: #666;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const SubText = styled.span`
  font-size: 14px;
  color: #666;
`;

const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CategoryWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 150px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 16px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

export default ItemRegisterMain;