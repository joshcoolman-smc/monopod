'use client';

import React, { useEffect, useState } from 'react';

export const TestApi = () => {
  const [message, setMessage] = useState('Loading...');
  const [itemId, setItemId] = useState<number | null>(null);
  const [apiItemMessage, setApiItemMessage] = useState(
    'Waiting for Item message...'
  );

  useEffect(() => {
    fetch('http://localhost:8000')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  const fetchItem = async () => {
    if (!itemId) return;
    try {
      const response = await fetch(`http://localhost:8000/items/${itemId}`);
      if (response.ok) {
        const itemData = await response.json();
        setApiItemMessage(itemData.message);
      } else {
        setApiItemMessage('Error retrieving item.');
      }
    } catch (error) {
      setApiItemMessage('Error connecting to API');
      console.error('Error fetching item:', error);
    }
  };

  return (
    <div className="divide-y divide-gray-200">
      <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        <h1 className="text-2xl font-bold mb-8">Next.js Frontend</h1>
        <p className="mb-4">API Message: {message}</p>
        <hr className="my-8" />
        <h2 className="text-xl font-semibold mb-4">Get Item Message</h2>
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Enter item ID"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setItemId(Number(e.target.value))}
          />
          <button
            onClick={fetchItem}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Fetch Item
          </button>
        </div>
        <p className="mt-4">{apiItemMessage}</p>
      </div>
    </div>
  );
};
