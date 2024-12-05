import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axios';

const RegisterHistory = () => {
  const navigate = useNavigate();
  const [registeredItems, setRegisteredItems] = useState([]);

  const fetchRegisteredItems = async () => {
    try {
      const response = await axiosApi.get('/myitems');
      if (response.status === 200) {
        const itemsWithDefaultStatus = response.data.map(item => ({
          ...item,
          status: 'AVAILABLE',
        }));
        setRegisteredItems(itemsWithDefaultStatus);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        } else {
          console.error('등록된 물품 조회 실패:', error.response.data);
        }
      } else {
        alert('네트워크 오류가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
    fetchRegisteredItems();
  }, []);

  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm('이 물품을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const response = await axiosApi.delete(`/delete/${itemId}`);
      if (response.status === 204) {
        alert('물품이 성공적으로 삭제되었습니다.');
        fetchRegisteredItems();
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 403:
            alert('권한이 없습니다.');
            break;
          case 404:
            alert('물품을 찾을 수 없습니다.');
            break;
          case 500:
            alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
            break;
          default:
            alert('알 수 없는 오류가 발생했습니다.');
        }
      } else {
        alert('네트워크 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Content>
      <ContentHeader>
        <h2>등록내역</h2>
      </ContentHeader>

      <ItemGrid>
        {registeredItems.map((item) => (
          <ItemCard key={item.itemId}>
            <ItemImage src={item.itemPhoto} alt={item.itemName} />
            <ItemInfo>
              <ItemHeader>
                <ItemName>{item.itemName}</ItemName>
                <StatusBadge status={item.status}>{item.status}</StatusBadge>
              </ItemHeader>
              <ItemDetails>
                <DetailRow>
                  <DetailLabel>대여 가격</DetailLabel>
                  <DetailValue>₩{item.price}</DetailValue>
                </DetailRow>
              </ItemDetails>
              {item.status === 'AVAILABLE' && (
                <ButtonGroup>
                  <EditButton onClick={() => navigate(`/mypage/edit/${item.itemId}`)}>
                    수정
                  </EditButton>
                  <DeleteButton onClick={() => handleDelete(item.itemId)}>삭제</DeleteButton>
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
  background-color: #e3fafc;
  color: #0c8599;
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

const EditButton = styled.button`
  flex: 1;
  padding: 8px;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const DeleteButton = styled.button`
  flex: 1;
  padding: 8px;
  border: 1px solid #dc3545;
  background-color: #fff;
  color: #dc3545;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #dc3545;
    color: #fff;
  }
`;

export default RegisterHistory;