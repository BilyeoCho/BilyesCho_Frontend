import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axios';

const Main = () => {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const bannerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [latestItems, setLatestItems] = useState([]);

  // 임시 데이터
  const bannerItems = [
    { id: 1, title: "인기 등록 물품 1", image: "banner1.jpg" },
    { id: 2, title: "인기 등록 물품 2", image: "banner2.jpg" },
    { id: 3, title: "인기 등록 물품 3", image: "banner3.jpg" },
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

  // 드래그 시작 시
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  // 드래그 중
  const handleDragMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setCurrentTranslate(diff);
  };

  // 드래그 종료 시
  const handleDragEnd = () => {
    setIsDragging(false);
    if (currentTranslate < -50) {
      handleNextBanner();
    } else if (currentTranslate > 50) {
      handlePrevBanner();
    }
    setCurrentTranslate(0);
  };

  const handlePrevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? bannerItems.length - 1 : prev - 1));
  };

  const handleNextBanner = () => {
    setCurrentBanner((prev) => (prev === bannerItems.length - 1 ? 0 : prev + 1));
  };

  const handleBannerClick = (id) => {
    navigate(`/itemrent/${id}`);  // 배너 클릭 시 ItemRentDetail로 이동
  };

  const handleRentalCardClick = (id) => {
    navigate(`/itemrent/${id}`);  // RentalCard 클릭 시 ItemRentDetail로 이동
  };

  // 최신 물품 조회 함수
  const fetchLatestItems = async () => {
    try {
      const response = await axiosApi.get('/latest');
      setLatestItems(response.data); // 응답 데이터로 상태 업데이트
    } catch (error) {
      console.error("최신 물품 조회 실패:", error);
    }
  };

  useEffect(() => {
    fetchLatestItems(); // 컴포넌트 마운트 시 최신 물품 조회
  }, []);

  useEffect(() => {
    const bannerElement = bannerRef.current;

    if (bannerElement) {
      bannerElement.addEventListener("mousedown", handleDragStart);
      bannerElement.addEventListener("mousemove", handleDragMove);
      bannerElement.addEventListener("mouseup", handleDragEnd);
      bannerElement.addEventListener("mouseleave", handleDragEnd);

      return () => {
        bannerElement.removeEventListener("mousedown", handleDragStart);
        bannerElement.removeEventListener("mousemove", handleDragMove);
        bannerElement.removeEventListener("mouseup", handleDragEnd);
        bannerElement.removeEventListener("mouseleave", handleDragEnd);
      };
    }
  }, [isDragging, startX, currentTranslate]);

  return (
    <MainContainer>
      {/* 배너 섹션 */}
      <BannerSection>
        <BannerWrapper ref={bannerRef}>
          <BannerImage
            style={{
              transform: `translateX(${currentTranslate}px)`,
            }}
            onClick={() => handleBannerClick(bannerItems[currentBanner].id)} // 배너 클릭 시 이동
          >
            {bannerItems[currentBanner].title}
          </BannerImage>
          <BannerButton left onClick={handlePrevBanner}>&lt;</BannerButton>
          <BannerButton right onClick={handleNextBanner}>&gt;</BannerButton>
          <BannerIndicators>
            {bannerItems.map((_, index) => (
              <Indicator
                key={index}
                active={currentBanner === index}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </BannerIndicators>
        </BannerWrapper>
      </BannerSection>

      {/* 최신 대여 목록 섹션 */}
      <RentalSection>
        <SectionTitle>최신 등록 물품</SectionTitle>
        <RentalGrid>
          {latestItems.map(item => ( // 최신 물품으로 변경
            <RentalCard key={item.itemId} onClick={() => handleRentalCardClick(item.itemId)}> {/* 카드 클릭 시 이동 */}
              <CardImage style={{ backgroundImage: `url(${item.itemPhoto})` }} /> {/* 이미지 추가 */}
              <CardInfo>
                <CardTitle>{item.itemName}</CardTitle>
                <CardPrice>₩{item.price}</CardPrice>
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

const BannerWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const BannerImage = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease-out;
`;

const BannerButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.left ? 'left: 20px;' : 'right: 20px;'}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }

  &:focus {
    outline: none;
  }
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