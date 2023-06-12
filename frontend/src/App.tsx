import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Adverts from './pages/adverts/Adverts';
import AdvertDetail from './pages/advertDetail/AdvertDetail';
import Navbar from './components/navbar/Navbar';
import './index.css';
import Edit from './pages/edit/Edit';

export const App: FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Adverts />} />
        <Route path="/advert/:id" element={<AdvertDetail />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Edit" element={<Edit />} />
      </Routes>
    </>
  );
};
