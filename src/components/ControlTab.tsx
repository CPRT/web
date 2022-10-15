import React from 'react';
import { Container, createTheme } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { drawerWidth } from './Sidebar';
import InputHandler from './InputHandler';

const theme = createTheme();

function ControlTab(): React.ReactElement {
  const drawerOpen = useOutletContext();
  const { height, width } = useWindowDimensions();

  const contentWidth =
    width -
    (drawerOpen ? drawerWidth : parseInt(theme.spacing(7).replace('px', ''))) -
    32; // width - sidebar width - padding
  const contentHeight = height - (width >= 600 ? 64 : 48) - 64; // height - menubar height

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
      <InputHandler contentWidth={contentWidth} contentHeight={contentHeight} />
    </Container>
  );
}

export default ControlTab;
