import { TestResult, ExtendedTestResult, TemperamentScore } from '@/types';
import { getWeatherMetadata, TEMPERAMENT_COLORS } from '@/components/result/weatherMetadata';

const STORAGE_KEY = 'testgenz_result';

/**
 * Default weather scores when not provided
 */
const DEFAULT_TEMPERAMENTS: TemperamentScore[] = [
  { name: 'Sunny', percentage: 25, color: TEMPERAMENT_COLORS.Sunny },
  { name: 'Stormy', percentage: 25, color: TEMPERAMENT_COLORS.Stormy },
  { name: 'Rainy', percentage: 25, color: TEMPERAMENT_COLORS.Rainy },
  { name: 'Cloudy', percentage: 25, color: TEMPERAMENT_COLORS.Cloudy },
];

/**
 * Mapping from old psychology names to weather names
 */
const PSYCHOLOGY_TO_WEATHER: { [key: string]: string } = {
  'Sanguinis': 'Sunny',
  'Koleris': 'Stormy',
  'Melankolis': 'Rainy',
  'Plegmatis': 'Cloudy',
};

/**
 * Migrate old psychology temperament names to weather names
 */
function migrateTemperamentNames(temperaments: TemperamentScore[]): TemperamentScore[] {
  return temperaments.map(t => {
    const weatherName = PSYCHOLOGY_TO_WEATHER[t.name] || t.name;
    return {
      ...t,
      name: weatherName,
      color: TEMPERAMENT_COLORS[weatherName] || t.color,
    };
  });
}

/**
 * Validates that a test result has all required base fields
 */
function validateBaseTestResult(data: any): data is TestResult {
  if (!data || typeof data !== 'object') {
    return false;
  }

  // Check required fields
  if (typeof data.weatherType !== 'string' || !data.weatherType) {
    return false;
  }

  if (typeof data.analysis !== 'string' || !data.analysis) {
    return false;
  }

  if (typeof data.timestamp !== 'string' || !data.timestamp) {
    return false;
  }

  // Check userData object
  if (!data.userData || typeof data.userData !== 'object') {
    return false;
  }

  if (typeof data.userData.nama !== 'string' || !data.userData.nama) {
    return false;
  }

  // email is optional, but if present must be string
  if (data.userData.email !== undefined && typeof data.userData.email !== 'string') {
    return false;
  }

  return true;
}

/**
 * Validates that a test result has all required fields including extended fields
 */
function validateTestResult(data: any): data is TestResult {
  return validateBaseTestResult(data);
}

/**
 * Validates that an ExtendedTestResult has all required fields
 */
export function validateExtendedTestResult(data: unknown): data is ExtendedTestResult {
  if (!validateBaseTestResult(data)) {
    return false;
  }

  // Cast to any for extended field checks (base validation already passed)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extData = data as any;

  // Check temperaments array
  if (!Array.isArray(extData.temperaments)) {
    return false;
  }

  // Validate each temperament score
  for (const temp of extData.temperaments) {
    if (!temp || typeof temp !== 'object') {
      return false;
    }
    const tempObj = temp as Record<string, unknown>;
    if (typeof tempObj.name !== 'string' || !tempObj.name) {
      return false;
    }
    if (typeof tempObj.percentage !== 'number' || tempObj.percentage < 0 || tempObj.percentage > 100) {
      return false;
    }
    if (typeof tempObj.color !== 'string' || !tempObj.color) {
      return false;
    }
  }

  // Check developmentAreas array
  if (!Array.isArray(extData.developmentAreas)) {
    return false;
  }

  // Check careerRecommendations array
  if (!Array.isArray(extData.careerRecommendations)) {
    return false;
  }

  return true;
}

/**
 * Apply default values for extended fields based on weather type
 * Provides backward compatibility for old TestResult format
 * Also migrates old psychology names to weather names
 */
function applyExtendedDefaults(result: TestResult): ExtendedTestResult {
  const metadata = getWeatherMetadata(result.weatherType);
  
  // Get existing extended fields or use defaults
  const existingResult = result as Partial<ExtendedTestResult>;
  
  // Use existing temperaments or defaults, and migrate old names to weather names
  let temperaments = existingResult.temperaments;
  if (!Array.isArray(temperaments) || temperaments.length === 0) {
    temperaments = DEFAULT_TEMPERAMENTS;
  } else {
    // Migrate old psychology names (Sanguinis, Koleris, etc.) to weather names (Sunny, Stormy, etc.)
    temperaments = migrateTemperamentNames(temperaments);
  }
  
  // Use existing developmentAreas or defaults from metadata
  let developmentAreas = existingResult.developmentAreas;
  if (!Array.isArray(developmentAreas) || developmentAreas.length === 0) {
    developmentAreas = metadata?.defaultDevelopmentAreas || ['Fokus', 'Konsistensi', 'Detail'];
  }
  
  // Use existing careerRecommendations or defaults from metadata
  let careerRecommendations = existingResult.careerRecommendations;
  if (!Array.isArray(careerRecommendations) || careerRecommendations.length === 0) {
    careerRecommendations = metadata?.defaultCareers || ['Marketing', 'Sales', 'Entertainment', 'Public Relations'];
  }
  
  return {
    ...result,
    temperaments,
    developmentAreas,
    careerRecommendations,
  };
}

