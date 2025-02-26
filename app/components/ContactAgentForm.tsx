'use client';

import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  Paper,
  Stack
} from '@mui/material';

export default function ContactAgentForm() {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    comments: ''
  });
  
  // Validation state
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    comments: ''
  });
  
  // Form submission state
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear the error for this field when user starts typing
    setErrors({
      ...errors,
      [name]: ''
    });
    
    // Handle phone field to only allow numbers
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData({
        ...formData,
        [name]: numericValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Reset submission status when user makes changes
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      phone: '',
      comments: ''
    };
    let isValid = true;
    
    // Validate fullName
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }
    
    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Phone number should be at least 10 digits';
      isValid = false;
    }
    
    // Validate comments
    if (!formData.comments.trim()) {
      newErrors.comments = 'Please enter your message';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate API call
      setTimeout(() => {
        setSubmitStatus('success');
        // Optionally reset form after successful submission
        // setFormData({ fullName: '', email: '', phone: '', comments: '' });
      }, 500);
    } else {
      setSubmitStatus('error');
    }
  };
  
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Contact Agent
      </Typography>

      <Typography variant="body2" paragraph>
        This beautiful property is now available for viewing. Contact our agent to schedule a visit or request more information.
      </Typography>
      
      {submitStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Message sent successfully!
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.fullName}
            helperText={errors.fullName}
            size="small"
          />
          
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
            size="small"
          />
          
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.phone}
            helperText={errors.phone}
            size="small"
            inputProps={{ inputMode: 'numeric' }}
          />
          
          <TextField
            label="Comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={4}
            error={!!errors.comments}
            helperText={errors.comments}
            size="small"
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            sx={{ mt: 2 }}
          >
            Contact Now
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}