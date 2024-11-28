import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosApi from '../../axios';

const RentHistory = () => {
  const [rentedItems, setRentedItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentedItems = async () => {
      try {
        const response = await axiosApi.get('/rents/borrowed', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setRentedItems(response.data);
      } catch (error) {
        setError('물품을 가져오는 데 실패했습니다.');
        console.error('API 요청 오류:', error.response.data);
      }
    };

    fetchRentedItems();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Content>
      <ContentHeader>
        <h2>대여내역</h2>
      </ContentHeader>

      <ItemGrid>
        {rentedItems.map((item) => (
          <ItemCard key={item.rentId}>
            <ItemInfo>
              <ItemHeader>
                <ItemName>{item.itemId}</ItemName>
                <StatusBadge status={item.rentStatus}>{item.rentStatus}</StatusBadge>
              </ItemHeader>
              <ItemDetails>
                <DetailRow>
                  <DetailLabel>대여일</DetailLabel>
                  <DetailValue>{item.startTime}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>반납일</DetailLabel>
                  <DetailValue>{item.endTime}</DetailValue>
                </DetailRow>
              </ItemDetails>
              {item.rentStatus === 'RENTED' && (
                <ButtonGroup>
                  <ReturnButton>반납하기</ReturnButton>
                </ButtonGroup>
              )}
            </ItemInfo>
          </ItemCard>
        ))}
      </ItemGrid>
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

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const ItemCard = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ItemInfo = styled.div`
  padding: 16px;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ItemName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  background-color: ${props => props.status === 'RENTED' ? '#fff3bf' : '#f8f9fa'};
  color: ${props => props.status === 'RENTED' ? '#f08c00' : '#666'};
`;

const ItemDetails = styled.div`
  margin-bottom: 16px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const DetailLabel = styled.span`
  color: #666;
  font-size: 14px;
`;

const DetailValue = styled.span`
  font-weight: bold;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ReturnButton = styled.button`
  flex: 1;
  padding: 8px;
  border: 1px solid #f76707;
  background-color: #fff;
  color: #f76707;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f76707;
    color: #fff;
  }
`;

export default RentHistory;
