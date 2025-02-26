'use client';

import { PropertyListing } from '../types';
import Link from 'next/link';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea, 
  Box,
  Chip,
  Stack,
  Typography
} from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

interface PropertyCardProps {
  listing: PropertyListing;
  showParking?: boolean;
}

export default function PropertyCard({ listing, showParking = false }: PropertyCardProps) {
  return (
    <Card sx={{ 
      height: '100%',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 8
      }
    }}>
      <CardActionArea component={Link} href={`/property/${listing.Id}`}>
        <CardMedia
          component="img"
          height="200"
          image={listing.ThumbnailURL}
          alt={listing.Title}
        />
        <CardContent>
          <Typography variant="h6" component="h2" noWrap>
            {listing.Title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
            <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {listing.Location}
            </Typography>
          </Box>
          
          <Typography variant="h6" color="primary" fontWeight="bold">
            ${listing["Sale Price"].toLocaleString()}
          </Typography>
          
          <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap">
            <Chip 
              icon={<HotelIcon />} 
              label={`${listing.Bedrooms} beds`} 
              size="small" 
              variant="outlined" 
              sx={{ mb: 1 }}
            />
            <Chip 
              icon={<BathtubIcon />} 
              label={`${listing.Bathrooms} baths`} 
              size="small" 
              variant="outlined" 
              sx={{ mb: 1 }}
            />
            <Chip 
              icon={<SquareFootIcon />} 
              label={`${listing.Sqft.toLocaleString()} sqft`} 
              size="small" 
              variant="outlined" 
              sx={{ mb: 1 }}
            />
            {showParking && (
              <Chip 
                icon={<DirectionsCarIcon />} 
                label={`${listing.Parking} parking`} 
                size="small" 
                variant="outlined" 
                sx={{ mb: 1 }}
              />
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}