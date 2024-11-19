import React, { useState } from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';

const ReviewMain = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviews = [
    { id: 1, name: '장성우', rating: 5, content: 'The meatball platter was incredible!' },
    { id: 2, name: '정준서', rating: 5, content: 'The spaghetti & meatballs were so flavorful!' },
    { id: 3, name: '김태양', rating: 5, content: "Best meatballs I've ever had!" },
    { id: 4, name: '홍길동', rating: 5, content: "Best meatballs I've ever had!" },
    { id: 5, name: '김철수', rating: 5, content: "Really delicious!" },
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  return (
    <ReviewContainer>
      <Section>
        <SectionTitle>전체리뷰</SectionTitle>
        <Subtitle>고객님들의 솔직한 후기를 확인하세요.</Subtitle>
      </Section>

      <ReviewSection>
        <SectionTitle>물품 리뷰</SectionTitle>
        <FilterWrapper>
          <FilterButton>답변이 빨라요</FilterButton>
          <FilterButton>친절하고 배려가 넘쳐요</FilterButton>
          <FilterButton>물품 설명이 적절했어요</FilterButton>
        </FilterWrapper>
        <CardGrid>
          {reviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((review) => (
            <ReviewCard key={review.id}>
              <ReviewHeader>
                <ReviewerName>{review.name}</ReviewerName>
                <Rating>{'⭐'.repeat(review.rating)}</Rating>
              </ReviewHeader>
              <ReviewContent>{review.content}</ReviewContent>
            </ReviewCard>
          ))}
        </CardGrid>
        <PaginationWrapper>
          <Pagination count={totalPages} page={currentPage} onChange={(_, page) => setCurrentPage(page)} />
        </PaginationWrapper>
      </ReviewSection>
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
`;

const Section = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const SectionTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
`;

const ReviewSection = styled.div`
  margin-top: 60px;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 32px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: #f5f5f5;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
`;

const ReviewCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const ReviewerName = styled.div`
  font-weight: bold;
`;

const Rating = styled.div`
  color: #f5a623;
`;

const ReviewContent = styled.p`
  font-size: 14px;
  color: #333;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default ReviewMain;
