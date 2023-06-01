import { Menu, MenuProps } from 'antd';
import './navbar.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [current, setCurrent] = useState('');

  const items: MenuProps['items'] = [
    {
      label: (
        <a href="#" rel="noopener noreferrer">
          Adverts
        </a>
      ),
      key: 'adverts',
    },
    {
      label: <NavLink to="/Login">Login</NavLink>,
      key: 'login',
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <div>
      <Menu
        className="navbar"
        mode="horizontal"
        items={items}
        onClick={onClick}
        selectedKeys={[current]}
      />
    </div>
  );
}

export default Navbar;
