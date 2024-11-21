import React from 'react';
import styled from 'styled-components';

const SideBar = ({ activeMenu, onMenuClick }) => {
  const menuItems = [
    { name: '등록내역', icon: '📝' },
    { name: '대여내역', icon: '📦' },
    { name: '리뷰내역', icon: '⭐' },
    { name: '프로필', icon: '👤' },
  ];

  return (
    <SidebarContainer>
      <MenuList>
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            active={activeMenu === item.name}
            onClick={() => onMenuClick(item.name)}
          >
            <span>{item.icon}</span>
            {item.name}
          </MenuItem>
        ))}
      </MenuList>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
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

export default SideBar;
