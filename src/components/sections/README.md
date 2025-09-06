# Section Components

This directory contains all the individual section components that make up the main page of the Sabar Bonda film website.

## Components

- **HeroSection.tsx** - The main hero section with logo and award laurels
- **AboutSection.tsx** - Director's statement, synopsis, and cast & crew information
- **AccoladesSection.tsx** - Awards, recognition, and critical praise carousel
- **GallerySection.tsx** - Behind-the-scenes image gallery carousel
- **ScreeningsSection.tsx** - Festival circuit and screening information
- **ContactSection.tsx** - Contact information panels

## Usage

All components are imported and used in the main `Home.tsx` component:

```tsx
import {
  HeroSection,
  AboutSection,
  AccoladesSection,
  GallerySection,
  ScreeningsSection,
  ContactSection
} from '@/components/sections';

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <AccoladesSection />
      <GallerySection />
      <ScreeningsSection />
      <ContactSection />
    </>
  );
};
```

## Benefits

1. **Easy Reordering**: Simply change the order of components in the Home.tsx file
2. **Modular Design**: Each section is self-contained with its own state and logic
3. **Maintainability**: Changes to individual sections don't affect others
4. **Navigation Compatibility**: All section IDs are preserved for smooth scroll navigation

## Navigation

The navigation component (`Navigation.tsx`) remains unchanged and continues to work with the section IDs:
- `#home` - HeroSection
- `#about` - AboutSection  
- `#accolades` - AccoladesSection
- `#bts` - GallerySection
- `#screenings` - ScreeningsSection
- `#contact` - ContactSection