/**
 * Save test result to localStorage
 * Supports both TestResult and ExtendedTestResult
 * @param result - The test result to save
 * @throws Error if localStorage is unavailable or data is invalid
 */
export function saveTestResult(result: TestResult | ExtendedTestResult): void {
  try {
    // Validate base data structure before saving
    if (!validateTestResult(result)) {
      throw new Error('Invalid test result structure');
    }

    // Apply extended defaults if not already an ExtendedTestResult
    const extendedResult = applyExtendedDefaults(result);

    const jsonString = JSON.stringify(extendedResult);
    localStorage.setItem(STORAGE_KEY, jsonString);
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid test result structure') {
      throw error;
    }
    // Handle localStorage unavailable or quota exceeded
    console.error('Failed to save test result to localStorage:', error);
    throw new Error('Unable to save test result');
  }
}

/**
 * Get test result from localStorage
 * Returns ExtendedTestResult with default values applied for backward compatibility
 * @returns The extended test result or null if not found or invalid
 */
export function getTestResult(): ExtendedTestResult | null {
  try {
    const jsonString = localStorage.getItem(STORAGE_KEY);
    
    if (!jsonString) {
      return null;
    }

    const data = JSON.parse(jsonString);
    
    // Validate the base data structure
    if (!validateTestResult(data)) {
      console.warn('Invalid test result data in localStorage');
      return null;
    }

    // Apply extended defaults for backward compatibility
    return applyExtendedDefaults(data);
  } catch (error) {
    // Handle JSON parsing errors or localStorage access errors
    console.error('Failed to get test result from localStorage:', error);
    return null;
  }
}

/**
 * Clear test result from localStorage
 */
export function clearTestResult(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear test result from localStorage:', error);
    // Don't throw - clearing is not critical
  }
}

const HISTORY_KEY = 'testgenz_history';

/**
 * Save test result to history
 * Supports both TestResult and ExtendedTestResult
 * @param result - The test result to add to history
 */
export function saveTestResultToHistory(result: TestResult | ExtendedTestResult): void {
  try {
    // Validate data structure before saving
    if (!validateTestResult(result)) {
      throw new Error('Invalid test result structure');
    }

    // Apply extended defaults
    const extendedResult = applyExtendedDefaults(result);

    // Get existing history
    const history = getTestResultHistory();
    
    // Add new result to the beginning of the array
    history.unshift(extendedResult);
    
    // Keep only last 10 results
    const limitedHistory = history.slice(0, 10);
    
    // Save back to localStorage
    const jsonString = JSON.stringify(limitedHistory);
    localStorage.setItem(HISTORY_KEY, jsonString);
  } catch (error) {
    console.error('Failed to save test result to history:', error);
    // Don't throw - history is not critical
  }
}

/**
 * Get all test results from history
 * Returns ExtendedTestResult array with default values applied for backward compatibility
 * @returns Array of extended test results, newest first
 */
export function getTestResultHistory(): ExtendedTestResult[] {
  try {
    const jsonString = localStorage.getItem(HISTORY_KEY);
    
    if (!jsonString) {
      return [];
    }

    const data = JSON.parse(jsonString);
    
    // Validate that it's an array
    if (!Array.isArray(data)) {
      console.warn('Invalid history data in localStorage');
      return [];
    }
    
    // Filter out invalid results and apply extended defaults
    const validResults = data
      .filter(item => validateTestResult(item))
      .map(item => applyExtendedDefaults(item));
    
    return validResults;
  } catch (error) {
    console.error('Failed to get test result history from localStorage:', error);
    return [];
  }
}

/**
 * Clear all test result history
 */
export function clearTestResultHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear test result history from localStorage:', error);
  }
}

/**
 * Delete a specific test result from history by timestamp
 * @param timestamp - The timestamp of the result to delete
 */
export function deleteTestResultFromHistory(timestamp: string): void {
  try {
    const history = getTestResultHistory();
    const filteredHistory = history.filter(result => result.timestamp !== timestamp);
    
    const jsonString = JSON.stringify(filteredHistory);
    localStorage.setItem(HISTORY_KEY, jsonString);
  } catch (error) {
    console.error('Failed to delete test result from history:', error);
  }
}

/**
 * Update user name in all history entries
 * This keeps the history consistent when user changes their name
 * @param newName - The new name to apply to all history entries
 */
export function updateHistoryUserName(newName: string): void {
  try {
    const history = getTestResultHistory();
    
    if (history.length === 0) {
      return;
    }
    
    // Update nama in all history entries
    const updatedHistory: ExtendedTestResult[] = history.map(result => ({
      ...result,
      userData: {
        ...result.userData,
        nama: newName,
      },
    }));
    
    // Save updated history
    const jsonString = JSON.stringify(updatedHistory);
    localStorage.setItem(HISTORY_KEY, jsonString);
    
    // Also update current result if exists
    const currentResult = getTestResult();
    if (currentResult) {
      const updatedResult: ExtendedTestResult = {
        ...currentResult,
        userData: {
          ...currentResult.userData,
          nama: newName,
        },
      };
      saveTestResult(updatedResult);
    }
  } catch (error) {
    console.error('Failed to update history user name:', error);
  }
}
