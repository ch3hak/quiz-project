import React from 'react';

const Score = ({ scored, total }) => {
  return (
    <div style={{
      padding: '1em',
      marginTop: '2em',
      borderTop: '1px solid #ccc',
      textAlign: 'center',
      background: '#f9f9f9',
      borderRadius: '4px'
    }}>
      <h3>Your Score</h3>
      <p style={{ fontSize: '1.5em', margin: 0 }}>
        {scored} / {total}
      </p>
    </div>
  );
};

export default Score;
