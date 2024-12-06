import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';
import { useParams, useNavigate } from 'react-router-dom';
import axiosApi from '../../axios';

const EditReview = () => {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  // 기존 리뷰 데이터 불러오기
  useEffect(() => {
    const fetchReview = async () => {
      try {
        console.log(`=== GET 요청 시작: /reviews/${reviewId} ===`);
        const response = await axiosApi.get(`/reviews/${reviewId}`);
        
        if (response.status === 200) {
          console.log('GET 응답 데이터:', response.data);
          console.log('rate:', response.data.rate);
          console.log('content:', response.data.content);

          setRating(parseInt(response.data.rate));
          setReview(response.data.content);

          console.log('=== 상태 업데이트 완료 ===');
        }
      } catch (error) {
        console.error('리뷰 조회 실패:', error);
        if (error.response) {
          console.error('에러 응답:', error.response.data);
          console.error('에러 상태:', error.response.status);
        }
        alert('리뷰 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchReview();
  }, [reviewId]);

  const handleSubmit = async () => {
    try {
      console.log(`=== PUT 요청 시작: /reviews/${reviewId} ===`);
      const requestData = {
        rate: rating.toString(),
        content: review
      };
      
      console.log('PUT 요청 데이터:', requestData);

      const response = await axiosApi.put(`/reviews/${reviewId}`, requestData);

      if (response.status === 200) {
        console.log('PUT 응답 데이터:', response.data);
        console.log('=== 리뷰 수정 성공 ===');
        alert('리뷰가 성공적으로 수정되었습니다.');
        navigate('/mypage?tab=review');
      }
    } catch (error) {
      console.error('리뷰 수정 실패:', error);
      if (error.response) {
        console.error('에러 응답:', error.response.data);
        console.error('에러 상태:', error.response.status);
        
        switch (error.response.status) {
          case 400:
            alert('400 잘못된 요청입니다. 입력값을 확인해주세요.');
            break;
          case 404:
            alert('404 해당 리뷰를 찾을 수 없습니다.');
            break;
          default:
            alert('리뷰 수정 중 오류가 발생했습니다.');
        }
      } else {
        console.error('네트워크 오류:', error);
        alert('네트워크 오류가 발생했습니다.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/mypage?tab=review');
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
            <CancelButton onClick={handleCancel}>취소</CancelButton>
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
