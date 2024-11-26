import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosApi from '../../axios';

const ItemRegisterMain = () => {
  const navigate = useNavigate();
  const [itemPhoto, setItemPhoto] = useState(null); // 변수명 변경
  const [itemCategory, setItemCategory] = useState(null); // 변수명 변경
  const [itemName, setItemName] = useState(''); // 변수명 변경
  const [itemDescription, setItemDescription] = useState(''); // 변수명 변경
  const [userId, setUserId] = useState(localStorage.getItem("userId") || ''); // userId 자동 설정
  const [price, setPrice] = useState(''); // 변수명 변경
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItemPhoto(reader.result); // 변수명 변경
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryClick = (category) => {
    setItemCategory(category); // 변수명 변경
  };

  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append('itemPhoto', itemPhoto); // 변수명 변경
    formData.append('itemCategory', itemCategory); // 변수명 변경
    formData.append('itemName', itemName); // 변수명 변경
    formData.append('itemDescription', itemDescription); // 변수명 변경
    formData.append('userId', userId); // 변수명 변경
    formData.append('price', price); // 변수명 변경

    console.log('전송할 데이터입니다.:', {
        itemPhoto: itemPhoto, // 변수명 변경
        itemCategory: itemCategory, // 변수명 변경
        itemName: itemName, // 변수명 변경
        itemDescription: itemDescription, // 변수명 변경
        price: price, // 변수명 변경
    });

    try {
      const response = await axiosApi.post('/regist', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        navigate('/'); // 성공 시 이동
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          console.error('잘못된 요청:', data);
        } else if (status === 500) {
          console.error('서버 오류:', data);
        }
      } else {
        console.error('물품 등록 실패:', error.message);
      }
    }
  };

  return (
    <RegisterContainer>
      <TopSection>
        <LeftSection>
          <TitleSection>
            <RegisterTitle>물품 등록하기</RegisterTitle>
            <RegisterSubtitle>소중한 물품을 등록해주세요</RegisterSubtitle>
          </TitleSection>
          <ImageUploadButton onClick={() => document.getElementById('imageInput').click()}>
            <UploadText>사진을 첨부해주세요</UploadText>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </ImageUploadButton>
        </LeftSection>
        <ImagePreviewSection>
          {itemPhoto ? (
            <PreviewImage src={itemPhoto} alt="Preview" />
          ) : (
            <UploadText style={{ color: '#666' }}>물품사진</UploadText>
          )}
        </ImagePreviewSection>
      </TopSection>

      <BottomSection>
        <GridContainer>
          <GridItem>
            <InputGroup>
              <Label>상품명</Label>
              <Input 
                placeholder="제품명을 입력해주세요" 
                value={itemName} 
                onChange={(e) => setItemName(e.target.value)} // 변수명 변경
              />
              <SubText>물품 이름 설명</SubText>
            </InputGroup>
          </GridItem>

          <GridItem>
            <CategorySection>
              <Label>카테고리</Label>
              <CategoryWrapper>
                {['SPORTS', 'FASHION', 'ELECTRONICS', 'INSTRUMENTS', 'CAMERA', 'BOOK', 'OTHERS'].map((category) => (
                  <CategoryButton 
                    key={category}
                    isSelected={itemCategory === category} // 변수명 변경
                    onClick={() => handleCategoryClick(category)} // 변수명 변경
                  >
                    {category}
                  </CategoryButton>
                ))}
              </CategoryWrapper>
              <SubText>물품 카테고리 선택</SubText>
            </CategorySection>
          </GridItem>

          <GridItem>
            <InputGroup>
              <Label>가격</Label>
              <Input 
                placeholder="가격을 입력해주세요" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} // 변수명 변경
              />
              <SubText>대여 가격 설정</SubText>
            </InputGroup>
          </GridItem>

          <GridItem>
            <InputGroup>
              <Label>상세 설명</Label>
              <TextArea 
                placeholder="물품에 대한 설명해주세요" 
                value={itemDescription} 
                onChange={(e) => setItemDescription(e.target.value)} // 변수명 변경
              />
              <SubText>물품 상세 설명</SubText>
            </InputGroup>
          </GridItem>
        </GridContainer>
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
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
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;
  gap: 80px;
  width: 100%;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  width: 400px;
  height: 300px;
`;

const TitleSection = styled.div`
  width: 100%;
  text-align: left;
`;

const ImageUploadButton = styled.div`
  width: 100%;
  height: 48px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const RegisterTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 12px;
`;

const RegisterSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
`;

const UploadText = styled.span`
  color: white;
  font-size: 14px;
`;

const ImagePreviewSection = styled.div`
  width: 500px;
  height: 300px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  background-color: ${props => props.isSelected ? 'black' : '#f5f5f5'};
  color: ${props => props.isSelected ? 'white' : 'black'};
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${props => props.isSelected ? 'black' : '#e0e0e0'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
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