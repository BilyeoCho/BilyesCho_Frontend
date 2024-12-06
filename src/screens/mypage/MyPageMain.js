import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import RegisterHistory from './RegisterHistory';
import RentHistory from './RentHistory';
import ReviewHistory from './ReviewHistory';
import Profile from './Profile';

const MyPageMain = () => {
  const [activeMenu, setActiveMenu] = useState('등록내역');
  const navigate = useNavigate();
  const location = useLocation();

  // URL의 쿼리 파라미터에서 현재 탭 가져오기
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    
    switch (tab) {
      case 'register':
        setActiveMenu('등록내역');
        break;
      case 'rent':
        setActiveMenu('대여내역');
        break;
      case 'review':
        setActiveMenu('리뷰내역');
        break;
      case 'profile':
        setActiveMenu('프로필');
        break;
      default:
        setActiveMenu('등록내역');
        navigate('/mypage?tab=register', { replace: true });
    }
  }, [location.search, navigate]);

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    switch (menuName) {
      case '등록내역':
        navigate('/mypage?tab=register');
        break;
      case '대여내역':
        navigate('/mypage?tab=rent');
        break;
      case '리뷰내역':
        navigate('/mypage?tab=review');
        break;
      case '프로필':
        navigate('/mypage?tab=profile');
        break;
      default:
        navigate('/mypage?tab=register');
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case '등록내역':
        return <RegisterHistory />;
      case '대여내역':
        return <RentHistory />;
      case '리뷰내역':
        return <ReviewHistory />;
      case '프로필':
        return <Profile />;
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
  min-height: calc(100vh - 60px);
`;

export default MyPageMain;