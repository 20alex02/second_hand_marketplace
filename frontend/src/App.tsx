import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Adverts from './pages/adverts/Adverts';
import AdvertDetail from './pages/advertDetail/AdvertDetail';
import Navbar from './components/navbar/Navbar';
import './index.css';
import AdvertCreate from './pages/advertCreate/AdvertCreate';
import { ConfigProvider } from 'antd';

export const App: FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0CBAE8',
        },
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Adverts />} />
        <Route path="/advert/:id" element={<AdvertDetail />} />
        <Route path="/advert-creation" element={<AdvertCreate />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </ConfigProvider>
  );
};
