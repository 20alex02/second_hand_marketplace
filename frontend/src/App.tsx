import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import './index.css';

export const App: FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
