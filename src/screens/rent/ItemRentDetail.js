import React from 'react';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';
import { useParams } from 'react-router-dom';

const ItemRentDetail = () => {
  const { itemId } = useParams();

  // 임시 데이터
  const rentalItems = [
    { id: 1, title: '자전거', price: '10,000', duration: '24시간', owner: '장성우', category: 'Sports & Outdoors', description: ['물품 상세설명입니다.', '물품 상세설명입니다.'] },
    { id: 2, title: '텐트', price: '20,000', duration: '24시간', owner: '홍길동', category: 'Camping Equipment', description: ['물품 상세설명입니다.', '물품 상세설명입니다.'] },
    { id: 3, title: '캠핑의자', price: '5,000', duration: '24시간', owner: '정준서', category: 'Camping Equipment', description: ['물품 상세설명입니다.', '물품 상세설명입니다.'] },
    { id: 4, title: '가스토치', price: '3,000', duration: '24시간', owner: '김태양', category: 'Camping Equipment', description: ['물품 상세설명입니다.', '물품 상세설명입니다.'] },
    { id: 5, title: '코터', price: '15,000', duration: '24시간', owner: '장성우', category: 'Camping Equipment', description: ['물품 상세설명입니다.', '물품 상세설명입니다.'] },
    { id: 6, title: '등산모자', price: '2,000', duration: '24시간', owner: '홍길동', category: 'Sports & Outdoors', description: ['물품 상세설명입니다.', '물품 상세설명입니다.'] },
    { id: 7, title: '야구글러브', price: '8,000', duration: '24시간', owner: '정준서', category: 'Sports & Outdoors', description: ['물품 상세설명입니다.', '물품 상세설명입니다.'] },
    { id: 8, title: '낚시대', price: '12,000', duration: '24시간', owner: '김태양', category: 'Sports & Outdoors', description: ['물품 상세설명입니다.', '물품 상세설명입니다.'] },
  ];

  // itemId를 이용해 해당 아이템의 상세 정보를 가져옴
  const itemDetails = rentalItems.find(item => item.id === parseInt(itemId));

  if (!itemDetails) {
    return <div>잘못된 접근입니다. 물품을 찾을 수 없습니다.</div>;
  }

  return (
    <DetailContainer>
      <TopBar />
      <ContentWrapper>
        <ImageSection>
          <ItemImage>{rentalItems.title} Image</ItemImage>
        </ImageSection>
        <DetailsSection>
          <OwnerInfo>소유자: {rentalItems.owner}</OwnerInfo>
          <ItemTitle>{rentalItems.title}</ItemTitle>
          <ItemPrice>₩{rentalItems.price} / {rentalItems.duration}</ItemPrice>
          <RentButton>대여하기</RentButton>
          <ItemDetails>
            <SectionTitle>상세 정보</SectionTitle>
            <Category>{rentalItems.category}</Category>
            <DescriptionList>
              {rentalItems.description.map((desc, index) => (
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
  padding: 2rem;
  gap: 2rem;
`;

const ImageSection = styled.div`
  flex: 1;
`;

const ItemImage = styled.div`
  width: 100%;
  height: 500px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #999;
`;

const DetailsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const OwnerInfo = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const ItemTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ItemPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const RentButton = styled.button`
  padding: 1rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  width: 200px;
  margin-bottom: 2rem;
`;

const ItemDetails = styled.div`
  margin-top: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Category = styled.div`
  font-size: 1rem;
  color: #999;
  margin-bottom: 1rem;
`;

const DescriptionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const DescriptionItem = styled.li`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export default ItemRentDetail;
