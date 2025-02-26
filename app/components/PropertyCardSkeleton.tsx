'use client';

import { 
  Card, 
  CardContent, 
  Skeleton,
  Box
} from '@mui/material';

export default function PropertyCardSkeleton() {
  return (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" height={30} />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="60%" />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="text" width="25%" />
          <Skeleton variant="text" width="25%" />
          <Skeleton variant="text" width="25%" />
        </Box>
      </CardContent>
    </Card>
  );
}