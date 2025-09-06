# Section Components

This directory contains all the individual section components that make up the main page of the Sabar Bonda film website.

## Components

- **HeroSection.tsx** - The main hero section with logo and award laurels in 3-2 grid layout
- **AboutSection.tsx** - Director's statement, synopsis, and cast & crew information
- **AccoladesSection.tsx** - Critical praise carousel and awards grid (3-2 layout)
- **GallerySection.tsx** - Behind-the-scenes image gallery carousel
- **ScreeningsSection.tsx** - Festival circuit and screening information
- **ContactSection.tsx** - Contact information panels

## Recent Updates

### Award Laurels Layout (3-2 Grid)
Both HeroSection and AccoladesSection now feature a consistent 3-2 grid layout for award laurels:
- **Top Row**: 3 laurels (Sundance, SXSW, IFFLA)
- **Bottom Row**: 2 laurels (Inside Out, New Directors/New Films)

### AccoladesSection Restructure
- **Critical Praise**: Auto-scrolling carousel featuring quotes from critics
- **Awards Grid**: Static 3-2 grid displaying all 5 award laurels with descriptions
- **Responsive Design**: Mobile-friendly grid that adapts to different screen sizes

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
5. **Responsive Design**: All components adapt to different screen sizes
6. **Consistent Branding**: Award laurels displayed consistently across sections

## Navigation

The navigation component (`Navigation.tsx`) remains unchanged and continues to work with the section IDs:
- `#home` - HeroSection
- `#about` - AboutSection  
- `#accolades` - AccoladesSection
- `#bts` - GallerySection
- `#screenings` - ScreeningsSection
- `#contact` - ContactSection

## Award Laurels

The website now features 5 award laurels displayed in a 3-2 grid pattern:
1. Sundance World Cinema Grand Jury Prize
2. SXSW Winner
3. IFFLA Audience Award - Best Feature
4. Inside Out Audience Award - Best Narrative Feature
5. New Directors/New Films Official Selection
