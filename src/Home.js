import React from 'react';

function Home({ onConnect }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
      <button
        style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '10px', width: '150px', cursor: 'pointer' }}
        onClick={onConnect}
      >
        Connect
      </button>
    </div>
  );
}

export default Home;
