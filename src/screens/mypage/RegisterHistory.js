import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axios';

const RegisterHistory = () => {
  const navigate = useNavigate();
  const [registeredItems, setRegisteredItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [rentInfo, setRentInfo] = useState({
    renterUserId: '',
    startTime: '',
    endTime: ''
  });

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

  const handleStatusChange = async () => {
    // ISO 문자열을 원하는 형식으로 변환
    const formatDateTime = (dateTimeString) => {
      if (!dateTimeString) return '';
      // 초가 없는 경우 ':00'을 추가
      const withSeconds = dateTimeString.length === 16 
        ? dateTimeString + ':00' 
        : dateTimeString;
      return withSeconds;
    };

    // 요청 데이터 준비
    const requestData = {
      itemId: selectedItemId,
      renterUserId: rentInfo.renterUserId,
      startTime: formatDateTime(rentInfo.startTime),
      endTime: formatDateTime(rentInfo.endTime)
    };
    
    console.log('대여 상태 변경 요청 데이터:', requestData);

    try {
      const response = await axiosApi.post('/rents/rentstatus', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 200) {
        console.log('대여 상태 변경 응답:', response.data);
        alert('대여 상태가 성공적으로 변경되었습니다.');
        setIsModalOpen(false);
        fetchRegisteredItems();
      }
    } catch (error) {
      console.error('대여 상태 변경 오류:', error);
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            alert('400 물품이 대여 가능한 상태가 아닙니다.');
            break;
          case 404:
            alert('404 물품 또는 사용자를 찾을 수 없습니다.');
            break;
          case 500:
            alert('500서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
            break;
          default:
            alert('알 수 없는 오류가 발생했습니다.');
        }
      } else if (error.request) {
        alert('서버에서 응답이 없습니다. 네트워크 연결을 확인해주세요.');
      } else {
        alert('요청 설정 중 오류가 발생했습니다.');
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
                <StatusBadge 
                  status={item.status}
                  onClick={() => {
                    setSelectedItemId(item.itemId);
                    setIsModalOpen(true);
                  }}
                >
                  {item.status === 'AVAILABLE' ? '대여 가능' : '대여 중'}
                </StatusBadge>
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

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h3>물품 상태 변경하기</h3>
            <InputGroup>
              <label>대여자 ID:</label>
              <input
                type="text"
                value={rentInfo.renterUserId}
                onChange={(e) => setRentInfo({...rentInfo, renterUserId: e.target.value})}
                placeholder="대여자 ID를 입력하세요"
              />
            </InputGroup>
            <InputGroup>
              <label>대여 시작 시간:</label>
              <input
                type="datetime-local"
                value={rentInfo.startTime}
                onChange={(e) => setRentInfo({...rentInfo, startTime: e.target.value})}
                step="1"
              />
            </InputGroup>
            <InputGroup>
              <label>대여 종료 시간:</label>
              <input
                type="datetime-local"
                value={rentInfo.endTime}
                onChange={(e) => setRentInfo({...rentInfo, endTime: e.target.value})}
                step="1"
              />
            </InputGroup>
            <ModalButtonGroup>
              <ConfirmButton onClick={handleStatusChange}>확인</ConfirmButton>
              <CancelButton onClick={() => setIsModalOpen(false)}>취소</CancelButton>
            </ModalButtonGroup>
          </ModalContent>
        </Modal>
      )}
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
  background-color: ${props => props.status === 'RENTED' ? '#fff3bf' : '#e3fafc'};
  color: ${props => props.status === 'RENTED' ? '#f08c00' : '#0c8599'};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  
  h3 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 8px;
  background-color: #0c8599;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0b7285;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 8px;
  background-color: #868e96;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #495057;
  }
`;

export default RegisterHistory;