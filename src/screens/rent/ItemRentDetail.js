import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';
import { useParams, useNavigate } from 'react-router-dom';
import axiosApi from '../../axios';

const ItemRentDetail = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      console.log("현재 itemId:", itemId);
      try {
        const response = await axiosApi.get(`/item/${itemId}`);
        setItemDetails(response.data);
        console.log('Item Photo URL:', response.data.itemPhoto);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setError('물품을 찾을 수 없습니다.');
          } else if (error.response.status === 500) {
            setError('서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
          } else {
            setError('알 수 없는 오류가 발생했습니다.');
          }
        } else {
          setError('네트워크 오류가 발생했습니다.');
        }
      }
    };

    fetchItemDetails();
  }, [itemId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!itemDetails) {
    return <div>해당 물품을 찾을 수 없습니다.</div>;
  }

  const handleRentButtonClick = async () => {
    setIsModalOpen(true);
  };

  const handleConfirmRent = async () => {
    try {
      const renterId = localStorage.getItem("userId");
      console.log("Renter ID from localStorage:", renterId);
      console.log("Item ID:", itemId);

      if (!renterId) {
        console.error("유효하지 않은 renterId입니다.");
        return;
      }

      const body = {
        itemId: String(itemId),
        renterId: String(renterId),
        startTime: formatDate(new Date()),
        endTime: formatDate(new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)),
      };

      console.log("전송할 body:", JSON.stringify(body, null, 2));

      const response = await axiosApi.post('/rents/request', body);
      if (response.status === 200) {
        navigate('/itemrent');
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            console.error('400 잘못된 요청: 물품 상태가 대여 가능하지 않음.');
            break;
          case 404:
            console.error('404 물품 또는 사용자를 찾을 수 없음.');
            break;
          case 500:
            console.error('500 서버 오류가 발생했습니다.');
            break;
          default:
            console.error('알 수 없는 오류가 발생했습니다.');
        }
      } else {
        console.error('네트워크 오류가 발생했습니다.');
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
  };

  return (
    <DetailContainer>
      <TopBar />
      <ContentWrapper>
        <ImageSection>
          <ItemImage src={itemDetails.itemPhoto} alt={`${itemDetails.itemName} 이미지`} style={{ objectFit: 'contain' }} />
        </ImageSection>
        <DetailsSection>
          <OwnerInfo>{itemDetails.userId}</OwnerInfo>
          <ItemTitle>{itemDetails.itemName}</ItemTitle>
          <ItemPrice>₩{itemDetails.price}</ItemPrice>
          <RentButton onClick={handleRentButtonClick}>대여요청하기</RentButton>
          <ItemDetails>
            <SectionTitle>상세 정보</SectionTitle>
            <Category>{itemDetails.itemCategory}</Category>
            <DescriptionList>
              <DescriptionItem>{itemDetails.itemDescription}</DescriptionItem>
            </DescriptionList>
          </ItemDetails>
        </DetailsSection>
      </ContentWrapper>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>대여 요청</ModalTitle>
            <OwnerInfo>{itemDetails.userId}</OwnerInfo>
            <ContactInfo>
              <ContactLabel>연락처</ContactLabel>
            </ContactInfo>
            <ChatLink>
              <ChatIcon />
              <ChatInfo>
                <ChatText>오픈 카카오톡 방</ChatText>
                <ChatURL href="https://www.figma.com/">https://www.figma.com/</ChatURL>
              </ChatInfo>
            </ChatLink>
            <CloseButton onClick={handleCloseModal}>닫기</CloseButton>
            <RentButton onClick={handleConfirmRent}>대여 요청 확인</RentButton>
          </ModalContainer>
        </ModalOverlay>
      )}
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
`;

const ImageSection = styled.div`
  width: 100%;
  aspect-ratio: 1;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 20px;
`;

const OwnerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  color: #666;
  margin-bottom: 24px;
  
  &::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: #f5f5f5;
    border-radius: 50%;
  }
`;

const ItemTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin: 0;
`;

const ItemPrice = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin: 8px 0 24px;
`;

const RentButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
`;

const ItemDetails = styled.div`
  margin-top: 48px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 16px 0;
`;

const Category = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const DescriptionList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const DescriptionItem = styled.li`
  font-size: 14px;
  color: #333;
  line-height: 1.8;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 400px;
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  margin-bottom: 32px;
`;

const ContactInfo = styled.div`
  font-size: 16px;
  margin-bottom: 24px;
`;

const ContactLabel = styled.span`
  font-weight: bold;
`;

const ChatLink = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 32px;
`;

const ChatIcon = styled.div`
  width: 36px;
  height: 36px;
  background-color: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '...';
    font-size: 20px;
    line-height: 1;
    color: #666;
  }
`;

const ChatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ChatText = styled.span`
  font-size: 16px;
  color: #000;
`;

const ChatURL = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 14px;
`;

const CloseButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
`;

export default ItemRentDetail;
