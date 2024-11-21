import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MyPageMain = () => {
  const [activeMenu, setActiveMenu] = useState('등록내역');
  const navigate = useNavigate();

  const menuItems = [
    { name: '등록내역', icon: '📝' },
    { name: '대여내역', icon: '📦' },
    { name: '리뷰내역', icon: '⭐' },
    { name: '프로필', icon: '👤' },
    { name: '로그아웃', icon: '🚪' },
  ];

  // 임시 등록 물품 데이터
  const registeredItems = [
    {
      id: 1,
      name: '텐트',
      status: '제공중',
      price: '20,000원',
      duration: '24시간',
      image: '/images/tent1.jpg'
    },
    {
      id: 2,
      name: '캠핑의자',
      status: '제공완료',
      price: '10,000원',
      duration: '12시간',
      image: '/images/chair1.jpg'
    },
    // 더미 데이터 추가 가능
  ];

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    // 추후 각 메뉴별 라우팅 처리
  };

  return (
    <Container>
      <Sidebar>
        <MenuList>
          {menuItems.map((item) => (
            <MenuItem
              key={item.name}
              active={activeMenu === item.name}
              onClick={() => handleMenuClick(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
            </MenuItem>
          ))}
        </MenuList>
      </Sidebar>
      
      <Content>
        <ContentHeader>
          <h2>등록내역</h2>
          <RegisterButton onClick={() => navigate('/register')}>물품 등록하기</RegisterButton>
        </ContentHeader>

        <ItemGrid>
          {registeredItems.map((item) => (
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
                </ItemDetails>
                <ButtonGroup>
                  <EditButton>수정</EditButton>
                  <DeleteButton>삭제</DeleteButton>
                </ButtonGroup>
              </ItemInfo>
            </ItemCard>
          ))}
        </ItemGrid>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 40px;
  height: 100%;
`;

const Sidebar = styled.div`
  width: 240px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => props.active ? '#000' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#000'};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.active ? '#000' : '#eee'};
  }

  span {
    font-size: 20px;
  }
`;

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

const RegisterButton = styled.button`
  padding: 12px 24px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #333;
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
  background-color: ${props => props.status === '제공중' ? '#e6f3e6' : '#f8f9fa'};
  color: ${props => props.status === '제공중' ? '#2f9e44' : '#666'};
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

export default MyPageMain;