import { Drawer, Menu, MenuProps } from 'antd';
import './navbar.css';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AuthToken, UserRole } from '../../state/atom';
import { LogoutOutlined, LoginOutlined, MenuOutlined } from '@ant-design/icons';

function Navbar() {
  const [current, setCurrent] = useState('');
  const [token] = useRecoilState(AuthToken);
  const userRole = useRecoilValue(UserRole);
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState<string | null>(null);
  const navigator = useNavigate();

  useEffect(() => {
    setUrl(location.pathname.toUpperCase());
  });

  const logout = () => {
    localStorage.clear();
    navigator('/');
    navigator(0);
  };
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    setOpenMenu(false);
  };

  const items: MenuProps['items'] = [
    {
      label: <NavLink to="/">Adverts</NavLink>,
      key: 'adverts',
      className: 'navbar__item ' + (url === '/' ? 'navbar__item--active' : ''),
    },
  ];

  if (token === null || token === '') {
    items.push({
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
    });
  } else {
    items.push({
      label: <NavLink to="/MyAdverts">My adverts</NavLink>,
      key: 'myAdverts',
      className:
        'navbar__item ' +
        (url?.startsWith('/MyAdverts'.toUpperCase())
          ? 'navbar__item--active'
          : ''),
    });
    if (userRole === 'ADMIN') {
      items.push({
        label: <NavLink to="/Users">Users</NavLink>,
        key: 'users',
        className:
          'navbar__item ' +
          (url === '/Users'.toUpperCase() ? 'navbar__item--active' : ''),
      });
    }
    items.push(
      {
        label: <NavLink to="/Edit">Edit</NavLink>,
        key: 'edit',
        className:
          'navbar__item ' +
          (url === '/Edit'.toUpperCase() ? 'navbar__item--active' : ''),
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
      }
    );
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
