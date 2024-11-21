import React from 'react';
import styled from 'styled-components';

const RentHistory = () => {
  const rentedItems = [
    {
      id: 1,
      name: '텐트',
      status: '대여중',
      price: '20,000원',
      duration: '24시간',
      rentDate: '2024-03-15',
      returnDate: '2024-03-16',
      image: '/images/tent1.jpg'
    },
    {
      id: 2,
      name: '캠핑의자',
      status: '대여완료',
      price: '10,000원',
      duration: '12시간',
      rentDate: '2024-03-10',
      returnDate: '2024-03-11',
      image: '/images/chair1.jpg'
    },
  ];

  return (
    <Content>
      <ContentHeader>
        <h2>대여내역</h2>
      </ContentHeader>

      <ItemGrid>
        {rentedItems.map((item) => (
          <ItemCard key={item.id}>
            <ItemImage src={item.image} alt={item.name} />
            <ItemInfo>
              <ItemHeader>
                <ItemName>{item.name}</ItemName>
                <StatusBadge status={item.status}>{item.status}</StatusBadge>
              </ItemHeader>
              <ItemDetails>
                <DetailRow>
                  <DetailLabel>대여 가격</DetailLabel>
                  <DetailValue>{item.price}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>대여 기간</DetailLabel>
                  <DetailValue>{item.duration}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>대여일</DetailLabel>
                  <DetailValue>{item.rentDate}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>반납일</DetailLabel>
                  <DetailValue>{item.returnDate}</DetailValue>
                </DetailRow>
              </ItemDetails>
              <ButtonGroup>
                <ReviewButton status={item.status}>
                  {item.status === '대여완료' ? '리뷰작성' : '반납하기'}
                </ReviewButton>
              </ButtonGroup>
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

const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
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
  background-color: ${props => props.status === '대여중' ? '#fff3bf' : '#f8f9fa'};
  color: ${props => props.status === '대여중' ? '#f08c00' : '#666'};
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

const ReviewButton = styled.button`
  flex: 1;
  padding: 8px;
  border: 1px solid ${props => props.status === '대여완료' ? '#4263eb' : '#f76707'};
  background-color: #fff;
  color: ${props => props.status === '대여완료' ? '#4263eb' : '#f76707'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.status === '대여완료' ? '#4263eb' : '#f76707'};
    color: #fff;
  }
`;

export default RentHistory;
