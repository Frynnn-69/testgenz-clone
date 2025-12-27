import type { Answer } from "@/types/index";

// Skor 2 = Temperamen Primer
// Skor 1 = Temperamen Sekunder yang terkait
const answerMappings: {
  [questionId: number]: {
    [optionId: string]: { [weatherType: string]: number };
  };
} = {
  // Q1: Pesta
  1: {
    A: { Sunny: 2, Stormy: 1 }, // Pusat perhatian = Sunny, tapi butuh energi = Stormy
    B: { Stormy: 2, Cloudy: 1 }, // Ambil alih/fokus = Stormy, bikin nyaman = Cloudy
    C: { Rainy: 2, Cloudy: 1 }, // Mendalam = Rainy, mengamati = Cloudy
    D: { Cloudy: 2, Sunny: 1 }, // Santai = Cloudy, mudah adaptasi = Sunny
  },
  // Q2: Masalah
  2: {
    A: { Stormy: 2 }, // Murni Koleris
    B: { Rainy: 2, Cloudy: 1 }, // Analisis = Rainy, tapi "hati-hati" = Cloudy
    C: { Cloudy: 2, Rainy: 1 }, // Tenang = Cloudy, "tidak panik" (terkontrol) = Rainy
    D: { Sunny: 2 }, // Murni Sanguinis
  },
  // Q3: Low-batt
  3: {
    A: { Sunny: 2 }, // Ekstrovert (Sanguinis)
    B: { Stormy: 2 }, // Benci aturan ribet (Koleris)
    C: { Rainy: 2, Cloudy: 1 }, // Benci kacau (Rainy), benci kritik (Cloudy)
    D: { Cloudy: 2 }, // Benci konflik (Plegmatis)
  },
  // Q4: Gaya kerja
  4: {
    A: { Rainy: 2 },
    B: { Stormy: 2 },
    C: { Sunny: 2 },
    D: { Cloudy: 2 },
  },
  // Q5: Akhir pekan
  5: {
    A: { Rainy: 2 },
    B: { Sunny: 2 },
    C: { Cloudy: 2, Rainy: 1 }, // Santai = Cloudy, tapi "me time" = Rainy
    D: { Stormy: 2, Rainy: 1 }, // Produktif = Stormy, "proyek" (terstruktur) = Rainy
  },
  // Q6: Keputusan
  6: {
    A: { Rainy: 2 },
    B: { Sunny: 2 },
    C: { Stormy: 2 },
    D: { Cloudy: 2, Sunny: 1 }, // Konsensus = Cloudy, "aman buat semua" (disukai) = Sunny
  },
  // Q7: Gaya ngomong
  7: {
    A: { Sunny: 2 },
    B: { Rainy: 2 },
    C: { Cloudy: 2 },
    D: { Stormy: 2 },
  },
  // Q8: Konflik
  8: {
    A: { Cloudy: 2 },
    B: { Stormy: 2 },
    C: { Sunny: 2, Cloudy: 1 }, // Humor = Sunny, "penengah" = Cloudy
    D: { Rainy: 2 },
  },
  // Q9: Stres
  9: {
    A: { Sunny: 2 },
    B: { Rainy: 2 },
    C: { Stormy: 2 },
    D: { Cloudy: 2 },
  },
  // Q10: Semangat
  10: {
    A: { Sunny: 2, Stormy: 1 }, // Pujian = Sunny, pengakuan (status) = Stormy
    B: { Stormy: 2 },
    C: { Cloudy: 2 },
    D: { Rainy: 2 },
  },
  // Q11: Kerja kelompok
  11: {
    A: { Stormy: 2 },
    B: { Sunny: 2 },
    C: { Rainy: 2 },
    D: { Cloudy: 2, Sunny: 1 }, // Mediator/stabil = Cloudy, "cari jalan tengah" (harmoni) = Sunny
  },
  // Q12: Aturan
  12: {
    A: { Rainy: 2 },
    B: { Cloudy: 2 },
    C: { Stormy: 2 },
    D: { Sunny: 2 },
  },
  // Q13: Pandangan orang
  13: {
    A: { Sunny: 2 },
    B: { Stormy: 2 },
    C: { Cloudy: 2 },
    D: { Rainy: 2 },
  },
  // Q14: Liburan
  14: {
    A: { Rainy: 2 },
    B: { Stormy: 2, Sunny: 1 }, // Tujuan utama = Stormy, fleksibel = Sunny
    C: { Sunny: 2 },
    D: { Cloudy: 2 },
  },
  // Q15: Paling penting
  15: {
    A: { Sunny: 2 },
    B: { Stormy: 2 },
    C: { Rainy: 2 },
    D: { Cloudy: 2 },
  },
};



export interface TemperamentScores {
  Sunny: number;
  Stormy: number;
  Rainy: number;
  Cloudy: number;
}

export interface AnalysisResult {
  weatherType: string;
  temperamentScores: TemperamentScores;
}

// Calculate raw scores for each weather type from answers

function calculateRawScores(answers: Answer[]): { [key: string]: number } {
  const scores: { [key: string]: number } = {
    Sunny: 0,
    Rainy: 0,
    Stormy: 0,
    Cloudy: 0,
  };
  const validTypes = Object.keys(scores);

  answers.forEach((ans) => {
    const questionMapping = answerMappings[ans.questionId];
    if (questionMapping) {
      const optionMapping = questionMapping[ans.value];
      if (optionMapping) {
        for (const type in optionMapping) {
          if (validTypes.includes(type)) {
            scores[type] += optionMapping[type];
          }
        }
      }
    }
  });

  return scores;
}

// Convert raw weather scores to weather percentages
function convertToWeatherPercentages(rawScores: { [key: string]: number }): TemperamentScores {
  const total = Object.values(rawScores).reduce((sum, score) => sum + score, 0);
  
  // Avoid division by zero
  if (total === 0) {
    return {
      Sunny: 25,
      Stormy: 25,
      Rainy: 25,
      Cloudy: 25,
    };
  }

  return {
    Sunny: Math.round((rawScores.Sunny / total) * 100),
    Stormy: Math.round((rawScores.Stormy / total) * 100),
    Rainy: Math.round((rawScores.Rainy / total) * 100),
    Cloudy: Math.round((rawScores.Cloudy / total) * 100),
  };
}

export function determineWeatherType(answers: Answer[]): string {
  const scores = calculateRawScores(answers);

  let highestScore = -1;
  let determinedType = "Cloudy"; // Default jika semua 0
  for (const type in scores) {
    if (scores[type] > highestScore) {
      highestScore = scores[type];
      determinedType = type;
    }
    // Tie-breaker "Siapa Cepat"
  }
  console.log("Final Scores:", scores);
  return determinedType;
}

// Analyze answers and return both weather type and temperament percentages
export function analyzePersonality(answers: Answer[]): AnalysisResult {
  const rawScores = calculateRawScores(answers);
  
  let highestScore = -1;
  let weatherType = "Cloudy";
  for (const type in rawScores) {
    if (rawScores[type] > highestScore) {
      highestScore = rawScores[type];
      weatherType = type;
    }
  }

  const temperamentScores = convertToWeatherPercentages(rawScores);
  
  console.log("Final Scores:", rawScores);
  console.log("Weather Percentages:", temperamentScores);
  
  return {
    weatherType,
    temperamentScores,
  };
}
