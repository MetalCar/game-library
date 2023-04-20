import { useState, forwardRef, useImperativeHandle } from 'react';

import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import sideMenuItems, { MenuItem } from '../../routes/menu';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export type ResponsiveDrawerRef = {
    toggleDrawer: () => void;
}

const ResponsiveDrawer = forwardRef((props, ref) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const biggerThanLp = useMediaQuery(theme.breakpoints.up('lg'));

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        toggleDrawer: () => {
            setDrawerOpen(!drawerOpen);
        }
    }));

    return <SwipeableDrawer
        anchor={'left'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        variant={biggerThanLp ? 'permanent' : 'temporary'}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {sideMenuItems.map((item: MenuItem, index: number) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => navigate(item.route)}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
})

export default ResponsiveDrawer;
