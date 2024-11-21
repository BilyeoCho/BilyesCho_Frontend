import React, { useState } from 'react';
import styled from 'styled-components';
import SideBar from '../../components/SideBar';
import RegisterHistory from './RegisterHistory';
import RentHistory from './RentHistory';

const MyPageMain = () => {
  const [activeMenu, setActiveMenu] = useState('등록내역');

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case '등록내역':
        return <RegisterHistory />;
      case '대여내역':
        return <RentHistory />;
      // 다른 메뉴들도 추가 예정
      default:
        return <RegisterHistory />;
    }
  };

  return (
    <Container>
      <SideBar 
        activeMenu={activeMenu} 
        onMenuClick={handleMenuClick}
      />
      {renderContent()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 40px;
  height: 100%;
`;

export default MyPageMain;