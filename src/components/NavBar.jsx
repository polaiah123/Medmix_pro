import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const buttonStyle = { 
        color:"white",
        textTransform: 'none'
      };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Task Bar
        </Typography>
        <Button  component={Link} to="/" style={buttonStyle}>
        Home
      </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
