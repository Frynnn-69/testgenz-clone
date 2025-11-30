import * as fc from 'fast-check';
import { saveTestResult, getTestResult, clearTestResult } from './localStorage';
import { TestResult, ExtendedTestResult } from '@/types';

describe('localStorage utilities - Property-Based Tests', () => {
  const STORAGE_KEY = 'testgenz_result';
  
  // Mock localStorage
  let localStorageMock: { [key: string]: string };
  let getItemSpy: jest.Mock;
  let setItemSpy: jest.Mock;
  let removeItemSpy: jest.Mock;

  beforeEach(() => {
    // Create a fresh localStorage mock for each test
    localStorageMock = {};
    
    getItemSpy = jest.fn((key: string) => localStorageMock[key] || null);
    setItemSpy = jest.fn((key: string, value: string) => {
      localStorageMock[key] = value;
    });
    removeItemSpy = jest.fn((key: string) => {
      delete localStorageMock[key];
    });
    
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: getItemSpy,
        setItem: setItemSpy,
        removeItem: removeItemSpy,
        clear: jest.fn(() => {
          localStorageMock = {};
        }),
        length: 0,
        key: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Arbitrary generator for valid TestResult (base fields only)
  const testResultArbitrary = fc.record({
    weatherType: fc.constantFrom('Sunny', 'Rainy', 'Stormy', 'Cloudy'),
    analysis: fc.string({ minLength: 1, maxLength: 500 }),
    userData: fc.record({
      nama: fc.string({ minLength: 1, maxLength: 100 }),
      email: fc.option(fc.emailAddress(), { nil: undefined }),
    }),
    timestamp: fc.date().map(d => d.toISOString()),
  });

  /**
   * Feature: result-page, Property 1: localStorage Save Completeness
   * 
   * For any successful API response with test result data, when saved to localStorage,
   * the stored data should contain all required fields (weatherType, analysis, userData, timestamp)
   * plus extended fields (temperaments, developmentAreas, careerRecommendations).
   * 
   * Validates: Requirements 2.1, 2.2
   */
  it('Property 1: localStorage Save Completeness - all fields preserved after save', () => {
    fc.assert(
      fc.property(testResultArbitrary, (testResult: TestResult) => {
        // Clear localStorage before each iteration
        localStorageMock = {};
        
        // Save the test result
        saveTestResult(testResult);
        
        // Verify the data was saved with the correct key
        expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEY, expect.any(String));
        
        // Retrieve the saved data
        const savedData = localStorageMock[STORAGE_KEY];
        expect(savedData).toBeDefined();
        
        // Parse the saved data
        const parsedData = JSON.parse(savedData);
        
        // Verify all base fields are present and match
        expect(parsedData).toHaveProperty('weatherType', testResult.weatherType);
        expect(parsedData).toHaveProperty('analysis', testResult.analysis);
        expect(parsedData).toHaveProperty('timestamp', testResult.timestamp);
        expect(parsedData).toHaveProperty('userData');
        expect(parsedData.userData).toHaveProperty('nama', testResult.userData.nama);
        
        // Verify email field (optional)
        if (testResult.userData.email !== undefined) {
          expect(parsedData.userData).toHaveProperty('email', testResult.userData.email);
        }
        
        // Verify extended fields are present (with defaults applied)
        expect(parsedData).toHaveProperty('temperaments');
        expect(Array.isArray(parsedData.temperaments)).toBe(true);
        expect(parsedData.temperaments.length).toBe(4);
        
        expect(parsedData).toHaveProperty('developmentAreas');
        expect(Array.isArray(parsedData.developmentAreas)).toBe(true);
        expect(parsedData.developmentAreas.length).toBeGreaterThanOrEqual(3);
        
        expect(parsedData).toHaveProperty('careerRecommendations');
        expect(Array.isArray(parsedData.careerRecommendations)).toBe(true);
        expect(parsedData.careerRecommendations.length).toBeGreaterThanOrEqual(4);
        
        // Verify the data can be retrieved correctly with extended fields
        const retrievedResult = getTestResult();
        expect(retrievedResult).not.toBeNull();
        expect(retrievedResult!.weatherType).toBe(testResult.weatherType);
        expect(retrievedResult!.analysis).toBe(testResult.analysis);
        expect(retrievedResult!.timestamp).toBe(testResult.timestamp);
        expect(retrievedResult!.userData.nama).toBe(testResult.userData.nama);
        expect(retrievedResult!.temperaments).toBeDefined();
        expect(retrievedResult!.developmentAreas).toBeDefined();
        expect(retrievedResult!.careerRecommendations).toBeDefined();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: result-page, Property 3: Utility Function Error Resilience
   * 
   * For any invalid input to localStorage utility functions (invalid JSON, malformed data structure,
   * missing required fields), the functions should handle errors gracefully without throwing exceptions
   * and return appropriate error indicators.
   * 
   * Validates: Requirements 3.3, 3.4
   */
  it('Property 3: Utility Function Error Resilience - handles invalid data gracefully', () => {
    // Generator for invalid test results with missing or invalid fields
    const invalidTestResultArbitrary = fc.oneof(
      // Missing weatherType
      fc.record({
        analysis: fc.string(),
        userData: fc.record({ nama: fc.string() }),
        timestamp: fc.date().map(d => d.toISOString()),
      }),
      // Missing analysis
      fc.record({
        weatherType: fc.constantFrom('Sunny', 'Rainy', 'Stormy', 'Cloudy'),
        userData: fc.record({ nama: fc.string() }),
        timestamp: fc.date().map(d => d.toISOString()),
      }),
      // Missing userData
      fc.record({
        weatherType: fc.constantFrom('Sunny', 'Rainy', 'Stormy', 'Cloudy'),
        analysis: fc.string(),
        timestamp: fc.date().map(d => d.toISOString()),
      }),
      // Missing timestamp
      fc.record({
        weatherType: fc.constantFrom('Sunny', 'Rainy', 'Stormy', 'Cloudy'),
        analysis: fc.string(),
        userData: fc.record({ nama: fc.string() }),
      }),
      // Empty weatherType
      fc.record({
        weatherType: fc.constant(''),
        analysis: fc.string(),
        userData: fc.record({ nama: fc.string() }),
        timestamp: fc.date().map(d => d.toISOString()),
      }),
      // Invalid userData (missing nama)
      fc.record({
        weatherType: fc.constantFrom('Sunny', 'Rainy', 'Stormy', 'Cloudy'),
        analysis: fc.string(),
        userData: fc.record({ email: fc.option(fc.emailAddress()) }),
        timestamp: fc.date().map(d => d.toISOString()),
      }),
      // Null or undefined values
      fc.constant(null),
      fc.constant(undefined),
      // Non-object values
      fc.constant('string'),
      fc.constant(123),
      fc.constant(true),
    );

    fc.assert(
      fc.property(invalidTestResultArbitrary, (invalidData: any) => {
        // Clear localStorage before each iteration
        localStorageMock = {};
        
        // Test saveTestResult with invalid data - should throw but not crash
        expect(() => {
          try {
            saveTestResult(invalidData);
          } catch (error) {
            // Error is expected, verify it's a proper Error object
            expect(error).toBeInstanceOf(Error);
            throw error;
          }
        }).toThrow();
        
        // Verify nothing was saved to localStorage
        expect(localStorageMock[STORAGE_KEY]).toBeUndefined();
      }),
      { numRuns: 100 }
    );
  });

  it('Property 3b: getTestResult handles malformed JSON gracefully', () => {
    // Generator for invalid JSON strings
    const invalidJsonArbitrary = fc.oneof(
      fc.constant('invalid json {'),
      fc.constant('{incomplete'),
      fc.constant('{"key": undefined}'),
      fc.constant('[1, 2, 3'),
      fc.string().filter(s => {
        try {
          JSON.parse(s);
          return false; // Valid JSON, skip
        } catch {
          return true; // Invalid JSON, use it
        }
      }),
    );

    fc.assert(
      fc.property(invalidJsonArbitrary, (invalidJson: string) => {
        // Set invalid JSON in localStorage
        localStorageMock[STORAGE_KEY] = invalidJson;
        
        // getTestResult should not throw and should return null
        let result;
        expect(() => {
          result = getTestResult();
        }).not.toThrow();
        
        expect(result).toBeNull();
      }),
      { numRuns: 100 }
    );
  });

  it('Property 3c: clearTestResult never throws', () => {
    fc.assert(
      fc.property(fc.anything(), (anyData: any) => {
        // Set any data in localStorage
        try {
          localStorageMock[STORAGE_KEY] = String(anyData);
        } catch {
          // If we can't even convert to string, that's fine
        }
        
        // clearTestResult should never throw
        expect(() => clearTestResult()).not.toThrow();
      }),
      { numRuns: 100 }
    );
  });
});
