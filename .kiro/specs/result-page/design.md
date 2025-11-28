# Design Document - Result Page

## Overview

Fitur Result Page adalah halaman terpisah yang menampilkan hasil analisis tes kepribadian berdasarkan weather type. Halaman ini akan menggantikan penggunaan alert yang ada saat ini dengan tampilan yang lebih profesional dan informatif. Data hasil tes akan disimpan di localStorage untuk memungkinkan akses dari halaman manapun dan tetap persisten meskipun user melakukan refresh.

Desain ini menggunakan arsitektur component-based dengan parent-child pattern, di mana setiap weather type memiliki komponen visual yang unik namun dengan layout yang konsisten.

## Architecture

### High-Level Architecture

```
┌─────────────────┐
│   Test Page     │
│   (/test)       │
└────────┬────────┘
         │
         │ 1. Submit answers
         ▼
┌─────────────────┐
│  API /analyze   │
│                 │
└────────┬────────┘
         │
         │ 2. Return result
         ▼
┌─────────────────┐
│  localStorage   │◄──────┐
│  (save result)  │       │
└────────┬────────┘       │
         │                │
         │ 3. Navigate    │ 4. Read on mount
         ▼                │
┌─────────────────┐       │
│  Result Page    │───────┘
│   (/result)     │
└─────────────────┘
```

### Component Hierarchy

```
ResultPage
├── WeatherResultContainer (parent)
│   ├── SunnyResult (conditional)
│   │   ├── BackgroundPlaceholder
│   │   ├── ResultContent
│   │   └── ActionButtons
│   ├── RainyResult (conditional)
│   │   ├── BackgroundPlaceholder
│   │   ├── ResultContent
│   │   └── ActionButtons
│   ├── StormyResult (conditional)
│   │   ├── BackgroundPlaceholder
│   │   ├── ResultContent
│   │   └── ActionButtons
│   └── CloudyResult (conditional)
│       ├── BackgroundPlaceholder
│       ├── ResultContent
│       └── ActionButtons
└── ErrorState (conditional)
```

## Components and Interfaces

### 1. Result Page (`/src/app/result/page.tsx`)

Main page component yang bertanggung jawab untuk:
- Membaca data dari localStorage saat mount
- Menentukan weather component mana yang akan di-render
- Handle error state jika data tidak tersedia

**Props**: None (menggunakan localStorage)

**State**:
```typescript
{
  testResult: TestResult | null;
  isLoading: boolean;
  error: string | null;
}
```

### 2. Weather Result Container (`/src/components/result/WeatherResultContainer.tsx`)

Container component yang menerima test result dan merender weather component yang sesuai.

**Props**:
```typescript
interface WeatherResultContainerProps {
  testResult: TestResult;
}
```

**Responsibilities**:
- Conditional rendering berdasarkan weather type
- Pass data ke child components

### 3. Weather-Specific Components

Setiap weather type memiliki komponen sendiri:
- `SunnyResult.tsx`
- `RainyResult.tsx`
- `StormyResult.tsx`
- `CloudyResult.tsx`

**Props** (sama untuk semua):
```typescript
interface WeatherResultProps {
  weatherType: string;
  analysis: string;
  userData: UserData;
  timestamp: string;
}
```

**Structure** (sama untuk semua):
- Background placeholder (untuk gambar di masa depan)
- Result content (weather type, analysis summary)
- Action buttons (kembali ke home, ulang tes)

### 4. Shared Components

#### ResultContent (`/src/components/result/ResultContent.tsx`)
Menampilkan konten hasil analisis.

**Props**:
```typescript
interface ResultContentProps {
  weatherType: string;
  analysis: string;
  userName: string;
}
```

#### ActionButtons (`/src/components/result/ActionButtons.tsx`)
Tombol navigasi untuk user.

**Props**:
```typescript
interface ActionButtonsProps {
  onBackToHome: () => void;
  onRetakeTest: () => void;
}
```

## Data Models

### TestResult Interface

```typescript
interface TestResult {
  weatherType: string;      // "Sunny" | "Rainy" | "Stormy" | "Cloudy"
  analysis: string;         // AI-generated summary
  userData: UserData;       // User information
  timestamp: string;        // ISO 8601 format
}
```

