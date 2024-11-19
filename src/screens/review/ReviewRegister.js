import React, { useState } from 'react';
import styled from 'styled-components';
import TopBar from '../../components/TopBar'; // 상단 바 추가

const ReviewRegister = () => {
  const [selectedRating, setSelectedRating] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <ReviewRegisterContainer>
      <TopBar /> {/* 상단 바 추가 */}
      <ContentWrapper>
        <ImageSection>
          <ImagePlaceholder>물품 사진</ImagePlaceholder>
        </ImageSection>
        <FormSection>
          <SectionTitle>리뷰 등록하기</SectionTitle>
          <RatingWrapper>
            <Label>평점</Label>
            <RatingButtons>
              {[1, 2, 3, 4, 5].map((rating) => (
                <RatingButton
                  key={rating}
                  isSelected={selectedRating === rating}
                  onClick={() => handleRatingClick(rating)}
                >
                  {rating}
                </RatingButton>
              ))}
            </RatingButtons>
          </RatingWrapper>
          <CategoryWrapper>
            <Label>리뷰 필터링</Label>
            <FilterButtons>
              {['답변이 빨라요', '친절하고 배려가 넘쳐요', '물품 설명이 적절했어요'].map((category) => (
                <CategoryButton
                  key={category}
                  isSelected={selectedCategory === category}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </CategoryButton>
              ))}
            </FilterButtons>
          </CategoryWrapper>
          <InputWrapper>
            <Label>리뷰 제목</Label>
            <Input
              placeholder="리뷰 제목을 작성해주세요"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>리뷰</Label>
            <TextArea
              placeholder="솔직한 리뷰를 작성해주세요"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
            />
          </InputWrapper>
          <SubmitButton>리뷰 제출하기</SubmitButton>
        </FormSection>
      </ContentWrapper>
    </ReviewRegisterContainer>
  );
};

const ReviewRegisterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 40px;
`;

const ImageSection = styled.div`
  flex: 1;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 400px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const FormSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 24px;
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

const RatingButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const RatingButton = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.isSelected ? 'black' : '#f5f5f5')};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isSelected ? 'black' : '#e0e0e0')};
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.isSelected ? 'black' : '#f5f5f5')};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isSelected ? 'black' : '#e0e0e0')};
  }
`;

const InputWrapper = styled.div`
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

  &:focus {
    border-color: black;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 120px;
  resize: vertical;

  &:focus {
    border-color: black;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 16px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export default ReviewRegister;
