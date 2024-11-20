import React, { useState } from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ReviewMain = () => {
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [currentRegisterPage, setCurrentRegisterPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate(); // 페이지 전환을 위한 useNavigate 훅 사용

  const reviews = [
    { user: '장성우', rating: 5, comment: '유용하게 사용했습니다.' },
    { user: '정준서', rating: 5, comment: '되게 아늑하고 좋았습니다.' },
    { user: '김태양', rating: 5, comment: '푹신하고 편안했습니다.' },
    { user: '홍길동', rating: 5, comment: '불이 세요.' },
    { user: '박영희', rating: 4, comment: '사용감이 좋았습니다.' },
    { user: '이철수', rating: 4, comment: '다음에 또 빌리고 싶습니다.' },
  ];

  const items = [
    { id: 1, title: '텐트', duration: '24시간', price: '₩10,000' },
    { id: 2, title: '캠핑의자', duration: '48시간', price: '₩5,000' },
    { id: 3, title: '랜턴', duration: '12시간', price: '₩3,000' },
    { id: 4, title: '취사도구', duration: '36시간', price: '₩7,000' },
  ];

  const reviewsPerPage = 4;
  const itemsPerPage = 2;

  const totalReviewPages = Math.ceil(reviews.length / reviewsPerPage);
  const totalRegisterPages = Math.ceil(items.length / itemsPerPage);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleItemClick = (itemId) => {
    navigate(`/review/register/${itemId}`); // 아이템 클릭 시 리뷰 등록 페이지로 이동
  };

  return (
    <ReviewContainer>
      <CenteredSection>
        <SectionTitle>전체리뷰</SectionTitle>
        <Subtitle>고객님들의 솔직한 후기를 확인하세요.</Subtitle>
      </CenteredSection>

      <Section>
        <SectionTitle>물품 리뷰</SectionTitle>
        <FilterWrapper>
          {['답변이 빨라요', '친절하고 배려가 넘쳐요', '물품 설명이 적절했어요'].map((category) => (
            <FilterButton
              key={category}
              isSelected={selectedCategory === category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </FilterButton>
          ))}
        </FilterWrapper>
        <ReviewGrid>
          {reviews
            .slice((currentReviewPage - 1) * reviewsPerPage, currentReviewPage * reviewsPerPage)
            .map((review, index) => (
              <ReviewCard key={index}>
                <ReviewUser>{review.user}</ReviewUser>
                <ReviewRating>
                  {'⭐'.repeat(review.rating)}
                </ReviewRating>
                <ReviewComment>{review.comment}</ReviewComment>
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
          {items
            .slice((currentRegisterPage - 1) * itemsPerPage, currentRegisterPage * itemsPerPage)
            .map((item) => (
              <ItemButton key={item.id} onClick={() => handleItemClick(item.id)}>
                <ItemInfo>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemDuration>{item.duration}</ItemDuration>
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

const FilterWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.isSelected ? 'black' : '#f5f5f5')};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isSelected ? 'black' : '#e0e0e0')};
    transform: translateY(-2px);
  }
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
`;

const ReviewUser = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const ReviewRating = styled.div`
  color: #FFD700;
  margin-bottom: 8px;
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

const ItemDuration = styled.div`
  font-size: 14px;
  color: #666;
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

export default ReviewMain;
