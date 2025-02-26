'use client';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Typography, 
  Grid, 
  Box,
  Divider,
  Button,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSavedProperties } from '../contexts/SavedPropertiesContext';
import PropertyCard from './PropertyCard';

interface SavedPropertiesModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SavedPropertiesModal({ open, onClose }: SavedPropertiesModalProps) {
  const { savedProperties, removeProperty } = useSavedProperties();
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
      aria-labelledby="saved-properties-dialog-title"
    >
      <DialogTitle id="saved-properties-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="span">
          Saved Properties
        </Typography>
        <IconButton aria-label="close" onClick={onClose} size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ pt: 2 }}>
        {savedProperties.length === 0 ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            You haven&apos;t saved any properties yet.
          </Alert>
        ) : (
          <>
            <Typography variant="body2" sx={{ mb: 2 }}>
              You have {savedProperties.length} saved {savedProperties.length === 1 ? 'property' : 'properties'}.
            </Typography>
            
            <Grid container spacing={3}>
              {savedProperties.map(property => (
                <Grid item xs={12} sm={6} md={4} key={property.Id}>
                  <Box sx={{ position: 'relative' }}>
                    <PropertyCard listing={property} showParking={true} />
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => removeProperty(property.Id)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        minWidth: 'auto',
                        px: 1
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}