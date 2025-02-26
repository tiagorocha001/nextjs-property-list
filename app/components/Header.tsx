'use client';

import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid #eaeaea' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              PROPERTY FINDER
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
            <Button variant="contained" color="primary">Sign In</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}