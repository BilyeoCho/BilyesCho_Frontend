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

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axiosApi.get(`/item/${id}`);
        console.log('Response Data:', response.data); // 응답 데이터 로그
        const { itemName, itemCategory, itemDescription, price, status, itemPhoto } = response.data;
        setItemName(itemName);
        setItemCategory(itemCategory);
        setItemDescription(itemDescription);
        setPrice(price);
        setItemPhoto(itemPhoto);
      } catch (error) {
        console.error('물품 정보 조회 실패:', error.response ? error.response.data : error.message);
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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('itemName', itemName);
    
    if (itemPhoto instanceof File) {
      formData.append('itemPhoto', itemPhoto);
    }

    formData.append('itemCategory', itemCategory);
    formData.append('itemDescription', itemDescription);
    formData.append('price', price);
    formData.append('status', 'AVAILABLE');

    console.log('Submitting data:', {
      itemName,
      itemPhoto,
      itemCategory,
      itemDescription,
      price,
      status: 'AVAILABLE',
    });

    try {
      const response = await axiosApi.put(`/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        navigate('/mypage'); // 수정 완료 후 리다이렉트
      }
    } catch (error) {
      // 상태 코드에 따른 에러 로그 출력
      if (error.response) {
        console.error('Error Status:', error.response.status);
        console.error('Error Data:', error.response.data);
        
        switch (error.response.status) {
          case 400:
            alert('데이터가 유효하지 않습니다. 다시 확인해주세요.');
            break;
          case 403:
            alert('권한이 없습니다.');
            break;
          case 404:
            alert('물품을 찾을 수 없습니다.');
            break;
          case 500:
            alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
            break;
          default:
            alert('알 수 없는 오류가 발생했습니다.');
        }
      } else {
        console.error('Network Error:', error.message);
        alert('네트워크 오류가 발생했습니다.');
      }
    }
  };

  console.log('Fetched ID:', id); // 이 로그를 통해 id 값을 확인

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
          {itemPhoto instanceof File ? (
            <PreviewImage src={URL.createObjectURL(itemPhoto)} alt="Preview" />
          ) : (
            <PreviewImage src={itemPhoto} alt="Preview" />
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

export default EditRegister;