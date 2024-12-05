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
        const itemsWithNames = await Promise.all(response.data.map(async (item) => {
          const itemResponse = await axiosApi.get(`/item/${item.itemId}`);
          return { ...item, itemName: itemResponse.data.itemName };
        }));
        setRentedItems(itemsWithNames);
      } catch (error) {
        setError('물품을 가져오는 데 실패했습니다.');
        console.error('API 요청 오류:', error.response ? error.response.data : error.message);
      }
    };

    fetchRentedItems();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
  };

  const handleReturnItem = async (rentId) => {
    try {
      const renterId = localStorage.getItem("userId");
      
      if (!renterId) {
        console.error("사용자 ID를 찾을 수 없습니다.");
        return;
      }

      const response = await axiosApi.put(`/rents/return/${rentId}?renterId=${renterId}`);
      
      if (response.status === 200) {
        console.log('반납 성공:', response.data);
        setRentedItems((prevItems) =>
          prevItems.map((item) =>
            item.rentId === rentId ? { ...item, rentStatus: 'AVAILABLE' } : item
          )
        );
        alert('물품이 성공적으로 반납되었습니다.');
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            console.error('잘못된 요청:', error.response.data);
            alert('잘못된 요청입니다. 다시 시도해 주세요.');
            break;
          case 403:
            console.error('해당 사용자는 대여하지 않은 물품을 반납:', error.response.data);
            alert('이 물품은 대여하지 않았습니다.');
            break;
          case 404:
            console.error('대여 기록을 찾을 수 없습니다:', error.response.data);
            alert('대여 기록을 찾을 수 없습니다.');
            break;
          case 500:
            console.error('서버 오류:', error.response.data);
            alert('서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
            break;
          default:
            console.error('알 수 없는 오류:', error.response.data);
            alert('알 수 없는 오류가 발생했습니다.');
        }
      } else {
        console.error('네트워크 오류:', error);
        alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.');
      }
    }
  };

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
                <ItemName>{item.itemName}</ItemName>
                <StatusBadge status={item.rentStatus}>
                  {item.rentStatus === 'RENTED' ? '대여중' : '반납완료'}
                </StatusBadge>
              </ItemHeader>
              <ItemDetails>
                <DetailRow>
                  <DetailLabel>대여일</DetailLabel>
                  <DetailValue>{formatDate(item.startTime)}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>반납예정일</DetailLabel>
                  <DetailValue>{formatDate(item.endTime)}</DetailValue>
                </DetailRow>
              </ItemDetails>
              {item.rentStatus === 'RENTED' && (
                <ButtonGroup>
                  <ReturnButton onClick={() => handleReturnItem(item.rentId)}>
                    반납하기
                  </ReturnButton>
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