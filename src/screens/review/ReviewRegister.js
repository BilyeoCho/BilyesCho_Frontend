import React from 'react';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';

const ReviewRegister = () => {
  return (
    <PageContainer>
      <TopBar />
      <RegisterContainer>
        <ImageSection>
          <ImagePlaceholder>물품 사진</ImagePlaceholder>
        </ImageSection>
        <FormSection>
          <SectionTitle>리뷰 등록하기</SectionTitle>
          <RatingWrapper>
            <RatingButton>1</RatingButton>
            <RatingButton>2</RatingButton>
            <RatingButton>3</RatingButton>
            <RatingButton>4</RatingButton>
            <RatingButton selected>5</RatingButton>
          </RatingWrapper>
          <FilterWrapper>
            <FilterButton>답변이 빨라요</FilterButton>
            <FilterButton>친절하고 배려가 넘쳐요</FilterButton>
            <FilterButton>물품 설명이 적절했어요</FilterButton>
          </FilterWrapper>
          <InputWrapper>
            <InputLabel>리뷰 제목</InputLabel>
            <Input placeholder="리뷰 제목을 작성해주세요" />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>리뷰</InputLabel>
            <TextArea placeholder="솔직한 리뷰를 작성해주세요" />
          </InputWrapper>
          <SubmitButton>리뷰 제출하기</SubmitButton>
        </FormSection>
      </RegisterContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const RegisterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 40px;
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 400px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  border-radius: 8px;
`;

const FormSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
`;

const RatingWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const RatingButton = styled.button`
  padding: 10px;
  border-radius: 50%;
  border: 1px solid ${(props) => (props.selected ? 'black' : '#ddd')};
  background-color: ${(props) => (props.selected ? 'black' : 'white')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  cursor: pointer;

  &:hover {
    border-color: black;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: black;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  min-height: 150px;
  outline: none;

  &:focus {
    border-color: black;
  }
`;

const SubmitButton = styled.button`
  padding: 16px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export default ReviewRegister;
