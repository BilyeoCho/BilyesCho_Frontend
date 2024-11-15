import React, { useState } from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ItemRentMain = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // 임시 데이터
  const rentalItems = [
    { id: 1, title: '자전거', price: '10,000' },
    { id: 2, title: '텐트', price: '20,000' },
    { id: 3, title: '캠핑의자', price: '5,000' },
    { id: 4, title: '가스토치', price: '3,000' },
    { id: 5, title: '코터', price: '15,000' },
    { id: 6, title: '등산모자', price: '2,000' },
    { id: 7, title: '야구글러브', price: '8,000' },
    { id: 8, title: '낚시대', price: '12,000' },
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(rentalItems.length / itemsPerPage);

  const handleCardClick = (itemId) => {
    navigate(`/itemrent/${itemId}`);
  }

  return (
    <MainContainer>
      <SectionTitle>대여 가능한 물품</SectionTitle>
      <RentalGrid>
        {rentalItems
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((item) => (
            <RentalCard key={item.id} onClick={() => handleCardClick(item.id)}>
              <CardImage />
              <CardInfo>
                <CardTitle>{item.title}</CardTitle>
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
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
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

export default ItemRentMain;
