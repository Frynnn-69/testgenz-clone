# Design Document - Result Page Redesign

## Overview

Redesign total halaman hasil tes kepribadian (`/result`) dengan tampilan modern menggunakan layout dua kolom. Kolom kiri menampilkan hasil utama (weather type, result card, deskripsi), sedangkan kolom kanan menampilkan detail breakdown (komposisi temperamen, area pengembangan, karir yang cocok). Desain menggunakan warna cream/beige sebagai background dengan aksen oranye/coklat.

## Architecture

### High-Level Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                    Result Page (cream background)                │
├─────────────────────────────┬───────────────────────────────────┤
│      LEFT COLUMN            │         RIGHT COLUMN              │
│  ┌───────────────────────┐  │  ┌─────────────────────────────┐  │
│  │ "Kamu adalah"         │  │  │ Komposisi Temperamen Kamu   │  │
│  │ SUNNY (orange text)   │  │  │ ┌─────────────────────────┐ │  │
│  │ "Si Pemikir yg Detail"│  │  │ │ Sanguinis    ████████ 80%│ │  │
│  │                       │  │  │ │ Koleris      ██       20%│ │  │
│  │ ┌─────────────────┐   │  │  │ │ Melankolis            0% │ │  │
│  │ │  Result Card    │   │  │  │ │ Plegmatis             0% │ │  │
│  │ │  (you got...)   │   │  │  │ └─────────────────────────┘ │  │
│  │ │  SUNNY          │   │  │  └─────────────────────────────┘  │
│  │ │  [traits]       │   │  │                                   │
│  │ └─────────────────┘   │  │  ┌─────────────────────────────┐  │
│  │                       │  │  │ 🌱 Area Pengembangan        │  │
│  │ "Melankolis adalah..."│  │  │ • Overthinking              │  │
│  │                       │  │  │ • Perfeksionis              │  │
│  │ [Bagikan] [Unduh PDF] │  │  │ • Sensitif                  │  │
│  └───────────────────────┘  │  └─────────────────────────────┘  │
│                             │                                   │
│                             │  ┌─────────────────────────────┐  │
│                             │  │ 💼 Karir yang Cocok         │  │
│                             │  │ [Research] [Accounting]     │  │
│                             │  │ [Engineering] [Writing]     │  │
│                             │  └─────────────────────────────┘  │
├─────────────────────────────┴───────────────────────────────────┤
│              [🏠 Kembali ke Beranda]  [🔄 Ulangi Tes]           │
└─────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
ResultPage
├── ResultPageLayout (2-column grid)
│   ├── LeftColumn
│   │   ├── ResultHeader ("Kamu adalah", weather type, subtitle)
│   │   ├── ResultCard (visual card with traits)
│   │   ├── ResultDescription (short description)
│   │   └── ShareButtons (Bagikan Hasil, Unduh PDF)
│   └── RightColumn
│       ├── TemperamentSection
│       │   └── TemperamentBar (x4)
│       ├── DevelopmentSection
│       │   └── DevelopmentItem (x3+)
│       └── CareerSection
│           └── CareerTag (x4+)
└── FooterNavigation
    ├── BackToHomeButton
    └── RetakeTestButton
```

## Components and Interfaces

### 1. ResultPageLayout (`/src/components/result/ResultPageLayout.tsx`)

Container utama dengan layout 2 kolom responsif.

```typescript
interface ResultPageLayoutProps {
  testResult: ExtendedTestResult;
}
```

### 2. ResultHeader (`/src/components/result/ResultHeader.tsx`)

Menampilkan header "Kamu adalah", nama weather type, dan subtitle.

```typescript
interface ResultHeaderProps {
  weatherType: string;
  subtitle: string;
  colorScheme: string; // "orange" | "blue" | "purple" | "gray"
}
```

### 3. ResultCard (`/src/components/result/ResultCard.tsx`)

Card visual dengan gambar hasil dan traits.

```typescript
interface ResultCardProps {
  weatherType: string;
  traits: string[];
  imageSrc?: string;
}
```

### 4. TemperamentSection (`/src/components/result/TemperamentSection.tsx`)

Section untuk komposisi temperamen dengan progress bars.

```typescript
interface TemperamentSectionProps {
  temperaments: TemperamentScore[];
}

