import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axios';

const ReviewMain = () => {
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [currentRegisterPage, setCurrentRegisterPage] = useState(1);
  const [borrowedItems, setBorrowedItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const reviewsPerPage = 4;
  const itemsPerPage = 2;

  const totalReviewPages = Math.ceil(reviews.length / reviewsPerPage);
  const totalRegisterPages = Math.ceil(borrowedItems.length / itemsPerPage);

  const handleItemClick = (itemId, itemName, itemPhoto, rentId) => {
    console.log('선택된 아이템 ID:', itemId);
    console.log('선택된 아이템 이름:', itemName);
    console.log('선택된 아이템 이미지:', itemPhoto);
    console.log('선택된 렌트 ID:', rentId);
    navigate(`/review/register/${itemId}`, { state: { itemPhoto, rentId } });
  };

  // 전체 리뷰 조회
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosApi.get('/reviews/all');
        if (response.status === 200) {
          setReviews(response.data);
        }
      } catch (error) {
        console.error('리뷰 조회 실패:', error);
      }
    };

    fetchReviews();
  }, []);

  // 빌린 물품 목록 조회
  useEffect(() => {
    const fetchBorrowedItems = async () => {
      try {
        // 빌린 물품 목록 조회
        const borrowedResponse = await axiosApi.get('/rents/borrowed');
        const borrowedData = borrowedResponse.data;
        
        console.log('빌린 물품 데이터:', borrowedData); // 데이터 확인용 로그 추가
        
        // 각 물품의 상세 정보 조회
        const itemDetailsPromises = borrowedData.map(async (borrowed) => {
          const itemResponse = await axiosApi.get(`/item/${borrowed.itemId}`);
          return {
            itemId: itemResponse.data.itemId,
            itemName: itemResponse.data.itemName,
            price: `₩${itemResponse.data.price.toLocaleString()}`,
            itemPhoto: itemResponse.data.itemPhoto,
            rentId: borrowed.rentId
          };
        });
        
        const itemResponses = await Promise.all(itemDetailsPromises);
        console.log('최종 가공된 데이터:', itemResponses);
        
        setBorrowedItems(itemResponses);
      } catch (error) {
        console.error('물품 목록 조회 실패:', error);
      }
    };

    fetchBorrowedItems();
  }, []);

  return (
    <ReviewContainer>
      <CenteredSection>
        <SectionTitle>전체리뷰</SectionTitle>
        <Subtitle>고객님들의 솔직한 후기를 확인하세요.</Subtitle>
      </CenteredSection>

      <Section>
        <SectionTitle>물품 리뷰</SectionTitle>
        <ReviewGrid>
          {reviews
            .slice((currentReviewPage - 1) * reviewsPerPage, currentReviewPage * reviewsPerPage)
            .map((review) => (
              <ReviewCard key={review.reviewId}>
                <ItemName>{review.itemName}</ItemName>
                <ReviewUser>{review.userId}</ReviewUser>
                <ReviewRating>
                  {'⭐'.repeat(parseInt(review.rate))}
                </ReviewRating>
                <ReviewComment>{review.content}</ReviewComment>
              </ReviewCard>
            ))}
        </ReviewGrid>
        <PaginationWrapper>
          <Pagination
            count={totalReviewPages}
            page={currentReviewPage}
            onChange={(_, page) => setCurrentReviewPage(page)}
          />
        </PaginationWrapper>
      </Section>

      <Section>
        <SectionTitle>리뷰 등록하기</SectionTitle>
        <ItemList>
          {borrowedItems
            .slice((currentRegisterPage - 1) * itemsPerPage, currentRegisterPage * itemsPerPage)
            .map((item) => (
              <ItemButton 
                key={item.itemId} 
                onClick={() => handleItemClick(item.itemId, item.itemName, item.itemPhoto, item.rentId)}
              >
                <ItemInfo>
                  <ItemTitle>{item.itemName}</ItemTitle>
                </ItemInfo>
                <PriceAndArrow>
                  <ItemPrice>{item.price}</ItemPrice>
                  <ArrowIcon>{'>'}</ArrowIcon>
                </PriceAndArrow>
              </ItemButton>
            ))}
        </ItemList>
        <PaginationWrapper>
          <Pagination
            count={totalRegisterPages}
            page={currentRegisterPage}
            onChange={(_, page) => setCurrentRegisterPage(page)}
          />
        </PaginationWrapper>
      </Section>
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CenteredSection = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;
`;

const ReviewCard = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: white;
`;

const ReviewComment = styled.div`
  font-size: 14px;
  color: #333;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
`;

const ItemButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  width: 100%;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const PriceAndArrow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ArrowIcon = styled.div`
  font-size: 16px;
  color: #666;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;


const ItemName = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const ReviewUser = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #666;
`;

const ReviewRating = styled.div`
  color: #FFD700;
  font-size: 20px;
  margin: 8px 0;
`;

export default ReviewMain;
