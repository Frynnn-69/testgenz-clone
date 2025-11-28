import { saveTestResult, getTestResult, clearTestResult } from './localStorage';
import { TestResult } from '@/types';

describe('localStorage utilities', () => {
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

  describe('saveTestResult', () => {
    it('should save valid test result to localStorage', () => {
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

      expect(setItemSpy).toHaveBeenCalledWith(
        STORAGE_KEY,
        JSON.stringify(testResult)
      );
      expect(localStorageMock[STORAGE_KEY]).toBe(JSON.stringify(testResult));
    });

    it('should save test result without email', () => {
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
      expect(localStorageMock[STORAGE_KEY]).toBe(JSON.stringify(testResult));
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
    it('should retrieve existing test result from localStorage', () => {
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
      expect(result).toEqual(testResult);
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
