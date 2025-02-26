'use client';

import { PropertyListing } from './types';
import { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Stack,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Paper
} from '@mui/material';
import PropertyCard from './components/PropertyCard';
import PropertyCardSkeleton from './components/PropertyCardSkeleton';

export default function Home() {
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [parking, setParking] = useState<number>(1);
  const [priceRange, setPriceRange] = useState<number[]>([100000, 800000]);
  
  // Get min and max price for the slider
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000000);

  useEffect(() => {
    // Simulate fetching data from a local source
    async function fetchListings() {
      try {
        // Simulate a network delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const response = await fetch('/data/listings.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        setListings(data);
        setFilteredListings(data);
        
        // Calculate min and max prices for the slider
        const prices = data.map((listing: PropertyListing) => listing["Sale Price"]);
        setPriceMin(Math.min(...prices));
        setPriceMax(Math.max(...prices));
        setPriceRange([Math.min(...prices), Math.max(...prices)]);
        
        setError(null);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setError('Failed to load listings. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);
  
  // Apply filters
  const applyFilters = () => {
    const filtered = listings.filter((listing) => {
      return (
        listing.Bedrooms >= bedrooms &&
        listing.Bathrooms >= bathrooms &&
        listing.Parking >= parking &&
        listing["Sale Price"] >= priceRange[0] &&
        listing["Sale Price"] <= priceRange[1]
      );
    });
    
    setFilteredListings(filtered);
  };
  
  // Handle price range change
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };
  
  // Reset filters
  const resetFilters = () => {
    setBedrooms(1);
    setBathrooms(1);
    setParking(1);
    setPriceRange([priceMin, priceMax]);
    setFilteredListings(listings);
  };
  
  // Format price for display
  const formatPrice = (value: number) => {
    return `$${value.toLocaleString()}`;
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Property Listings
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}
      
      {/* Filter Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="bedrooms-label">Bedrooms</InputLabel>
              <Select
                labelId="bedrooms-label"
                value={bedrooms}
                label="Bedrooms"
                onChange={(e) => setBedrooms(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={`bed-${num}`} value={num}>{num}+</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="bathrooms-label">Bathrooms</InputLabel>
              <Select
                labelId="bathrooms-label"
                value={bathrooms}
                label="Bathrooms"
                onChange={(e) => setBathrooms(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={`bath-${num}`} value={num}>{num}+</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="parking-label">Parking</InputLabel>
              <Select
                labelId="parking-label"
                value={parking}
                label="Parking"
                onChange={(e) => setParking(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <MenuItem key={`park-${num}`} value={num}>{num}+</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography id="price-range-slider" gutterBottom>
              Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </Typography>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={priceRange}
              onChange={handlePriceChange}
              min={priceMin}
              max={priceMax}
              step={10000}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPrice}
              disableSwap
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Stack direction="row" spacing={1}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={applyFilters}
                fullWidth
              >
                Search
              </Button>
              <Button 
                variant="outlined" 
                onClick={resetFilters}
              >
                Reset
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Results count */}
      {!loading && (
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Showing {filteredListings.length} of {listings.length} properties
        </Typography>
      )}
      
      {/* Listings Grid */}
      <Grid container spacing={3}>
        {loading ? (
          // Loading skeletons
          Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PropertyCardSkeleton />
            </Grid>
          ))
        ) : (
          filteredListings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing.Id}>
              <PropertyCard listing={listing} />
            </Grid>
          ))
        )}
        
        {!loading && filteredListings.length === 0 && (
          <Grid item xs={12}>
            <Alert severity="info">
              No properties match your search criteria. Try adjusting your filters.
            </Alert>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}