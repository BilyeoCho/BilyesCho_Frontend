import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';
import axiosApi from '../../axios';

const ReviewRegister = () => {
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [rate, setRate] = useState('5');
  const [reviewCategory, setReviewCategory] = useState('');
  const [content, setContent] = useState('');
  const [reviewPhoto, setReviewPhoto] = useState(null);

  useEffect(() => {
    if (location.state?.itemPhoto) {
      setReviewPhoto(location.state.itemPhoto);
    }
  }, [location.state?.itemPhoto]);

  const handleCategoryClick = (category) => {
    setReviewCategory(category);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const userId = localStorage.getItem('userId');
      
      formData.append('rate', rate);
      formData.append('reviewCategory', reviewCategory);
      formData.append('content', content);
      formData.append('userId', userId);
      formData.append('itemId', itemId);
      
      if (reviewPhoto) {
        formData.append('reviewPhoto', reviewPhoto);
      }

      console.log('=== FormData 내용 확인 ===');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      console.log('=== 요청 데이터 객체 확인 ===');
      console.log({
        rate,
        reviewCategory,
        content,
        userId,
        itemId,
        reviewPhoto
      });

      const response = await axiosApi.post('/reviews/write', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('=== 서버 응답 확인 ===');
      console.log('응답 상태:', response.status);
      console.log('응답 데이터:', response.data);

      navigate('/review');
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
      console.error('에러 응답:', error.response?.data);
      alert('리뷰 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <TopBar />
      <ReviewRegisterContainer>
        <TopSection>
          <ImageSection>
            <PlaceholderImage>
              {location.state?.itemPhoto ? (
                <img src={location.state.itemPhoto} alt="물품 이미지" />
              ) : (
                "물품 사진"
              )}
            </PlaceholderImage>
          </ImageSection>
          <FormSection>
            <SectionTitle>리뷰 등록하기</SectionTitle>
            <RatingWrapper>
              <RatingLabel>평점</RatingLabel>
              <RatingButtons>
                {['1', '2', '3', '4', '5'].map((value) => (
                  <RatingButton
                    key={value}
                    isSelected={rate === value}
                    onClick={() => setRate(value)}
                  >
                    {value}
                  </RatingButton>
                ))}
              </RatingButtons>
              <SubText>평점을 선택해주세요</SubText>
            </RatingWrapper>
            <FilterWrapper>
              <FilterLabel>리뷰 필터링</FilterLabel>
              <FilterButtons>
                {['답변이 빨라요', '친절하고 배려가 넘쳐요', '물품 설명이 적절했어요'].map((category) => (
                  <FilterButton
                    key={category}
                    isSelected={reviewCategory === category}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </FilterButton>
                ))}
              </FilterButtons>
            </FilterWrapper>
            <SubText>물품 카테고리 선택</SubText>
            <InputWrapper>
              <Label>리뷰</Label>
              <TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="솔직한 리뷰를 작성해주세요"
              />
            </InputWrapper>
            <SubmitButton onClick={handleSubmit}>리뷰 제출하기</SubmitButton>
          </FormSection>
        </TopSection>
      </ReviewRegisterContainer>
    </>
  );
};

const ReviewRegisterContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
`;

const TopSection = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  width: 100%;
`;

const ImageSection = styled.div`
  flex: 1;
`;

const FormSection = styled.div`
  flex: 1;  
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PlaceholderImage = styled.div`
  width: 100%; 
  height: 700px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 18px;
  color: #888;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
`;

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RatingLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const RatingButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const RatingButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${(props) => (props.isSelected ? 'black' : '#f5f5f5')};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  border: none;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isSelected ? 'black' : '#e0e0e0')};
    transform: translateY(-2px);
  }
`;

const SubText = styled.span`
  font-size: 14px;
  color: #888;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.isSelected ? 'black' : '#f5f5f5')};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isSelected ? 'black' : '#e0e0e0')};
    transform: translateY(-2px);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 150px;
`;

const SubmitButton = styled.button`
  padding: 16px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    opacity: 0.9;
  }
`;

export default ReviewRegister;
