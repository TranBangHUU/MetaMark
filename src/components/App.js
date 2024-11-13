import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../Home';
import Dashboard from '../Dashboard';

function App() {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        navigate('/dashboard');
      } catch (error) {
        console.error("Kết nối thất bại:", error);
      }
    } else {
      alert('MetaMask chưa được cài đặt');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<Home onConnect={connectWallet} />} />
      <Route path="/dashboard" element={<Dashboard account={account} onDisconnect={disconnectWallet} />} />
    </Routes>
  );
}

export default App;
