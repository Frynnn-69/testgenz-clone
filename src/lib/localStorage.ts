import { TestResult, ExtendedTestResult } from "@/types";
import { validateTestResult } from "@/lib/validation";
import { applyExtendedDefaults } from "@/lib/utils/resultHelpers";

const STORAGE_KEY = "testgenz_result";
const HISTORY_KEY = "testgenz_history";
const MAX_HISTORY_SIZE = 3;

// Save current test result
export function saveTestResult(result: TestResult | ExtendedTestResult): void {
  try {
    if (!validateTestResult(result)) {
      throw new Error("Invalid test result structure");
    }

    const extendedResult = applyExtendedDefaults(result);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(extendedResult));
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid test result structure") {
      throw error;
    }
    console.error("Failed to save test result to localStorage:", error);
    throw new Error("Unable to save test result");
  }
}

// Get current test result
export function getTestResult(): ExtendedTestResult | null {
  try {
    const jsonString = localStorage.getItem(STORAGE_KEY);
    if (!jsonString) return null;

    const data = JSON.parse(jsonString);
    if (!validateTestResult(data)) {
      console.warn("Invalid test result data in localStorage - clearing corrupted data");
      return null;
    }

    return applyExtendedDefaults(data);
  } catch (error) {
    console.error("Failed to get test result from localStorage:", error);
    return null;
  }
}

// Clear current result (for retaking test)
export function clearTestResult(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear test result from localStorage:", error);
  }
}

// Add result to history (keeps latest 3 - FIFO)
export function saveTestResultToHistory(result: TestResult | ExtendedTestResult): void {
  try {
    if (!validateTestResult(result)) {
      throw new Error("Invalid test result structure");
    }

    const extendedResult = applyExtendedDefaults(result);
    const history = getTestResultHistory();
    
    history.unshift(extendedResult);
    const limitedHistory = history.slice(0, MAX_HISTORY_SIZE);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
  } catch (error) {
    console.error("Failed to save test result to history:", error);
  }
}

// Get all history entries
export function getTestResultHistory(): ExtendedTestResult[] {
  try {
    const jsonString = localStorage.getItem(HISTORY_KEY);
    if (!jsonString) return [];

    const data = JSON.parse(jsonString);
    if (!Array.isArray(data)) {
      console.warn("Invalid history data in localStorage");
      return [];
    }

    return data
      .filter((item) => validateTestResult(item))
      .map((item) => applyExtendedDefaults(item));
  } catch (error) {
    console.error("Failed to get test result history from localStorage:", error);
    return [];
  }
}

export function clearTestResultHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Failed to clear test result history from localStorage:", error);
  }
}

export function deleteTestResultFromHistory(timestamp: string): void {
  try {
    const history = getTestResultHistory();
    const filteredHistory = history.filter((result) => result.timestamp !== timestamp);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filteredHistory));
  } catch (error) {
    console.error("Failed to delete test result from history:", error);
  }
}
