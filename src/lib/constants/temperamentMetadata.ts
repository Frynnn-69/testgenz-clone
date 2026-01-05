export interface TemperamentMetadata {
  name: string;
  subtitle: string;
  description: string;
  colorScheme: string;
  traits: string[];
  defaultDevelopmentAreas: string[];
  defaultCareers: string[];
  imageSrc: string;
  
  emoji: string;
  tagline: string;
  strengths: string[];
  bgGradient: string;
  accentColor: string;
  barColor: string;
  borderColor: string;
  cardBg: string;
  iconBg: string; 
  temperament: string; 
  icon: string; 
}

export const TEMPERAMENT_METADATA: Record<string, TemperamentMetadata> = {
  sunny: {
    // Legacy Data
    name: "Sunny",
    subtitle: "Si Optimis yang Ceria",
    description: "Ceria, optimis, dan penuh energi! Kamu adalah jiwa dari setiap pesta. Mudah bergaul dan selalu bisa mencairkan suasana. Orang-orang suka berada di sekitarmu karena energi positifmu yang menular.",
    colorScheme: "orange",
    traits: ["Ekstrovert", "Antusias", "Kreatif", "Spontan", "Ekspresif", "Optimis"],
    defaultDevelopmentAreas: ["Fokus", "Konsistensi", "Detail"],
    defaultCareers: ["Marketing", "Sales", "Entertainment", "Public Relations"],
    imageSrc: "/Sunny.png",
    icon: "☀️",
    
    // New Visual Data (From AboutSection)
    emoji: "☀️",
    temperament: "Sanguinis",
    tagline: "The Life of the Party",
    strengths: ["Public speaking", "Networking", "Brainstorming", "Motivating others"],
    bgGradient: "from-temperament-sunny/20 via-earth-light/30 to-background",
    accentColor: "text-temperament-sunny",
    barColor: "bg-temperament-sunny",
    borderColor: "border-temperament-sunny",
    cardBg: "bg-gradient-to-br from-temperament-sunny/10 to-earth-light/20",
    iconBg: "bg-temperament-sunny/20",
  },
  rainy: {
    name: "Rainy",
    subtitle: "Si Pemikir yang Detail",
    description: "Dalam, analitis, dan detail-oriented. Kamu punya kepekaan tinggi dan selalu memikirkan segala sesuatu secara mendalam. Hasil kerjamu selalu berkualitas tinggi karena perhatianmu pada detail.",
    colorScheme: "blue",
    traits: ["Perfeksionis", "Sensitif", "Terorganisir", "Loyal", "Analitis", "Thoughtful"],
    defaultDevelopmentAreas: ["Overthinking", "Perfeksionis", "Sensitif"],
    defaultCareers: ["Research", "Accounting", "Engineering", "Writing"],
    imageSrc: "/Rainy.png",
    icon: "🌧️",
    
    emoji: "🌧️",
    temperament: "Melankolis",
    tagline: "The Deep Thinker",
    strengths: ["Problem solving", "Quality control", "Research", "Creative arts"],
    bgGradient: "from-temperament-rainy/20 via-earth-light/30 to-background",
    accentColor: "text-temperament-rainy",
    barColor: "bg-temperament-rainy",
    borderColor: "border-temperament-rainy",
    cardBg: "bg-gradient-to-br from-temperament-rainy/10 to-earth-light/20",
    iconBg: "bg-temperament-rainy/20",
  },
  stormy: {
    name: "Stormy",
    subtitle: "Si Pemimpin yang Tegas",
    description: "Tegas, ambisius, dan penuh determinasi. Kamu adalah pemimpin alami yang tidak takut mengambil keputusan besar. Visi dan drive-mu menginspirasi orang lain untuk mengikuti arahanmu.",
    colorScheme: "purple",
    traits: ["Pemimpin", "Tegas", "Goal-oriented", "Mandiri", "Decisive", "Visioner"],
    defaultDevelopmentAreas: ["Kesabaran", "Empati", "Fleksibilitas"],
    defaultCareers: ["Management", "Entrepreneurship", "Law", "Politics"],
    imageSrc: "/Stormy.png",
    icon: "⛈️",
    
    emoji: "⛈️",
    temperament: "Koleris",
    tagline: "The Natural Leader",
    strengths: ["Leadership", "Decision making", "Strategic planning", "Crisis management"],
    bgGradient: "from-stone-300 via-earth-light/30 to-background",
    accentColor: "text-stone-700",
    barColor: "bg-stone-600",
    borderColor: "border-stone-600",
    cardBg: "bg-gradient-to-br from-stone-200 to-earth-light/20",
    iconBg: "bg-stone-200",
  },
  cloudy: {
    name: "Cloudy",
    subtitle: "Si Pendamai yang Tenang",
    description: "Tenang, damai, dan konsisten. Kamu adalah pendengar yang baik dan selalu bisa diandalkan dalam situasi apapun. Kehadiranmu membawa ketenangan bagi orang-orang di sekitarmu.",
    colorScheme: "gray",
    traits: ["Sabar", "Diplomat", "Stabil", "Penengah", "Loyal", "Supportive"],
    defaultDevelopmentAreas: ["Inisiatif", "Asertivitas", "Motivasi"],
    defaultCareers: ["Counseling", "HR", "Teaching", "Healthcare"],
    imageSrc: "/Cloudy.png",
    icon: "☁️",
    
    emoji: "☁️",
    temperament: "Phlegmatis",
    tagline: "The Peacemaker",
    strengths: ["Mediating conflicts", "Deep listening", "Consistent work", "Team harmony"],
    bgGradient: "from-slate-200 via-earth-light/30 to-background",
    accentColor: "text-slate-600",
    barColor: "bg-slate-500",
    borderColor: "border-slate-500",
    cardBg: "bg-gradient-to-br from-slate-100 to-earth-light/20",
    iconBg: "bg-slate-100",
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
    icon: metadata.emoji, // Using emoji as icon
    // Mapping new visual properties for older components:
    color: metadata.iconBg, // Using iconBg for 'color' prop (often used for background circles)
    textColor: metadata.accentColor, // New explicit text color property
    cardBg: metadata.cardBg, // New explicit card background gradient
    borderColor: metadata.borderColor, // Explicit border color
    description: metadata.description,
    traits: metadata.traits,
  };
}
