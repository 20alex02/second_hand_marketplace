import { Drawer, Menu, MenuProps } from 'antd';
import './navbar.css';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { AuthToken } from '../../state/atom';
import { LogoutOutlined, LoginOutlined, MenuOutlined } from '@ant-design/icons';

function Navbar() {
  const [current, setCurrent] = useState('');
  const [token, setToken] = useRecoilState(AuthToken);
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    setUrl(location.pathname.toUpperCase());
  });

  const logout = () => {
    setToken('');
  };
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    setOpenMenu(false);
  };

  let items: MenuProps['items'];
  if (token === '') {
    items = [
      {
        label: <NavLink to="/">Adverts</NavLink>,
        key: 'adverts',
        className:
          'navbar__item ' + (url === '/' ? 'navbar__item--active' : ''),
      },
      {
        label: (
          <NavLink to="/Login">
            Login&nbsp;
            <LoginOutlined rev={undefined} />
          </NavLink>
        ),
        key: 'login',
        className:
          'navbar__item ' +
          (url === '/Login'.toUpperCase() ? 'navbar__item--active' : ''),
      },
    ];
  } else {
    items = [
      {
        label: <NavLink to="/">Adverts</NavLink>,
        key: 'adverts',
        className:
          'navbar__item ' + (url === '/' ? 'navbar__item--active' : ''),
      },
      {
        label: <NavLink to="/MyAdverts">My adverts</NavLink>,
        key: 'myAdverts',
        className:
          'navbar__item ' +
          (url === '/MyAdverts'.toUpperCase() ? 'navbar__item--active' : ''),
      },
      {
        label: (
          <NavLink to="/" onClick={logout}>
            Logout&nbsp;
            <LogoutOutlined rev={undefined} />
          </NavLink>
        ),
        key: 'logout',
        className: 'navbar__item',
      },
    ];
  }

  return (
    <div className="navbar">
      <div className="navbar__icon">
        <MenuOutlined
          className={'navbar__icon__item'}
          onClick={() => setOpenMenu(true)}
          rev={undefined}
        />
      </div>
      <Menu
        mode="horizontal"
        items={items}
        onClick={onClick}
        selectedKeys={[current]}
        className="navbar__menu"
      />
      <Drawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        placement="top"
        className="navbar-drawer"
      >
        <Menu
          className="navbar-drawer__nav"
          mode="vertical"
          items={items}
          onClick={onClick}
          selectedKeys={[current]}
        />
      </Drawer>
    </div>
  );
}

export default Navbar;
