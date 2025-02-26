'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { PropertyListing } from '../../types';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardMedia,
  Button,
  Grid,
  Paper,
  Divider,
  Chip,
  Stack,
  CircularProgress,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactAgentForm from '../../components/ContactAgentForm';
import SavePropertyButton from '../../components/SavePropertyButton';

// Define params type for TypeScript
interface PropertyPageProps {
  params: Promise<{
    propertyId: string;
  }>;
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const unwrappedParams = React.use(params);
  const propertyId = unwrappedParams.propertyId;
  
  const [property, setProperty] = useState<PropertyListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching data from a local source
    async function fetchProperty() {
      try {
        // Simulate a network delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Fetch all listings from the local JSON file
        const response = await fetch('/data/listings.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const listings: PropertyListing[] = await response.json();
        
        // Find the property with the matching ID
        const id = parseInt(propertyId);
        const foundProperty = listings.find(listing => listing.Id === id);
        
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          setError('Property not found');
          // Will redirect to the not-found page
          router.push('/not-found');
        }
      } catch (error) {
        console.error('Error fetching property:', error);
        setError('Failed to load property details. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [propertyId, router]);

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading property details...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Button 
          component={Link} 
          href="/" 
          startIcon={<ArrowBackIcon />}
          variant="contained"
        >
          Back to listings
        </Button>
      </Container>
    );
  }

  if (!property) {
    return null; // Will be redirected to not-found
  }

  // Format date to be more readable
  const listedDate = new Date(property.DateListed).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button 
          component={Link} 
          href="/" 
          startIcon={<ArrowBackIcon />} 
          variant="text"
          color="primary"
        >
          Back to listings
        </Button>
        
        <SavePropertyButton property={property} />
      </Box>

      <Card sx={{ mb: 4, overflow: 'hidden', borderRadius: 2 }}>
        <CardMedia
          component="img"
          height="400"
          image={property.PictureURL}
          alt={property.Title}
        />
      </Card>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              {property.Title}
            </Typography>
            <Typography variant="h4" color="primary" fontWeight="bold">
              ${property["Sale Price"].toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <LocationOnIcon color="action" sx={{ mr: 1 }} />
            <Typography variant="h6" color="text.secondary">
              {property.Location}
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={6} sm={2.4}>
              <Paper elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
                <HotelIcon color="primary" />
                <Typography variant="h6">{property.Bedrooms}</Typography>
                <Typography variant="body2" color="text.secondary">Bedrooms</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={2.4}>
              <Paper elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
                <BathtubIcon color="primary" />
                <Typography variant="h6">{property.Bathrooms}</Typography>
                <Typography variant="body2" color="text.secondary">Bathrooms</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={2.4}>
              <Paper elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
                <SquareFootIcon color="primary" />
                <Typography variant="h6">{property.Sqft.toLocaleString()}</Typography>
                <Typography variant="body2" color="text.secondary">Square Feet</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={2.4}>
              <Paper elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
                <DirectionsCarIcon color="primary" />
                <Typography variant="h6">{property.Parking}</Typography>
                <Typography variant="body2" color="text.secondary">Parking</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={2.4}>
              <Paper elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
                <HomeIcon color="primary" />
                <Typography variant="h6">{property.YearBuilt}</Typography>
                <Typography variant="body2" color="text.secondary">Year Built</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            Description
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            {property.Description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
            <Chip 
              icon={<DirectionsCarIcon />}
              label={`${property.Parking} parking spaces`}
              variant="outlined"
            />
            <Chip 
              icon={<CalendarTodayIcon />}
              label={`Listed on: ${listedDate}`}
              variant="outlined"
            />
            <Chip 
              label={`ID: ${property.Id}`}
              variant="outlined"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
            <ContactAgentForm />
        </Grid>
      </Grid>
    </Container>
  );
}