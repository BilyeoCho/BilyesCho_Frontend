import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../axios';

const EditRegister = () => {
  const { id } = useParams(); // 물품 ID 가져오기
  const navigate = useNavigate();
  
  const [itemPhoto, setItemPhoto] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('AVAILABLE');

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axiosApi.get(`/item/${id}`);
        const { itemName, itemCategory, itemDescription, price, status, itemPhoto } = response.data;
        setItemName(itemName);
        setItemCategory(itemCategory);
        setItemDescription(itemDescription);
        setPrice(price);
        setStatus(status);
        setItemPhoto(itemPhoto);
      } catch (error) {
        console.error('물품 정보 조회 실패:', error);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItemPhoto(file);
    }
  };

  const handleCategoryClick = (category) => {
    setItemCategory(category);
  };

  const handleStatusClick = (status) => {
    setStatus(status);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('itemPhoto', itemPhoto);
    formData.append('itemCategory', itemCategory);
    formData.append('itemDescription', itemDescription);
    formData.append('price', price);
    formData.append('status', status);

    try {
      await axiosApi.put(`/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/mypage'); // 수정 완료 후 리다이렉트
    } catch (error) {
      console.error('물품 수정 실패:', error);
    }
  };

  return (
    <RegisterContainer>
      <TopSection>
        <LeftSection>
          <TitleSection>
            <RegisterTitle>물품 수정하기</RegisterTitle>
            <RegisterSubtitle>소중한 물품을 수정해주세요</RegisterSubtitle>
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
            <PreviewImage src={URL.createObjectURL(itemPhoto)} alt="Preview" />
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
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="제품명을 입력해주세요" 
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
                    isSelected={itemCategory === category}
                    onClick={() => handleCategoryClick(category)}
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
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="가격을 입력해주세요" 
              />
              <SubText>대여 가격 설정</SubText>
            </InputGroup>
          </GridItem>

          <GridItem>
            <CategorySection>
              <Label>상태</Label>
              <StatusWrapper>
                {['AVAILABLE', 'RENTED'].map((status) => (
                  <StatusButton 
                    key={status}
                    isSelected={status === status}
                    onClick={() => handleStatusClick(status)}
                    status={status}
                  >
                    {status}
                  </StatusButton>
                ))}
              </StatusWrapper>
              <SubText>물품 상태 선택</SubText>
            </CategorySection>
          </GridItem>

          <GridItem style={{ gridColumn: '1 / -1' }}>
            <InputGroup>
              <Label>상세 설명</Label>
              <TextArea 
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="물품에 대한 설명해주세요" 
              />
              <SubText>물품 상세 설명</SubText>
            </InputGroup>
          </GridItem>
        </GridContainer>
        <SubmitButton onClick={handleSubmit}>수정하기</SubmitButton>
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

const StatusWrapper = styled(CategoryWrapper)`
  margin-top: 8px;
`;

const StatusButton = styled(CategoryButton)`
  ${props => {
    switch (props.status) {
      case 'AVAILABLE':
        return props.isSelected && `
          background-color: #0c8599;
        `;
      case 'RENTED':
        return props.isSelected && `
          background-color: #2f9e44;
        `;
      default:
        return '';
    }
  }}
`;

export default EditRegister;
