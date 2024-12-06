import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';
import axiosApi from '../../axios';

const ReviewRegister = () => {
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [rate, setRate] = useState('5');
  const [content, setContent] = useState('');
  const [reviewPhoto, setReviewPhoto] = useState(location.state?.itemPhoto || '');
  const userId = location.state?.rentId || '';

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('rate', rate);
      formData.append('content', content);
      formData.append('userId', userId);
      formData.append('itemId', itemId);
      
      if (reviewPhoto) {
        try {
          console.log('변환 전 reviewPhoto URL:', reviewPhoto);
          
          // URL에서 파일명 추출
          const fileName = reviewPhoto.split('/').pop();
          // 빈 Blob 생성
          const blob = new Blob([''], { type: 'image/jpeg' });
          // File 객체 생성
          const file = new File([blob], fileName, { type: 'image/jpeg' });
          
          formData.append('reviewPhoto', file);
          console.log('파일 변환 성공:', file.name);
          
        } catch (error) {
          console.error('이미지 변환 중 오류:', error);
          formData.append('reviewPhoto', reviewPhoto);
        }
      }

      console.log('=== FormData 내용 확인 ===');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      console.log('=== 요청 데이터 객체 확인 ===');
      console.log({
        rate,
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
      
      if (response.status === 200) {
        const reviewId = response.data.reviewId;
        console.log('생성된 리뷰 ID:', reviewId);
        navigate('/mypage');
      }
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
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
              {reviewPhoto ? (
                <img src={reviewPhoto} alt="물품 이미지" />
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
