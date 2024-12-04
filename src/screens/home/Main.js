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
  const [bannerItems, setBannerItems] = useState([]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(latestItems.length / itemsPerPage);

  // 인기 물품 조회 함수
  const fetchTopItems = async () => {
    try {
      const response = await axiosApi.get('/item/top-3');
      setBannerItems(response.data);
    } catch (error) {
      console.error("인기 물품 조회 실패:", error);
    }
  };

  useEffect(() => {
    fetchTopItems();
    fetchLatestItems();
  }, []);

  // 최신 물품 조회 함수
  const fetchLatestItems = async () => {
    try {
      const response = await axiosApi.get('/latest');
      setLatestItems(response.data);
    } catch (error) {
      console.error("최신 물품 조회 실패:", error);
    }
  };

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
        <SectionTitle>인기 등록 물품</SectionTitle>
        <BannerWrapper ref={bannerRef}>
          {bannerItems.length > 0 && (
            <BannerImage
              style={{
                backgroundImage: `url(${bannerItems[currentBanner].itemPhoto})`,
                transform: `translateX(${currentTranslate}px)`,
              }}
              onClick={() => handleBannerClick(bannerItems[currentBanner].itemId)}
            >
              {bannerItems[currentBanner].itemName}
            </BannerImage>
          )}
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
          {latestItems.map(item => (
            <RentalCard key={item.itemId} onClick={() => handleRentalCardClick(item.itemId)}>
              <CardImage style={{ backgroundImage: `url(${item.itemPhoto})` }} />
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
  padding: 0 20px;
`;

const BannerWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

const BannerImage = styled.div`
  width: 100%;
  height: 400px;
  background-color: #f0f0f0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease-out;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
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