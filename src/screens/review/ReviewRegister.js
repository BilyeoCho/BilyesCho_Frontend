import React, { useState } from 'react';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';

const ReviewRegister = () => {
  const [rating, setRating] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [review, setReview] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <TopBar />
      <ReviewRegisterContainer>
        <TopSection>
          <ImageSection>
            <PlaceholderImage>물품 사진</PlaceholderImage>
          </ImageSection>
          <FormSection>
            <SectionTitle>리뷰 등록하기</SectionTitle>
            <RatingWrapper>
              <RatingLabel>평점</RatingLabel>
              <RatingButtons>
                {[1, 2, 3, 4, 5].map((value) => (
                  <RatingButton
                    key={value}
                    isSelected={rating === value}
                    onClick={() => setRating(value)}
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
                    isSelected={selectedCategory === category}
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
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="솔직한 리뷰를 작성해주세요"
              />
            </InputWrapper>
            <SubmitButton>리뷰 제출하기</SubmitButton>
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
