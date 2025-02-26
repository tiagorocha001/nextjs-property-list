# Next.js Property Listings with MUI

This project implements a property listings application using Next.js 14 with App Router, TypeScript, and Material-UI (MUI).

## Features

- Dynamic routing for property details (`/property/[propertyId]`)
- Material UI components and theming
- Responsive design for all screen sizes
- Loading states and error handling
- Client-side data fetching

## Project Structure

```
app/
├── components/
│   └── Header.tsx
├── property/
│   └── [propertyId]/
│       ├── page.tsx
│       └── loading.tsx
├── types/
│   └── listing.ts
├── layout.tsx
├── not-found.tsx
├── page.tsx
└── providers.tsx
```

## Setup Instructions

1. Create a new Next.js project:
   ```bash
   npx create-next-app@latest --typescript
   ```

2. Install required dependencies:
   ```bash
   npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
   ```

3. Copy the provided files to their respective locations in your project structure.

4. Start the development server:
   ```bash
   npm run dev
   ```

## Data Source

The application fetches property listing data from:
```
https://s3.us-west-2.amazonaws.com/cdn.number8.com/LA/listings.json
```

## Key Implementation Details

### Dynamic Routes

The application uses Next.js App Router's dynamic routing capabilities to create individual property pages:

- The main page (`app/page.tsx`) displays a grid of property cards
- Each property links to a dynamic route (`/property/[propertyId]`)
- The property detail page (`app/property/[propertyId]/page.tsx`) fetches and displays detailed information

### Material UI Implementation

- Custom theme is defined in `providers.tsx`
- Components use MUI's styling system
- Responsive design is implemented using MUI's Grid system
- Icons from `@mui/icons-material` enhance the UI

### Performance Considerations

- Includes loading states (skeletons) for better UX
- Error handling with custom not-found page
- Client-side data fetching for realistic implementation

## Extension Possibilities

- Add filtering and sorting functionality
- Implement search feature
- Add authentication for user accounts
- Create a favorites/saved properties feature
- Integrate with a backend API for real data