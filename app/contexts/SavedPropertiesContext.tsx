'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { PropertyListing } from '../types';

interface SavedPropertiesContextType {
  savedProperties: PropertyListing[];
  addProperty: (property: PropertyListing) => void;
  removeProperty: (propertyId: number) => void;
  isPropertySaved: (propertyId: number) => boolean;
}

const SavedPropertiesContext = createContext<SavedPropertiesContextType | undefined>(undefined);

export const useSavedProperties = () => {
  const context = useContext(SavedPropertiesContext);
  if (!context) {
    throw new Error('useSavedProperties must be used within a SavedPropertiesProvider');
  }
  return context;
};

interface SavedPropertiesProviderProps {
  children: ReactNode;
}

export const SavedPropertiesProvider = ({ children }: SavedPropertiesProviderProps) => {
  const [savedProperties, setSavedProperties] = useState<PropertyListing[]>([]);

  // Load saved properties from localStorage on initial render
  useEffect(() => {
    const savedItems = localStorage.getItem('savedProperties');
    if (savedItems) {
      try {
        setSavedProperties(JSON.parse(savedItems));
      } catch (error) {
        console.error('Failed to parse saved properties:', error);
        localStorage.removeItem('savedProperties');
      }
    }
  }, []);

  // Save to localStorage whenever savedProperties changes
  useEffect(() => {
    localStorage.setItem('savedProperties', JSON.stringify(savedProperties));
  }, [savedProperties]);

  // Add a property to saved list
  const addProperty = (property: PropertyListing) => {
    setSavedProperties(prev => {
      // Don't add if already in the list
      if (prev.some(p => p.Id === property.Id)) {
        return prev;
      }
      return [...prev, property];
    });
  };

  // Remove a property from saved list
  const removeProperty = (propertyId: number) => {
    setSavedProperties(prev => prev.filter(property => property.Id !== propertyId));
  };

  // Check if a property is saved
  const isPropertySaved = (propertyId: number) => {
    return savedProperties.some(property => property.Id === propertyId);
  };

  return (
    <SavedPropertiesContext.Provider value={{ savedProperties, addProperty, removeProperty, isPropertySaved }}>
      {children}
    </SavedPropertiesContext.Provider>
  );
};