import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';
import { useParams } from 'react-router-dom';

const EditReview = () => {
  const { reviewId } = useParams();
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  // 리뷰 데이터 불러오기 (예시)
  useEffect(() => {
    // API 호출로 대체될 부분
    console.log(`리뷰 ID ${reviewId}의 데이터를 불러옵니다.`);
  }, [reviewId]);

  const handleSubmit = () => {
    // 리뷰 수정 로직 구현
    console.log('리뷰가 수정되었습니다.');
  };

  return (
    <>
      <TopBar />
      <ReviewEditContainer>
        <FormSection>
          <SectionTitle>리뷰 편집하기</SectionTitle>
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
          <InputWrapper>
            <Label>리뷰</Label>
            <TextArea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="솔직한 리뷰를 작성해주세요"
            />
          </InputWrapper>
          <ButtonGroup>
            <CancelButton>취소</CancelButton>
            <SubmitButton onClick={handleSubmit}>리뷰 수정하기</SubmitButton>
          </ButtonGroup>
        </FormSection>
      </ReviewEditContainer>
    </>
  );
};

const ReviewEditContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
`;

const FormSection = styled.div`
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const CancelButton = styled.button`
  padding: 16px 32px;
  background-color: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const SubmitButton = styled.button`
  padding: 16px 32px;
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

export default EditReview;
