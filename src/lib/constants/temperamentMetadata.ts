export interface TemperamentMetadata {
  name: string;
  subtitle: string;
  description: string;
  colorScheme: string;
  traits: string[];
  defaultDevelopmentAreas: string[];
  defaultCareers: string[];
  imageSrc: string;
  // For history card display
  icon: string;
  cardColor: string;
}

export const TEMPERAMENT_METADATA: Record<string, TemperamentMetadata> = {
  sunny: {
    name: "Sunny",
    subtitle: "Si Optimis yang Ceria",
    description: "Sunny adalah pribadi yang ceria, optimis, dan mudah bergaul. Mereka memiliki energi yang tinggi dan mampu membawa suasana positif ke lingkungan sekitar.",
    colorScheme: "orange",
    traits: ["Optimistic", "Adaptable", "Creative"],
    defaultDevelopmentAreas: ["Fokus", "Konsistensi", "Detail"],
    defaultCareers: ["Marketing", "Sales", "Entertainment", "Public Relations"],
    imageSrc: "/Sunny.png",
    icon: "☀️",
    cardColor: "bg-amber-100 text-amber-800 border-amber-300",
  },
  rainy: {
    name: "Rainy",
    subtitle: "Si Pemikir yang Detail",
    description: "Rainy adalah pribadi analitis yang menghargai detail dan ketelitian. Mereka cenderung perfeksionis dan memiliki standar tinggi dalam pekerjaan.",
    colorScheme: "blue",
    traits: ["Analytical", "Detail-oriented", "Thoughtful"],
    defaultDevelopmentAreas: ["Overthinking", "Perfeksionis", "Sensitif"],
    defaultCareers: ["Research", "Accounting", "Engineering", "Writing"],
    imageSrc: "/Rainy.png",
    icon: "🌧️",
    cardColor: "bg-blue-100 text-blue-800 border-blue-300",
  },
  stormy: {
    name: "Stormy",
    subtitle: "Si Pemimpin yang Tegas",
    description: "Stormy adalah pribadi yang tegas, ambisius, dan berorientasi hasil. Mereka memiliki kemampuan kepemimpinan alami dan tidak takut mengambil keputusan.",
    colorScheme: "purple",
    traits: ["Decisive", "Ambitious", "Goal-oriented"],
    defaultDevelopmentAreas: ["Kesabaran", "Empati", "Fleksibilitas"],
    defaultCareers: ["Management", "Entrepreneurship", "Law", "Politics"],
    imageSrc: "/Stormy.png",
    icon: "⛈️",
    cardColor: "bg-red-100 text-red-800 border-red-300",
  },
  cloudy: {
    name: "Cloudy",
    subtitle: "Si Pendamai yang Tenang",
    description: "Cloudy adalah pribadi yang tenang, sabar, dan mudah beradaptasi. Mereka adalah pendengar yang baik dan mampu menjadi mediator dalam konflik.",
    colorScheme: "gray",
    traits: ["Calm", "Patient", "Diplomatic"],
    defaultDevelopmentAreas: ["Inisiatif", "Asertivitas", "Motivasi"],
    defaultCareers: ["Counseling", "HR", "Teaching", "Healthcare"],
    imageSrc: "/Cloudy.png",
    icon: "☁️",
    cardColor: "bg-green-100 text-green-800 border-green-300",
  },
};

// for weather type key
export function getTemperamentMetadata(weatherType: string): TemperamentMetadata | undefined {
  return TEMPERAMENT_METADATA[weatherType.toLowerCase()];
}

//for history display (icon, name, color)
export function getTemperamentCardInfo(weatherType: string) {
  const metadata = getTemperamentMetadata(weatherType);
  if (!metadata) return null;
  
  return {
    name: metadata.name,
    icon: metadata.icon,
    color: metadata.cardColor,
    description: metadata.description,
    traits: metadata.traits,
  };
}
