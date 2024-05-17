import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Home = () => {
  const buttonStyle = {
    backgroundColor: 'green',
    marginTop: '20px', 
    color:"white",
    textTransform: 'none'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '100vh', 
  };
  const heading={
    textTransform:"none",
    color:"#9827f5",
    fontFamily:'sans-serif'
};

  return (
    <div style={containerStyle}>
      <h2 style={heading}>Welcome to My App</h2>
      <Button variant="contained" component={Link} to="/taskbar" style={buttonStyle}>
        Go to Taskbar
      </Button>
    </div>
  );
};

export default Home;
