import React from 'react';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';
import { useParams } from 'react-router-dom';

const ItemRentDetail = () => {
  const { itemId } = useParams();

  // 임시 데이터
  const rentalItems = [
    {
        id: 1,
        title: '자전거',
        price: '10,000',
        duration: '24시간',
        description: [
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
        ],
        owner: '장성우',
        category: 'Sports & Outdoors',
        image: 'bicycle.jpg',
      },
      {
        id: 2,
        title: '텐트',
        price: '20,000',
        duration: '24시간',
        description: [
          '텐트 상세설명입니다.',
          '텐트 상세설명입니다.',
          '텐트 상세설명입니다.',
        ],
        owner: '김철수',
        category: 'Camping Equipment',
        image: 'tent.jpg',
      },
      {
        id: 3,
        title: '캠핑의자',
        price: '5,000',
        duration: '24시간',
        description: [
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
        ],
        owner: '정준서',
        category: 'Camping Equipment',
        image: 'bicycle.jpg',
      },
      {
        id: 4,
        title: '가스토치',
        price: '3,000',
        duration: '24시간',
        description: [
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
        ],
        owner: '김태양',
        category: 'Camping Equipment',
        image: 'bicycle.jpg',
      },
      {
        id: 5,
        title: '코터',
        price: '15,000',
        duration: '24시간',
        description: [
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
        ],
        owner: '장성우',
        category: 'Camping Equipment',
        image: 'bicycle.jpg',
      },
      {
        id: 6,
        title: '등산모자',
        price: '2,000',
        duration: '24시간',
        description: [
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
        ],
        owner: '김철수',
        category: 'Sports & Outdoors',
        image: 'bicycle.jpg',
      },
      {
        id: 7,
        title: '야구글러브',
        price: '8,000',
        duration: '24시간',
        description: [
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
        ],
        owner: '정준서',
        category: 'Sports & Outdoors',
        image: 'bicycle.jpg',
      },
      {
        id: 8,
        title: '낚시대',
        price: '12,000',
        duration: '24시간',
        description: [
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
          '물품 상세설명입니다.',
        ],
        owner: '김태양',
        category: 'Sports & Outdoors',
        image: 'bicycle.jpg',
      }
  ];

  // iitemId에 해당하는 아이템을 찾기
  const itemDetails = rentalItems.find(item => item.id === parseInt(itemId));

  if (!itemDetails) {
    return <div>해당 물품을 찾을 수 없습니다.</div>;
  }

  return (
    <DetailContainer>
      <TopBar />
      <ContentWrapper>
        <ImageSection>
          <ItemImage>{itemDetails.title} Image</ItemImage>
        </ImageSection>
        <DetailsSection>
          <OwnerInfo>소유자: {itemDetails.owner}</OwnerInfo>
          <ItemTitle>{itemDetails.title}</ItemTitle>
          <ItemPrice>₩{itemDetails.price} / {itemDetails.duration}</ItemPrice>
          <RentButton>대여하기</RentButton>
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
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ImageSection = styled.div`
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 40px;
`;

const ItemImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #999;
`;

const DetailsSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OwnerInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

const ItemTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const ItemPrice = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const RentButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin: 8px 0 24px;
`;

const ItemDetails = styled.div`
  margin-top: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
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
  margin-bottom: 8px;
  line-height: 1.5;
`;

export default ItemRentDetail;