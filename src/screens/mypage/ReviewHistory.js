import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axios';

const ReviewHistory = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

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
            <EditButton onClick={() => handleEditReview(review.reviewId)}>
              편집하기
            </EditButton>
          </ReviewCard>
        ))}
      </ReviewGrid>
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

export default ReviewHistory;
