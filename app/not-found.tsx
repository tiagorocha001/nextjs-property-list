'use client';

import Link from 'next/link';
import { Container, Typography, Button, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
        <SentimentDissatisfiedIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Property Not Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Sorry, the property you&apos;re looking for doesn&apos;t exist or has been removed.
        </Typography>
        
        <Button 
          component={Link} 
          href="/" 
          variant="contained" 
          startIcon={<HomeIcon />}
          size="large"
        >
          Return to Listings
        </Button>
      </Paper>
    </Container>
  );
}