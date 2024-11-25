import React, { useState } from 'react';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';
import { useParams } from 'react-router-dom';

const ItemRentDetail = () => {
  const { itemId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 임시 데이터
  const rentalItems = [
    {
        id: 1,
        title: '자전거',
        price: '10,000',
        description: [
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',

        ],
        owner: '장성우',
        category: 'Sports',
        image: 'bicycle.jpg',
      },
      {
        id: 2,
        title: '텐트',
        price: '20,000',
        description: [
          '텐트 상세설명입니다.',
          '텐트 상세설명입니다.',
          '텐트 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
        ],
        owner: '김철수',
        category: 'Sports',
        image: 'tent.jpg',
      },
      {
        id: 3,
        title: '캠핑의자',
        price: '5,000',
        description: [
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
        ],
        owner: '정준서',
        category: 'Sports',
        image: 'bicycle.jpg',
      },
      {
        id: 4,
        title: '가스토치',
        price: '3,000',
        description: [
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
        ],
        owner: '김태양',
        category: 'Sports',
        image: 'bicycle.jpg',
      },
      {
        id: 5,
        title: '코터',
        price: '15,000',
        description: [
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
        ],
        owner: '장성우',
        category: 'Sports',
        image: 'bicycle.jpg',
      },
      {
        id: 6,
        title: '등산모자',
        price: '2,000',
        description: [
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
        ],
        owner: '김철수',
        category: 'Sports',
        image: 'bicycle.jpg',
      },
      {
        id: 7,
        title: '야구글러브',
        price: '8,000',
        description: [
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
        ],
        owner: '정준서',
        category: 'Sports',
        image: 'bicycle.jpg',
      },
      {
        id: 8,
        title: '낚시대',
        price: '12,000',
        description: [
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
        ],
        owner: '김태양',
        category: 'Sports',
        image: 'bicycle.jpg',
      }
  ];

  // iitemId에 해당하는 아이템을 찾기
  const itemDetails = rentalItems.find(item => item.id === parseInt(itemId));

  if (!itemDetails) {
    return <div>해당 물품을 찾을 수 없습니다.</div>;
  }

  const handleRentButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <DetailContainer>
      <TopBar />
      <ContentWrapper>
        <ImageSection>
          <ItemImage>{itemDetails.title} Image</ItemImage>
        </ImageSection>
        <DetailsSection>
          <OwnerInfo>{itemDetails.owner}</OwnerInfo>
          <ItemTitle>{itemDetails.title}</ItemTitle>
          <ItemPrice>₩{itemDetails.price}</ItemPrice>
          <RentButton onClick={handleRentButtonClick}>대여요청하기</RentButton>
          <ItemDetails>
            <SectionTitle>상세 정보</SectionTitle>
            <Category>{itemDetails.category}</Category>
            <DescriptionList>
              {itemDetails.description.map((desc, index) => (
                <DescriptionItem key={index}>{desc}</DescriptionItem>
              ))}
            </DescriptionList>
          </ItemDetails>
        </DetailsSection>
      </ContentWrapper>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>대여 요청</ModalTitle>
            <OwnerInfo>{itemDetails.owner}</OwnerInfo>
            <ContactInfo>
              <ContactLabel>연락처</ContactLabel>
            </ContactInfo>
            <ChatLink>
              <ChatIcon />
              <ChatInfo>
                <ChatText>오픈 카카오톡 방🙏</ChatText>
                <ChatURL href="https://www.figma.com/">https://www.figma.com/</ChatURL>
              </ChatInfo>
            </ChatLink>
            <CloseButton onClick={handleCloseModal}>닫기</CloseButton>
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

const ItemImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
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