interface TemperamentScore {
  name: string;      // "Sanguinis" | "Koleris" | "Melankolis" | "Plegmatis"
  percentage: number; // 0-100
  color: string;     // Chakra color token
}
```

### 5. TemperamentBar (`/src/components/result/TemperamentBar.tsx`)

Single progress bar untuk satu temperamen.

```typescript
interface TemperamentBarProps {
  name: string;
  percentage: number;
  color: string;
}
```

### 6. DevelopmentSection (`/src/components/result/DevelopmentSection.tsx`)

Section untuk area pengembangan.

```typescript
interface DevelopmentSectionProps {
  areas: string[];
}
```

### 7. CareerSection (`/src/components/result/CareerSection.tsx`)

Section untuk rekomendasi karir.

```typescript
interface CareerSectionProps {
  careers: string[];
}
```

### 8. FooterNavigation (`/src/components/result/FooterNavigation.tsx`)

Footer dengan tombol navigasi.

```typescript
interface FooterNavigationProps {
  onBackToHome: () => void;
  onRetakeTest: () => void;
}
```

### 9. ShareButtons (`/src/components/result/ShareButtons.tsx`)

Tombol untuk share dan download.

```typescript
interface ShareButtonsProps {
  onShare: () => void;
  onDownloadPDF: () => void;
}
```

## Data Models

### Extended TestResult Interface

```typescript
interface ExtendedTestResult {
  weatherType: string;           // "Sunny" | "Rainy" | "Stormy" | "Cloudy"
  analysis: string;              // AI-generated summary
  userData: UserData;            // User information
  timestamp: string;             // ISO 8601 format
  temperaments: TemperamentScore[]; // NEW: temperament breakdown
  developmentAreas: string[];    // NEW: areas to improve
  careerRecommendations: string[]; // NEW: suitable careers
}

interface TemperamentScore {
  name: string;      // "Sanguinis" | "Koleris" | "Melankolis" | "Plegmatis"
  percentage: number; // 0-100
  color: string;     // Chakra color token
}
```

### Weather Type Metadata

```typescript
interface WeatherTypeMetadata {
  name: string;
  subtitle: string;
  description: string;
  colorScheme: string;
  traits: string[];
  defaultDevelopmentAreas: string[];
  defaultCareers: string[];
}

