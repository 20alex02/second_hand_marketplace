import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
