'use client';

import { useState } from 'react';
import { Button, Tooltip, Snackbar, Alert, Box } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useSavedProperties } from '../contexts/SavedPropertiesContext';
import { PropertyListing } from '../types';
import SavedPropertiesModal from './SavedPropertiesModal';

interface SavePropertyButtonProps {
  property: PropertyListing;
}

export default function SavePropertyButton({ property }: SavePropertyButtonProps) {
  const { addProperty, removeProperty, isPropertySaved } = useSavedProperties();
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const isSaved = isPropertySaved(property.Id);
  
  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent propagation to parent elements
    
    if (isSaved) {
      removeProperty(property.Id);
      setSnackbarMessage('Property removed from saved properties');
    } else {
      addProperty(property);
      setSnackbarMessage('Property saved successfully');
    }
    
    setSnackbarOpen(true);
  };
  
  const handleViewSaved = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent propagation to parent elements
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          onClick={handleSaveToggle}
          sx={{ mr: 1 }}
        >
          {isSaved ? 'Saved' : 'Save Property'}
        </Button>
        
        {isSaved && (
          <Tooltip title="View all saved properties">
            <Button 
              variant="outlined" 
              color="primary"
              onClick={handleViewSaved}
            >
              View Saved
            </Button>
          </Tooltip>
        )}
      </Box>
      
      <SavedPropertiesModal 
        open={modalOpen}
        onClose={handleCloseModal}
      />
      
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={isSaved ? "success" : "info"} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}