import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { signIn } from '../utils/auth';
import Logo from '../assets/pupper-logo.png';

export default function Banner({ showLogin, register }) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: 64,
            }}
            alt="Your logo."
            src={Logo}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              '&:hover': {
                color: 'white',
              },
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            <Link className="nav-link" to="/">PUPPER</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              '&:hover': {
                color: 'white',
              },
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link className="nav-link" to="/">PUPPER</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip>
              {
              /* eslint-disable */
              showLogin == false && register 
                ? <IconButton></IconButton> 
                : showLogin 
                ? <IconButton href="/Login" >Login</IconButton> 
                : <IconButton onClick={signIn}>Register</IconButton>
              }
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
