import React, { useState } from 'react';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';

const ReviewRegister = () => {
  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <ReviewRegisterContainer>
      <TopBar />
      <ContentWrapper>
        <ImageSection>
          <ItemImage>물품 사진</ItemImage>
        </ImageSection>
        <FormSection>
          <SectionTitle>리뷰 등록하기</SectionTitle>
          <Form>
            <RatingWrapper>
              <Label>평점</Label>
              <RatingOptions>
                {[1, 2, 3, 4, 5].map((value) => (
                  <RatingButton
                    key={value}
                    isSelected={rating === value}
                    onClick={() => handleRatingClick(value)}
                  >
                    {value}
                  </RatingButton>
                ))}
              </RatingOptions>
            </RatingWrapper>

            <CategoryWrapper>
              <Label>리뷰 필터링</Label>
              <CategoryOptions>
                {['답변이 빨라요', '친절하고 배려가 넘쳐요', '물품 설명이 적절했어요'].map((category) => (
                  <CategoryButton
                    key={category}
                    isSelected={selectedCategory === category}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </CategoryButton>
                ))}
              </CategoryOptions>
            </CategoryWrapper>

            <InputGroup>
              <Label>리뷰 제목</Label>
              <Input placeholder="리뷰 제목을 작성해주세요" />
            </InputGroup>

            <InputGroup>
              <Label>리뷰</Label>
              <TextArea placeholder="솔직한 리뷰를 작성해주세요" />
            </InputGroup>

            <SubmitButton>리뷰 제출하기</SubmitButton>
          </Form>
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
  justify-content: space-between;
  gap: 40px;
  margin-top: 40px;
`;

const ImageSection = styled.div`
  flex: 1;
`;

const ItemImage = styled.div`
  width: 100%;
  height: 500px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #999;
`;

const FormSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

const RatingOptions = styled.div`
  display: flex;
  gap: 8px;
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
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CategoryOptions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.isSelected ? 'black' : '#f5f5f5')};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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

export default ReviewRegister;
