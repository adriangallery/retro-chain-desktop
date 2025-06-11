
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const WalletConnection: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setIsConnected(true);
          setAddress(accounts[0].address);
          const balance = await provider.getBalance(accounts[0].address);
          setBalance(ethers.formatEther(balance));
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask or another Web3 wallet!');
      return;
    }

    try {
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);

      setIsConnected(true);
      setAddress(address);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress('');
    setBalance('');
  };

  return (
    <div className="p-4 font-mono text-sm space-y-4">
      <div className="text-center border-b border-gray-300 pb-2">
        <h3 className="font-bold">Crypto Wallet</h3>
      </div>

      {!isConnected ? (
        <div className="text-center space-y-4">
          <div className="text-gray-600">
            Connect your wallet to access blockchain features
          </div>
          <button
            onClick={connectWallet}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 border border-black font-mono text-sm"
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <div className="font-bold mb-1">Address:</div>
            <div className="bg-gray-100 p-2 border text-xs break-all">
              {address}
            </div>
          </div>
          
          <div>
            <div className="font-bold mb-1">Balance:</div>
            <div className="bg-gray-100 p-2 border">
              {parseFloat(balance).toFixed(4)} ETH
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={checkConnection}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 border border-black text-xs"
            >
              Refresh
            </button>
            <button
              onClick={disconnectWallet}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 border border-black text-xs"
            >
              Disconnect
            </button>
          </div>

          <div className="text-xs text-gray-600 mt-4 border-t pt-2">
            Ready for blockchain transactions
          </div>
        </div>
      )}
    </div>
  );
};
