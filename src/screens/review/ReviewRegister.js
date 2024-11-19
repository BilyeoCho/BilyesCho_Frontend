import React, { useState } from 'react';
import styled from 'styled-components';
import TopBar from '../../components/TopBar'; // TopBar 컴포넌트 추가

const ReviewRegister = () => {
  const [rating, setRating] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <TopBar /> {/* 상단바 컴포넌트 추가 */}
      <ReviewRegisterContainer>
        <SectionTitle>리뷰 등록하기</SectionTitle>
        <ContentWrapper>
          <ImageSection>
            <PlaceholderImage>물품 사진</PlaceholderImage>
          </ImageSection>
          <FormSection>
            <RatingWrapper>
              <RatingLabel>평점</RatingLabel>
              {[1, 2, 3, 4, 5].map((value) => (
                <RatingButton
                  key={value}
                  isSelected={rating === value}
                  onClick={() => setRating(value)}
                >
                  {value}
                </RatingButton>
              ))}
            </RatingWrapper>
            <FilterWrapper>
              {['답변이 빨라요', '친절하고 배려가 넘쳐요', '물품 설명이 적절했어요'].map((category) => (
                <FilterButton
                  key={category}
                  isSelected={selectedCategory === category}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </FilterButton>
              ))}
            </FilterWrapper>
            <InputWrapper>
              <Label>리뷰 제목</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="리뷰 제목을 작성해주세요"
              />
            </InputWrapper>
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
        </ContentWrapper>
      </ReviewRegisterContainer>
    </>
  );
};

const ReviewRegisterContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 60px;
  align-items: flex-start;
`;

const ImageSection = styled.div`
  flex: 1;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 500px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 18px;
  color: #888;
`;

const FormSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RatingLabel = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

const RatingButton = styled.button`
  width: 48px;
  height: 48px;
  background-color: ${(props) => (props.isSelected ? 'black' : '#f5f5f5')};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  border: none;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const FilterButton = styled.button`
  padding: 10px 18px;
  background-color: ${(props) => (props.isSelected ? 'black' : '#f5f5f5')};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
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

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 200px;
`;

const SubmitButton = styled.button`
  padding: 16px 0;
  width: 100%;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  align-self: center;

  &:hover {
    opacity: 0.9;
  }
`;

export default ReviewRegister;
