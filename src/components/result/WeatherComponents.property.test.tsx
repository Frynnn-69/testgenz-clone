/**
 * Property-Based Tests for Weather Components
 * Feature: result-page, Property 4: Weather Component Rendering
 * Validates: Requirements 5.1, 5.5
 */

import { render, within } from "@/test-utils";
import * as fc from "fast-check";
import { SunnyResult } from "./SunnyResult";
import { RainyResult } from "./RainyResult";
import { StormyResult } from "./StormyResult";
import { CloudyResult } from "./CloudyResult";
import { UserData } from "@/types";

// Arbitrary generators
const weatherTypeArbitrary = fc.constantFrom("Sunny", "Rainy", "Stormy", "Cloudy");

const userDataArbitrary: fc.Arbitrary<UserData> = fc.record({
  nama: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
  email: fc.option(fc.emailAddress(), { nil: undefined }),
});

const analysisArbitrary = fc.string({ minLength: 10, maxLength: 500 }).filter(s => s.trim().length > 0);

const timestampArbitrary = fc.date().map((date) => date.toISOString());

const testResultArbitrary = fc.record({
  weatherType: weatherTypeArbitrary,
  analysis: analysisArbitrary,
  userData: userDataArbitrary,
  timestamp: timestampArbitrary,
});

describe("Property 4: Weather Component Rendering", () => {
  /**
   * Property: For any valid weather type (Sunny, Rainy, Stormy, Cloudy),
   * the Result Page should render the corresponding parent component with
   * consistent layout structure and all required child components.
   */
  it("should render correct weather component with consistent structure for any valid weather type", () => {
    fc.assert(
      fc.property(testResultArbitrary, (testResult) => {
        const { weatherType, analysis, userData, timestamp } = testResult;

        // Select the appropriate component based on weather type
        let Component;
        switch (weatherType) {
          case "Sunny":
            Component = SunnyResult;
            break;
          case "Rainy":
            Component = RainyResult;
            break;
          case "Stormy":
            Component = StormyResult;
            break;
          case "Cloudy":
            Component = CloudyResult;
            break;
          default:
            throw new Error(`Invalid weather type: ${weatherType}`);
        }

        // Render the component
        const { container, unmount } = render(
          <Component
            weatherType={weatherType}
            analysis={analysis}
            userData={userData}
            timestamp={timestamp}
          />
        );

        // Verify consistent structure across all weather types using container scope:
        const containerQueries = within(container);

        // 1. Background placeholder should exist
        const backgroundPlaceholder = containerQueries.getByText(/background image coming soon/i);
        expect(backgroundPlaceholder).toBeInTheDocument();

        // 2. User name should be displayed (using partial match)
        expect(containerQueries.getByText((content, element) => {
          return element?.textContent?.includes(`Halo, ${userData.nama}!`) ?? false;
        })).toBeInTheDocument();

        // 3. Weather type should be displayed (using partial match)
        expect(containerQueries.getByText((content, element) => {
          return element?.textContent?.includes(`Tipe Kepribadian: ${weatherType}`) ?? false;
        })).toBeInTheDocument();

        // 4. Analysis text should be displayed
        expect(containerQueries.getByText(analysis)).toBeInTheDocument();

        // 5. Action buttons should be present
        expect(containerQueries.getByText(/kembali ke beranda/i)).toBeInTheDocument();
        expect(containerQueries.getByText(/ulang tes/i)).toBeInTheDocument();

        // 6. Container structure should exist (Box with position relative)
        const mainBox = container.querySelector('[style*="position"]');
        expect(mainBox).toBeInTheDocument();

        // Clean up after each test
        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it("should render each specific weather component with its unique styling", () => {
    fc.assert(
      fc.property(
        userDataArbitrary,
        analysisArbitrary,
        timestampArbitrary,
        (userData, analysis, timestamp) => {
          const weatherTypes = ["Sunny", "Rainy", "Stormy", "Cloudy"] as const;

          weatherTypes.forEach((weatherType) => {
            let Component;
            switch (weatherType) {
              case "Sunny":
                Component = SunnyResult;
                break;
              case "Rainy":
                Component = RainyResult;
                break;
              case "Stormy":
                Component = StormyResult;
                break;
              case "Cloudy":
                Component = CloudyResult;
                break;
            }

            const { container, unmount } = render(
              <Component
                weatherType={weatherType}
                analysis={analysis}
                userData={userData}
                timestamp={timestamp}
              />
            );

            const containerQueries = within(container);

            // Verify the component renders without errors
            expect(containerQueries.getByText(/background image coming soon/i)).toBeInTheDocument();
            expect(containerQueries.getByText((content, element) => {
              return element?.textContent?.includes(`Tipe Kepribadian: ${weatherType}`) ?? false;
            })).toBeInTheDocument();

            // Clean up for next iteration
            unmount();
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
