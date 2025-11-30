import { saveTestResult, getTestResult, clearTestResult } from './localStorage';
import { TestResult, ExtendedTestResult } from '@/types';
import { TEMPERAMENT_COLORS } from '@/components/result/weatherMetadata';

describe('localStorage utilities', () => {
  const STORAGE_KEY = 'testgenz_result';
  
  // Default temperaments that are applied when saving
  const DEFAULT_TEMPERAMENTS = [
    { name: 'Sanguinis', percentage: 25, color: TEMPERAMENT_COLORS.Sanguinis },
    { name: 'Koleris', percentage: 25, color: TEMPERAMENT_COLORS.Koleris },
    { name: 'Melankolis', percentage: 25, color: TEMPERAMENT_COLORS.Melankolis },
    { name: 'Plegmatis', percentage: 25, color: TEMPERAMENT_COLORS.Plegmatis },
  ];
  
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

  describe('saveTestResult', () => {
    it('should save valid test result with extended defaults to localStorage', () => {
      const testResult: TestResult = {
        weatherType: 'Sunny',
        analysis: 'You are a bright and optimistic person',
        userData: {
          nama: 'John Doe',
          email: 'john@example.com',
        },
        timestamp: '2025-01-15T10:30:00.000Z',
      };

      saveTestResult(testResult);

      expect(setItemSpy).toHaveBeenCalled();
      
      // Verify the saved data includes extended defaults
      const savedData = JSON.parse(localStorageMock[STORAGE_KEY]);
      expect(savedData.weatherType).toBe(testResult.weatherType);
      expect(savedData.analysis).toBe(testResult.analysis);
      expect(savedData.userData).toEqual(testResult.userData);
      expect(savedData.temperaments).toEqual(DEFAULT_TEMPERAMENTS);
      expect(savedData.developmentAreas).toEqual(['Fokus', 'Konsistensi', 'Detail']); // Sunny defaults
      expect(savedData.careerRecommendations).toEqual(['Marketing', 'Sales', 'Entertainment', 'Public Relations']); // Sunny defaults
    });

    it('should save test result without email and apply weather-specific defaults', () => {
      const testResult: TestResult = {
        weatherType: 'Rainy',
        analysis: 'You are introspective',
        userData: {
          nama: 'Jane Doe',
        },
        timestamp: '2025-01-15T10:30:00.000Z',
      };

      saveTestResult(testResult);

      expect(setItemSpy).toHaveBeenCalled();
      
      // Verify the saved data includes Rainy-specific defaults
      const savedData = JSON.parse(localStorageMock[STORAGE_KEY]);
      expect(savedData.weatherType).toBe('Rainy');
      expect(savedData.developmentAreas).toEqual(['Overthinking', 'Perfeksionis', 'Sensitif']); // Rainy defaults
      expect(savedData.careerRecommendations).toEqual(['Research', 'Accounting', 'Engineering', 'Writing']); // Rainy defaults
    });

    it('should preserve existing extended fields when provided', () => {
      const extendedResult: ExtendedTestResult = {
        weatherType: 'Sunny',
        analysis: 'You are bright',
        userData: { nama: 'Test User' },
        timestamp: '2025-01-15T10:30:00.000Z',
        temperaments: [
          { name: 'Sanguinis', percentage: 60, color: 'orange.400' },
          { name: 'Koleris', percentage: 20, color: 'red.500' },
          { name: 'Melankolis', percentage: 10, color: 'blue.500' },
          { name: 'Plegmatis', percentage: 10, color: 'green.400' },
        ],
        developmentAreas: ['Custom Area 1', 'Custom Area 2', 'Custom Area 3'],
        careerRecommendations: ['Custom Career 1', 'Custom Career 2', 'Custom Career 3', 'Custom Career 4'],
      };

      saveTestResult(extendedResult);

      const savedData = JSON.parse(localStorageMock[STORAGE_KEY]);
      expect(savedData.temperaments).toEqual(extendedResult.temperaments);
      expect(savedData.developmentAreas).toEqual(extendedResult.developmentAreas);
      expect(savedData.careerRecommendations).toEqual(extendedResult.careerRecommendations);
    });

    it('should throw error for invalid test result structure', () => {
      const invalidResult = {
        weatherType: 'Sunny',
        // missing analysis
        userData: { nama: 'John' },
        timestamp: '2025-01-15T10:30:00.000Z',
      } as any;

      expect(() => saveTestResult(invalidResult)).toThrow('Invalid test result structure');
    });
  });

  describe('getTestResult', () => {
    it('should retrieve existing test result with extended defaults from localStorage', () => {
      const testResult: TestResult = {
        weatherType: 'Cloudy',
        analysis: 'You are calm and balanced',
        userData: {
          nama: 'Alice',
          email: 'alice@example.com',
        },
        timestamp: '2025-01-15T10:30:00.000Z',
      };

      localStorageMock[STORAGE_KEY] = JSON.stringify(testResult);

      const result = getTestResult();

      expect(getItemSpy).toHaveBeenCalledWith(STORAGE_KEY);
      expect(result).not.toBeNull();
      expect(result!.weatherType).toBe(testResult.weatherType);
      expect(result!.analysis).toBe(testResult.analysis);
      expect(result!.userData).toEqual(testResult.userData);
      // Should have extended defaults applied
      expect(result!.temperaments).toEqual(DEFAULT_TEMPERAMENTS);
      expect(result!.developmentAreas).toEqual(['Inisiatif', 'Asertivitas', 'Motivasi']); // Cloudy defaults
      expect(result!.careerRecommendations).toEqual(['Counseling', 'HR', 'Teaching', 'Healthcare']); // Cloudy defaults
    });

    it('should return null when no data exists', () => {
      const result = getTestResult();

      expect(getItemSpy).toHaveBeenCalledWith(STORAGE_KEY);
      expect(result).toBeNull();
    });

    it('should return null for invalid JSON', () => {
      localStorageMock[STORAGE_KEY] = 'invalid json {';

      const result = getTestResult();

      expect(result).toBeNull();
    });

    it('should return null for invalid data structure', () => {
      const invalidData = {
        weatherType: 'Sunny',
        // missing required fields
      };

      localStorageMock[STORAGE_KEY] = JSON.stringify(invalidData);

      const result = getTestResult();

      expect(result).toBeNull();
    });
  });

  describe('clearTestResult', () => {
    it('should remove test result from localStorage', () => {
      const testResult: TestResult = {
        weatherType: 'Stormy',
        analysis: 'You are intense',
        userData: {
          nama: 'Bob',
        },
        timestamp: '2025-01-15T10:30:00.000Z',
      };

      localStorageMock[STORAGE_KEY] = JSON.stringify(testResult);

      clearTestResult();

      expect(removeItemSpy).toHaveBeenCalledWith(STORAGE_KEY);
      expect(localStorageMock[STORAGE_KEY]).toBeUndefined();
    });

    it('should not throw error when clearing non-existent data', () => {
      expect(() => clearTestResult()).not.toThrow();
      expect(removeItemSpy).toHaveBeenCalledWith(STORAGE_KEY);
    });
  });
});
