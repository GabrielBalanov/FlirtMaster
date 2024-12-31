import React from 'react';

const MoveOnButton = ({ onClick, children, disabled }) => {
  const containerStyle = {
    width: '100%',
    marginTop: '20px', // Add spacing between inputs and button
    display: 'flex',
    justifyContent: 'center',
  };

  const buttonStyle = {
    background: 'linear-gradient(to right, #cbfdf2, #02c18d)',
    color: '#0e274d',
    width: '100%',
    padding: '0.6em 1.2em',
    fontSize: '1em',
    fontWeight: 500,
    borderRadius: '8px',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'opacity 0.25s, border-color 0.25s',
    opacity: disabled ? 0.7 : 1,
    fontFamily: 'Assistant, sans-serif',
    fontWeight: 'bold',
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={handleClick}
        disabled={disabled}
        id="next-button-create-form"
        type="button"
      >
        {children}
      </button>
    </div>
  );
};

export default MoveOnButton;