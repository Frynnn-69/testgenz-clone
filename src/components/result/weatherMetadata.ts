/**
 * Weather Type Metadata
 * Contains mapping of weather types to their display metadata, default values, and colors
 */

export interface WeatherTypeMetadata {
  name: string;
  subtitle: string;
  description: string;
  colorScheme: string;
  traits: string[];
  defaultDevelopmentAreas: string[];
  defaultCareers: string[];
  imageSrc: string;
}

export const WEATHER_METADATA: Record<string, WeatherTypeMetadata> = {
  sunny: {
    name: "Sunny",
    subtitle: "Si Optimis yang Ceria",
    description: "Sunny adalah pribadi yang ceria, optimis, dan mudah bergaul. Mereka memiliki energi yang tinggi dan mampu membawa suasana positif ke lingkungan sekitar.",
    colorScheme: "orange",
    traits: ["Optimistic", "Adaptable", "Creative"],
    defaultDevelopmentAreas: ["Fokus", "Konsistensi", "Detail"],
    defaultCareers: ["Marketing", "Sales", "Entertainment", "Public Relations"],
    imageSrc: "/weather/sunny.png"
  },
  rainy: {
    name: "Rainy",
    subtitle: "Si Pemikir yang Detail",
    description: "Rainy adalah pribadi analitis yang menghargai detail dan ketelitian. Mereka cenderung perfeksionis dan memiliki standar tinggi dalam pekerjaan.",
    colorScheme: "blue",
    traits: ["Analytical", "Detail-oriented", "Thoughtful"],
    defaultDevelopmentAreas: ["Overthinking", "Perfeksionis", "Sensitif"],
    defaultCareers: ["Research", "Accounting", "Engineering", "Writing"],
    imageSrc: "/weather/rainy.png"
  },
  stormy: {
    name: "Stormy",
    subtitle: "Si Pemimpin yang Tegas",
    description: "Stormy adalah pribadi yang tegas, ambisius, dan berorientasi hasil. Mereka memiliki kemampuan kepemimpinan alami dan tidak takut mengambil keputusan.",
    colorScheme: "purple",
    traits: ["Decisive", "Ambitious", "Goal-oriented"],
    defaultDevelopmentAreas: ["Kesabaran", "Empati", "Fleksibilitas"],
    defaultCareers: ["Management", "Entrepreneurship", "Law", "Politics"],
    imageSrc: "/weather/stormy.png"
  },
  cloudy: {
    name: "Cloudy",
    subtitle: "Si Pendamai yang Tenang",
    description: "Cloudy adalah pribadi yang tenang, sabar, dan mudah beradaptasi. Mereka adalah pendengar yang baik dan mampu menjadi mediator dalam konflik.",
    colorScheme: "gray",
    traits: ["Calm", "Patient", "Diplomatic"],
    defaultDevelopmentAreas: ["Inisiatif", "Asertivitas", "Motivasi"],
    defaultCareers: ["Counseling", "HR", "Teaching", "Healthcare"],
    imageSrc: "/weather/cloudy.png"
  }
};

export const TEMPERAMENT_COLORS: Record<string, string> = {
  Sunny: "orange.400",
  Stormy: "red.500",
  Rainy: "blue.500",
  Cloudy: "green.400"
};

/**
 * Get weather metadata by type (case-insensitive)
 */
export function getWeatherMetadata(weatherType: string): WeatherTypeMetadata | undefined {
  return WEATHER_METADATA[weatherType.toLowerCase()];
}

/**
 * Get weather color by name
 */
export function getWeatherColor(weatherName: string): string {
  return TEMPERAMENT_COLORS[weatherName] || "gray.400";
}
