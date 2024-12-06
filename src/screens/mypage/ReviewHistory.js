import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axios';

const ReviewHistory = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosApi.get('/reviews/all');
        if (response.status === 200) {
          const reviewsData = response.data;
          const detailedReviews = await Promise.all(
            reviewsData.map(async (review) => {
              const detailResponse = await axiosApi.get(`/reviews/${review.reviewId}`);
              return detailResponse.data;
            })
          );
          setReviews(detailedReviews);
        }
      } catch (error) {
        console.error('리뷰 조회 실패:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleEditReview = (reviewId) => {
    navigate(`/edit-review/${reviewId}`);
  };

  const handleDeleteClick = (reviewId) => {
    setSelectedReviewId(reviewId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axiosApi.delete(`/reviews/${selectedReviewId}`);
      if (response.status === 200) {
        alert('리뷰가 성공적으로 삭제되었습니다.');
        setReviews(reviews.filter(review => review.reviewId !== selectedReviewId));
      }
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
      alert('리뷰 삭제 중 오류가 발생했습니다.');
    }
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedReviewId(null);
  };

  return (
    <Content>
      <ContentHeader>
        <h2>리뷰내역</h2>
      </ContentHeader>

      <ReviewGrid>
        {reviews.map((review) => (
          <ReviewCard key={review.reviewId}>
            <ReviewHeader>
              <ItemName>{review.itemName}</ItemName>
            </ReviewHeader>
            <Rating>{'⭐'.repeat(parseInt(review.rate))}</Rating>
            <ReviewText>{review.content}</ReviewText>
            <ButtonGroup>
              <EditButton onClick={() => handleEditReview(review.reviewId)}>
                편집하기
              </EditButton>
              <DeleteButton onClick={() => handleDeleteClick(review.reviewId)}>
                삭제하기
              </DeleteButton>
            </ButtonGroup>
          </ReviewCard>
        ))}
      </ReviewGrid>

      {showDeleteModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>리뷰 삭제</ModalTitle>
            <ModalText>정말로 이 리뷰를 삭제하시겠습니까?</ModalText>
            <ModalButtonGroup>
              <ModalCancelButton onClick={handleDeleteCancel}>
                취소
              </ModalCancelButton>
              <ModalDeleteButton onClick={handleDeleteConfirm}>
                삭제
              </ModalDeleteButton>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </Content>
  );
};

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    font-size: 24px;
    font-weight: bold;
  }
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const ReviewCard = styled.div`
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 12px;
  background-color: #fff;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ItemName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const Rating = styled.div`
  color: #ffd700;
  font-size: 20px;
  margin-bottom: 12px;
`;

const ReviewText = styled.p`
  color: #333;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const EditButton = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 6px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #999;
    color: #333;
  }
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid #ff4444;
  border-radius: 6px;
  color: #ff4444;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fff0f0;
    border-color: #ff0000;
    color: #ff0000;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const ModalText = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const ModalCancelButton = styled.button`
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 6px;
  color: #666;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ModalDeleteButton = styled.button`
  padding: 8px 16px;
  background-color: #ff4444;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #ff0000;
  }
`;

export default ReviewHistory;
