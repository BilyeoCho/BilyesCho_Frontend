import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ReviewHistory = () => {
  const navigate = useNavigate();

  const reviews = [
    {
      id: 1,
      itemName: '자전거',
      rating: 5,
      comment: '유용하게 사용했습니다.',
      date: '2024-03-15'
    },
    {
      id: 2,
      itemName: '텐트',
      rating: 5,
      comment: '되게 아늑하고 좋았습니다.',
      date: '2024-03-10'
    },
    {
      id: 3,
      itemName: '캠핑의자',
      rating: 5,
      comment: '푹신하고 편안했습니다.',
      date: '2024-03-05'
    },
    {
      id: 4,
      itemName: '가스토치',
      rating: 5,
      comment: '불이 세요.',
      date: '2024-03-01'
    }
  ];

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
          <ReviewCard key={review.id}>
            <ReviewHeader>
              <ItemName>{review.itemName}</ItemName>
              <ReviewDate>{review.date}</ReviewDate>
            </ReviewHeader>
            <Rating>{'⭐'.repeat(review.rating)}</Rating>
            <ReviewText>{review.comment}</ReviewText>
            <EditButton onClick={() => handleEditReview(review.id)}>
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

const ReviewDate = styled.span`
  color: #666;
  font-size: 14px;
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