### UserData Interface (existing)

```typescript
interface UserData {
  nama: string;
  email?: string;
}
```

### LocalStorage Structure

**Key**: `testgenz_result`

**Value** (JSON string):
```json
{
  "weatherType": "Rainy",
  "analysis": "You are the Intense Spring Tempest...",
  "userData": {
    "nama": "John Doe",
    "email": "john@example.com"
  },
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

## Utility Functions

### localStorage Utilities (`/src/lib/localStorage.ts`)

```typescript
// Save test result to localStorage
export function saveTestResult(result: TestResult): void

// Get test result from localStorage
export function getTestResult(): TestResult | null

// Clear test result from localStorage
export function clearTestResult(): void

// Validate test result structure
function validateTestResult(data: any): boolean
```

**Error Handling**:
- Try-catch untuk localStorage access (bisa disabled di browser)
- Validasi struktur data sebelum return
- Return null jika data invalid atau tidak ada

## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: localStorage Save Completeness
*For any* successful API response with test result data, when saved to localStorage, the stored data should contain all required fields (weatherType, analysis, userData, timestamp) and use the consistent key "testgenz_result".
**Validates: Requirements 2.1, 2.2**

### Property 2: Error State Handling
*For any* invalid or missing data in localStorage (malformed JSON, missing fields, null value), the Result Page should display an error state with informative message and navigation options.
**Validates: Requirements 2.4**

### Property 3: Utility Function Error Resilience
*For any* invalid input to localStorage utility functions (invalid JSON, malformed data structure, missing required fields), the functions should handle errors gracefully without throwing exceptions and return appropriate error indicators.
**Validates: Requirements 3.3, 3.4**

### Property 4: Weather Component Rendering
*For any* valid weather type (Sunny, Rainy, Stormy, Cloudy), the Result Page should render the corresponding parent component with consistent layout structure and all required child components.
**Validates: Requirements 5.1, 5.5**

## Error Handling

### localStorage Access Errors

**Scenario**: localStorage is disabled or unavailable
**Handling**:
- Wrap all localStorage operations in try-catch
- Show user-friendly error message
- Provide fallback: display data from memory if available
- Log error to console for debugging

### Data Validation Errors

**Scenario**: Data in localStorage is corrupted or invalid
**Handling**:
- Validate data structure before using
- Check for required fields (weatherType, analysis, userData)
- Show error state with "Retake Test" button
- Clear invalid data from localStorage

### Navigation Errors

**Scenario**: User navigates to /result without completing test
**Handling**:
- Check for data in localStorage on mount
- If no data, show error state
- Provide "Start Test" button to redirect to /test

### API Errors (from Test Page)

**Scenario**: API /analyze fails or returns error
**Handling**:
- Don't navigate to Result Page
- Show error message in Test Page using Chakra UI Toast or Alert
- Allow user to retry submission
- Don't save invalid data to localStorage

## Testing Strategy

### Unit Tests

**Test Coverage**:
1. localStorage utility functions
   - `saveTestResult()` with valid data
   - `getTestResult()` with existing data
   - `getTestResult()` with no data
   - `getTestResult()` with invalid JSON
   - `clearTestResult()` functionality
   - Data validation logic

2. Component rendering
   - Result Page with valid data
   - Result Page with no data (error state)
   - Each weather component (Sunny, Rainy, Stormy, Cloudy)
   - ResultContent component
   - ActionButtons component

3. Navigation logic
   - Button click handlers
   - Router navigation calls

**Testing Tools**:
- Jest for unit tests
- React Testing Library for component tests
- Mock localStorage for testing

### Property-Based Tests

Property-based tests will use **fast-check** library for JavaScript/TypeScript. Each test should run minimum 100 iterations.

**Test Coverage**:

1. **Property 1: localStorage Save Completeness**
   - Generate random test results with all required fields
   - Save each to localStorage
   - Verify all fields are present and correct in stored data
   - **Feature: result-page, Property 1: localStorage Save Completeness**

2. **Property 2: Error State Handling**
   - Generate various invalid data scenarios (null, undefined, malformed JSON, missing fields)
   - Load Result Page with each invalid data
   - Verify error state is always displayed
   - **Feature: result-page, Property 2: Error State Handling**

3. **Property 3: Utility Function Error Resilience**
   - Generate random invalid inputs (invalid JSON strings, objects with missing fields)
   - Call utility functions with each invalid input
   - Verify no exceptions are thrown and appropriate error values are returned
   - **Feature: result-page, Property 3: Utility Function Error Resilience**

4. **Property 4: Weather Component Rendering**
   - Generate test results with each weather type
   - Render Result Page with each
   - Verify correct component is rendered and has consistent structure
   - **Feature: result-page, Property 4: Weather Component Rendering**

### Integration Tests

**Test Scenarios**:
1. Complete flow: Test Page → API → localStorage → Result Page
2. Refresh behavior: Result Page maintains data after refresh
3. Multiple test completions: New results overwrite old ones
4. Cross-component data access: Other pages can read test results

### Manual Testing Checklist

- [ ] Visual appearance of each weather type component
- [ ] Responsive design on mobile, tablet, desktop
- [ ] Background placeholder positioning
- [ ] Text readability and formatting
- [ ] Button interactions and hover states
- [ ] Navigation flow from Test Page to Result Page
- [ ] Error states display correctly
- [ ] localStorage persistence across page refreshes

## Implementation Notes

### File Structure

```
src/
├── app/
│   ├── result/
│   │   └── page.tsx                 # Main Result Page
│   └── test/
│       └── page.tsx                 # Updated Test Page (remove alert)
├── components/
│   └── result/
│       ├── WeatherResultContainer.tsx
│       ├── SunnyResult.tsx
│       ├── RainyResult.tsx
│       ├── StormyResult.tsx
│       ├── CloudyResult.tsx
│       ├── ResultContent.tsx
│       ├── ActionButtons.tsx
│       └── index.ts                 # Barrel export
├── lib/
│   └── localStorage.ts              # Utility functions
└── types/
    └── index.ts                     # Add TestResult interface
