import React, { useState } from 'react';
import styled from 'styled-components';

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
      <TopSection>
        <TitleSection>
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
        </TitleSection>
      </TopSection>

      <BottomSection>
        <GridContainer>
          <GridItem>
            <InputGroup>
              <Label>상품명</Label>
              <Input placeholder="제품명을 입력해주세요" />
              <SubText>물품 이름 설명</SubText>
            </InputGroup>
          </GridItem>

          <GridItem>
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
          </GridItem>

          <GridItem>
            <InputGroup>
              <Label>가격</Label>
              <Input placeholder="가격을 입력해주세요" />
              <SubText>대여 가격 설정</SubText>
            </InputGroup>
          </GridItem>

          <GridItem>
            <InputGroup>
              <Label>상세 설명</Label>
              <TextArea placeholder="물품에 대한 설명해주세요" />
              <SubText>물품 상세 설명</SubText>
            </InputGroup>
          </GridItem>
        </GridContainer>
        <SubmitButton>Submit</SubmitButton>
      </BottomSection>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const TopSection = styled.div`
  margin-bottom: 40px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const ImageUploadButton = styled.div`
  width: 100%;
  max-width: 520px;
  height: 120px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 16px;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const RegisterTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const RegisterSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 8px 0 0 0;
`;

const UploadText = styled.span`
  color: #666;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
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
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #000;
  }
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
  margin: 8px 0;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 150px;
  resize: vertical;
  outline: none;
  
  &:focus {
    border-color: #000;
  }
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
`;

const GridItem = styled.div`
  width: 100%;
`;

export default ItemRegisterMain