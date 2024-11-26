import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axios';

const ItemRentMain = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosApi.get('/items');
        setItems(response.data);
      } catch (error) {
        console.error('물품 조회 실패:', error);
      }
    };

    fetchItems();
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleCardClick = (itemId) => {
    navigate(`/itemrent/${itemId}`);
  };

  return (
    <MainContainer>
      <SectionTitle>대여 가능한 물품</SectionTitle>
      <RentalGrid>
        {items
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((item) => (
            <RentalCard key={item.itemId} onClick={() => handleCardClick(item.itemId)}>
              <CardImage />
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
