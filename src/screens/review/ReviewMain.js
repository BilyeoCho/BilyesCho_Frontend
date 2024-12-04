import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import axiosApi from '../../axios';

const ReviewMain = () => {
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [currentRegisterPage, setCurrentRegisterPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [borrowedItems, setBorrowedItems] = useState([]);
  const navigate = useNavigate(); // 페이지 전환을 위한 useNavigate 훅 사용

  const reviews = [
    { 
      user: '장성우', 
      rating: 5, 
      comment: '유용하게 사용했습니다.',
      image: '/images/tent1.jpg',  // 실제 이미지 경로로 수정 필요
      itemName: '텐트'
    },
    { user: '정준서', rating: 5, comment: '되게 아늑하고 좋았습니다.', image: '/images/chair1.jpg', itemName: '캠핑의자' },
    { user: '김태양', rating: 5, comment: '푹신하고 편안했습니다.', image: '/images/lantern1.jpg', itemName: '랜턴' },
    { user: '홍길동', rating: 5, comment: '불이 세요.', image: '/images/cooking1.jpg', itemName: '취사도구' },
    { user: '박영희', rating: 4, comment: '사용감이 좋았습니다.', image: '/images/tent2.jpg', itemName: '텐트' },
    { user: '이철수', rating: 4, comment: '다음에 또 빌리고 싶습니다.', image: '/images/chair2.jpg', itemName: '캠핑의자' },
  ];

  const reviewsPerPage = 4;
  const itemsPerPage = 2;

  const totalReviewPages = Math.ceil(reviews.length / reviewsPerPage);
  const totalRegisterPages = Math.ceil(borrowedItems.length / itemsPerPage);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleItemClick = (itemId, itemName, itemPhoto) => {
    console.log('선택된 아이템 ID:', itemId);
    console.log('선택된 아이템 이름:', itemName);
    console.log('선택된 아이템 이미지:', itemPhoto);
    navigate(`/review/register/${itemId}`, { state: { itemPhoto } });
  };

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  // 빌린 물품 목록 조회
  useEffect(() => {
    const fetchBorrowedItems = async () => {
      try {
        // 빌린 물품 목록 조회
        const borrowedResponse = await axiosApi.get('/rents/borrowed');
        const borrowedData = borrowedResponse.data;
        
        console.log('빌린 물품 데이터:', borrowedData); // 데이터 확인용 로그 추가
        
        // 각 물품의 상세 정보 조회
        const itemDetailsPromises = borrowedData.map(borrowed => {
          console.log('borrowed 객체:', borrowed); // borrowed 객체 확인용 로그 추가
          return axiosApi.get(`/item/${borrowed.itemId}`);
        });
        
        const itemResponses = await Promise.all(itemDetailsPromises);
        
        // 필요한 정보만 추출하여 새로운 배열 생성
        const combinedItems = itemResponses.map(response => ({
          itemId: response.data.itemId,
          itemName: response.data.itemName,
          price: `₩${response.data.price.toLocaleString()}`,
          itemPhoto: response.data.itemPhoto
        }));
        
        console.log('최종 가공된 데이터:', combinedItems); // 최종 데이터 확인용 로그 추가
        
        setBorrowedItems(combinedItems);
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
              <ReviewCard 
                key={index} 
                onClick={() => handleReviewClick(review)}
              >
                <ItemName>{review.itemName}</ItemName>
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
          {borrowedItems
            .slice((currentRegisterPage - 1) * itemsPerPage, currentRegisterPage * itemsPerPage)
            .map((item) => (
              <ItemButton 
                key={item.itemId} 
                onClick={() => handleItemClick(item.itemId, item.itemName, item.itemPhoto)}
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

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContainer>
          <ModalContent>
            <ImageSection>
              <ProductImage src={selectedReview?.image} alt={selectedReview?.itemName} />
            </ImageSection>
            <ReviewSection>
              <ReviewHeader>
                <ItemName>{selectedReview?.itemName}</ItemName>
                <ReviewUser>{selectedReview?.user}</ReviewUser>
                <ReviewRating>{'⭐'.repeat(selectedReview?.rating || 0)}</ReviewRating>
              </ReviewHeader>
              <ReviewText>{selectedReview?.comment}</ReviewText>
            </ReviewSection>
            <CloseButton onClick={() => setIsModalOpen(false)}>✕</CloseButton>
          </ModalContent>
        </ModalContainer>
      </Modal>
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
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }
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

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 1000px;
  background-color: white;
  border-radius: 12px;
  outline: none;
`;

const ModalContent = styled.div`
  display: flex;
  position: relative;
  height: 600px;
`;

const ImageSection = styled.div`
  flex: 1;
  padding: 24px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const ReviewSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;

const ReviewHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

const ReviewText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  margin-top: 16px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

export default ReviewMain;
