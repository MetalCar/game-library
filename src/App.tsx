import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import SearchBar from './components/SearchBar/SearchBar';
import ResponsiveDrawer, { ResponsiveDrawerRef } from './components/ResponsiveDrawer/ResponsiveDrawer';


function App() {
  const drawerRef = useRef<ResponsiveDrawerRef>();
  const theme = useTheme();
  const biggerThanLp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {!biggerThanLp &&
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => drawerRef.current?.toggleDrawer()}
            >
              <MenuIcon />
            </IconButton>
          }
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Game Library
          </Typography>
          <SearchBar />
        </Toolbar>
      </AppBar>

      <ResponsiveDrawer ref={drawerRef} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container sx={{ pb: 8 }} maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default App;
