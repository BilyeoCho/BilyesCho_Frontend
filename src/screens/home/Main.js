import React, { useState } from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';

const Main = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // 임시 데이터
  const bannerItems = [
    { id: 1, title: "인기 대여 물품 1", image: "banner1.jpg" },
    { id: 2, title: "인기 대여 물품 2", image: "banner2.jpg" },
    { id: 3, title: "인기 대여 물품 3", image: "banner3.jpg" },
  ];

  const categories = [
    { id: 1, name: "Bicycle", icon: "🚲", category: "Sports & Outdoors" },
    { id: 2, name: "Tent", icon: "⛺", category: "Camping Equipment" },
    { id: 3, name: "Kayak", icon: "🛶", category: "Water Sports Gear" },
    { id: 4, name: "Electric Guitar", icon: "🎸", category: "Musical Instruments" },
    { id: 5, name: "Camera", icon: "📸", category: "Photography Equipment" },
    { id: 6, name: "Telescope", icon: "🔭", category: "Science & Discovery" },
  ];

  const rentalItems = [
    { id: 1, title: "자전거", price: "10,000", duration: "24시간" },
    { id: 2, title: "텐트", price: "20,000", duration: "24시간" },
    { id: 3, title: "평일의자", price: "5,000", duration: "24시간" },
    { id: 4, title: "가스토치", price: "3,000", duration: "24시간" },
    // ... 더 많은 아이템들
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(rentalItems.length / itemsPerPage);

  return (
    <MainContainer>
      {/* 배너 섹션 */}
      <BannerSection>
        <BannerImage>
          {bannerItems[currentBanner].title}
        </BannerImage>
        <BannerIndicators>
          {bannerItems.map((_, index) => (
            <Indicator 
              key={index} 
              active={currentBanner === index}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </BannerIndicators>
      </BannerSection>

      {/* 카테고리 섹션 */}
      <CategorySection>
        {categories.map(category => (
          <CategoryItem key={category.id}>
            <CategoryIcon>{category.icon}</CategoryIcon>
            <CategoryName>{category.name}</CategoryName>
            <CategoryDesc>{category.category}</CategoryDesc>
          </CategoryItem>
        ))}
      </CategorySection>

      {/* 최신 대여 목록 섹션 */}
      <RentalSection>
        <SectionTitle>최신 대여 물품</SectionTitle>
        <RentalGrid>
          {rentalItems
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map(item => (
              <RentalCard key={item.id}>
                <CardImage />
                <CardInfo>
                  <CardTitle>{item.title}</CardTitle>
                  <CardPrice>₩{item.price} / {item.duration}</CardPrice>
                </CardInfo>
              </RentalCard>
            ))}
        </RentalGrid>
        <PaginationWrapper>
          <Pagination 
            count={totalPages} 
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
          />
        </PaginationWrapper>
      </RentalSection>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const BannerSection = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

const BannerImage = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BannerIndicators = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#000' : '#ccc'};
  cursor: pointer;
`;

const CategorySection = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  margin-bottom: 40px;
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

const CategoryIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const CategoryName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const CategoryDesc = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const RentalSection = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
`;

const RentalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
`;

const RentalCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
`;

const CardInfo = styled.div`
  padding: 15px;
`;

const CardTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const CardPrice = styled.div`
  color: #666;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default Main;