```

### Styling Approach

**Weather Type Colors** (Chakra UI color palette):
- **Sunny**: yellow/orange tones (`yellow.400`, `orange.300`)
- **Rainy**: blue/gray tones (`blue.500`, `gray.600`)
- **Stormy**: dark purple/gray tones (`purple.700`, `gray.700`)
- **Cloudy**: light gray/blue tones (`gray.400`, `blue.200`)

**Layout Consistency**:
- All weather components use same Box structure
- Same spacing and padding values
- Same typography hierarchy
- Same button placement and sizing

**Background Placeholder**:
- Use Chakra UI `Box` with background color
- Add text overlay: "Background image coming soon"
- Position: absolute, full width/height
- z-index: -1 (behind content)

### Performance Considerations

1. **localStorage Access**: Minimize reads/writes
   - Read once on mount
   - Write only after successful API response
   - Use state management for in-memory data

2. **Component Rendering**: Lazy load weather components if needed
   - Currently not necessary (small components)
   - Consider if components become heavy with images

3. **Data Size**: Keep localStorage data minimal
   - Only store essential fields
   - Don't store full answer array (already processed)

### Security Considerations

1. **Data Validation**: Always validate data from localStorage
   - User can manipulate localStorage via DevTools
   - Don't trust data blindly

2. **XSS Prevention**: Sanitize analysis text from AI
   - Use React's built-in XSS protection
   - Don't use `dangerouslySetInnerHTML` unless necessary

3. **Sensitive Data**: Don't store sensitive information
   - Email is optional and not critical
   - No passwords or tokens in localStorage

## Future Enhancements

1. **Background Images**:
   - Add image upload/selection for each weather type
   - Implement image optimization
   - Add loading states for images

2. **Share Functionality**:
   - Generate shareable link with result ID
   - Social media sharing buttons
   - Download result as image

3. **Result History**:
   - Store multiple test results
   - Show history page with all past results
   - Compare results over time

4. **Animations**:
   - Add weather-themed animations (rain drops, sun rays, clouds moving)
   - Smooth transitions between states
   - Loading animations

5. **Personalization**:
   - Allow users to customize result page theme
   - Save preferences in localStorage
   - Custom background selection
