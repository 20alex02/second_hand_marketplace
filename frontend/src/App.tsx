import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Adverts from './pages/adverts/Adverts';
import Navbar from './components/navbar/Navbar';
import './index.css';

export const App: FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Adverts />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
};