const WEATHER_METADATA: Record<string, WeatherTypeMetadata> = {
  sunny: {
    name: "Sunny",
    subtitle: "Si Optimis yang Ceria",
    description: "Sanguinis adalah pribadi yang ceria, optimis, dan mudah bergaul...",
    colorScheme: "orange",
    traits: ["Optimistic", "Adaptable", "Creative"],
    defaultDevelopmentAreas: ["Fokus", "Konsistensi", "Detail"],
    defaultCareers: ["Marketing", "Sales", "Entertainment", "Public Relations"]
  },
  rainy: {
    name: "Rainy",
    subtitle: "Si Pemikir yang Detail",
    description: "Melankolis adalah pribadi analitis yang menghargai detail...",
    colorScheme: "blue",
    traits: ["Analytical", "Detail-oriented", "Thoughtful"],
    defaultDevelopmentAreas: ["Overthinking", "Perfeksionis", "Sensitif"],
    defaultCareers: ["Research", "Accounting", "Engineering", "Writing"]
  },
  stormy: {
    name: "Stormy",
    subtitle: "Si Pemimpin yang Tegas",
    description: "Koleris adalah pribadi yang tegas, ambisius, dan berorientasi hasil...",
    colorScheme: "purple",
    traits: ["Decisive", "Ambitious", "Goal-oriented"],
    defaultDevelopmentAreas: ["Kesabaran", "Empati", "Fleksibilitas"],
    defaultCareers: ["Management", "Entrepreneurship", "Law", "Politics"]
  },
  cloudy: {
    name: "Cloudy",
    subtitle: "Si Pendamai yang Tenang",
    description: "Plegmatis adalah pribadi yang tenang, sabar, dan mudah beradaptasi...",
    colorScheme: "gray",
    traits: ["Calm", "Patient", "Diplomatic"],
    defaultDevelopmentAreas: ["Inisiatif", "Asertivitas", "Motivasi"],
    defaultCareers: ["Counseling", "HR", "Teaching", "Healthcare"]
  }
};
```

### Temperament Colors

```typescript
const TEMPERAMENT_COLORS: Record<string, string> = {
  Sanguinis: "orange.400",
  Koleris: "red.500",
  Melankolis: "blue.500",
  Plegmatis: "green.400"
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Weather Type to Subtitle Mapping
*For any* valid weather type (Sunny, Rainy, Stormy, Cloudy), the Result Page should display the corresponding subtitle from the metadata mapping.
**Validates: Requirements 1.2**

### Property 2: Temperament Progress Bars Rendering
*For any* test result with temperament scores, the Result Page should render exactly 4 progress bars with correct labels (Sanguinis, Koleris, Melankolis, Plegmatis) and percentages matching the input data.
**Validates: Requirements 2.2, 2.3**

### Property 3: Development Areas Minimum Count
*For any* test result, the Result Page should display at least 3 development areas, using defaults from weather metadata if not provided in the data.
**Validates: Requirements 3.3**

### Property 4: Career Recommendations Minimum Count
*For any* test result, the Result Page should display at least 4 career recommendations, using defaults from weather metadata if not provided in the data.
**Validates: Requirements 4.3**

### Property 5: Navigation Button Functionality
*For any* user interaction with navigation buttons, clicking "Kembali ke Beranda" should navigate to "/" and clicking "Ulangi Tes" should navigate to "/test".
**Validates: Requirements 5.4, 5.5**

### Property 6: LocalStorage Round Trip
*For any* valid ExtendedTestResult, saving to localStorage and then reading should return an equivalent object with all fields preserved.
**Validates: Requirements 7.2**

### Property 7: Data Validation Completeness
*For any* data read from localStorage, the validation function should verify the presence of all required fields (weatherType, analysis, userData, temperaments, developmentAreas, careerRecommendations).
**Validates: Requirements 7.3**

## Error Handling

### Missing Data Fields
- Jika `temperaments` tidak ada, gunakan default `[{name: "Sanguinis", percentage: 25}, ...]`
- Jika `developmentAreas` tidak ada, gunakan default dari weather metadata
- Jika `careerRecommendations` tidak ada, gunakan default dari weather metadata

### Invalid Weather Type
- Tampilkan error state dengan opsi retake test
- Log error untuk debugging

### LocalStorage Errors
- Wrap semua operasi dalam try-catch
- Return null jika data tidak valid
- Tampilkan error state dengan navigasi ke test page

## Testing Strategy

### Unit Tests

1. **Component Rendering Tests**
   - ResultHeader renders dengan weather type dan subtitle yang benar
   - TemperamentBar renders dengan label dan persentase yang benar
   - DevelopmentSection renders dengan bullet points
   - CareerSection renders dengan tags
   - FooterNavigation renders dengan 2 tombol

2. **Data Transformation Tests**
   - Weather metadata lookup
   - Default values fallback
   - Temperament color mapping

### Property-Based Tests

Library: **fast-check** (minimum 100 iterations per test)

1. **Property 1: Weather Type to Subtitle Mapping**
   - Generate random weather types
   - Verify subtitle matches metadata
   - **Feature: result-page, Property 1: Weather Type to Subtitle Mapping**

2. **Property 2: Temperament Progress Bars Rendering**
   - Generate random temperament scores (0-100)
   - Verify 4 bars rendered with correct values
   - **Feature: result-page, Property 2: Temperament Progress Bars Rendering**

3. **Property 3: Development Areas Minimum Count**
   - Generate test results with varying development areas (0-10)
   - Verify at least 3 are displayed
   - **Feature: result-page, Property 3: Development Areas Minimum Count**

4. **Property 4: Career Recommendations Minimum Count**
   - Generate test results with varying careers (0-10)
   - Verify at least 4 are displayed
   - **Feature: result-page, Property 4: Career Recommendations Minimum Count**

5. **Property 5: Navigation Button Functionality**
   - Simulate button clicks
   - Verify navigation calls
   - **Feature: result-page, Property 5: Navigation Button Functionality**

6. **Property 6: LocalStorage Round Trip**
   - Generate random ExtendedTestResult objects
   - Save and load from localStorage
   - Verify equality
   - **Feature: result-page, Property 6: LocalStorage Round Trip**

7. **Property 7: Data Validation Completeness**
   - Generate objects with missing fields
   - Verify validation catches all missing required fields
   - **Feature: result-page, Property 7: Data Validation Completeness**

## Implementation Notes

### File Structure

```
src/
├── components/
│   └── result/
│       ├── index.ts
│       ├── ResultPageLayout.tsx      # NEW
│       ├── ResultHeader.tsx          # NEW
│       ├── ResultCard.tsx            # NEW
│       ├── TemperamentSection.tsx    # NEW
│       ├── TemperamentBar.tsx        # NEW
│       ├── DevelopmentSection.tsx    # NEW
│       ├── CareerSection.tsx         # NEW
│       ├── FooterNavigation.tsx      # NEW
│       ├── ShareButtons.tsx          # NEW
│       └── weatherMetadata.ts        # NEW
├── lib/
│   └── localStorage.ts               # UPDATE: add ExtendedTestResult support
└── types/
    └── index.ts                      # UPDATE: add new interfaces
```

### Styling

**Color Palette:**
- Background: `#FDF8F3` (cream/beige)
- Card background: `white`
- Primary accent: `orange.500` / `#ED8936`
- Secondary accent: `brown.600` / `#744210`
- Text: `gray.700`

**Responsive Breakpoints:**
- Desktop (>= 768px): 2 columns
- Mobile (< 768px): 1 column, stacked

**Card Styling:**
- Border radius: `xl` (16px)
- Shadow: `lg`
- Padding: `6` (24px)
