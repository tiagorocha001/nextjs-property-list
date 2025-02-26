'use client';

import { Container, Box, Skeleton, Card, Grid, Paper, Button } from '@mui/material';

export default function Loading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button disabled sx={{ mb: 3 }}>
        <Skeleton variant="text" width={120} />
      </Button>

      <Card sx={{ mb: 4, overflow: 'hidden', borderRadius: 2 }}>
        <Skeleton variant="rectangular" height={400} animation="wave" />
      </Card>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Skeleton variant="text" width="60%" height={40} animation="wave" />
            <Skeleton variant="text" width="25%" height={40} animation="wave" />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} animation="wave" />
            <Skeleton variant="text" width="30%" animation="wave" />
          </Box>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            {[...Array(4)].map((_, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Paper elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
                  <Skeleton variant="circular" width={30} height={30} sx={{ mx: 'auto', mb: 1 }} animation="wave" />
                  <Skeleton variant="text" width="50%" sx={{ mx: 'auto' }} animation="wave" />
                  <Skeleton variant="text" width="80%" sx={{ mx: 'auto' }} animation="wave" />
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Skeleton variant="text" width="30%" height={32} sx={{ mt: 4 }} animation="wave" />
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} variant="text" height={20} animation="wave" sx={{ my: 1 }} />
          ))}

          <Skeleton variant="rectangular" height={1} sx={{ my: 3 }} animation="wave" />

          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} variant="rounded" width={120} height={32} animation="wave" />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Skeleton variant="text" width="80%" height={32} animation="wave" />
            <Skeleton variant="text" width="100%" animation="wave" />
            <Skeleton variant="text" width="90%" animation="wave" />
            <Skeleton variant="rectangular" height={36} sx={{ mt: 2, mb: 2 }} animation="wave" />
            <Skeleton variant="rectangular" height={36} animation="wave" />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}