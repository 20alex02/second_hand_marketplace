import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Adverts from './pages/adverts/Adverts';

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Adverts />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
