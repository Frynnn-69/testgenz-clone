// Fallback buat AI Response
export const FALLBACK_DATA: {
  [key: string]: {
    developmentAreas: string[];
    careerRecommendations: string[];
  };
} = {
  Sunny: {
    developmentAreas: [
      "Fokus dan konsentrasi",
      "Konsistensi dalam pekerjaan",
      "Manajemen waktu",
    ],
    careerRecommendations: [
      "Marketing",
      "Sales",
      "Public Relations",
      "Entertainment",
      "Event Organizer",
    ],
  },
  Rainy: {
    developmentAreas: [
      "Mengurangi overthinking",
      "Menerima ketidaksempurnaan",
      "Mengelola sensitivitas",
    ],
    careerRecommendations: [
      "Research",
      "Accounting",
      "Engineering",
      "Writing",
      "Data Analysis",
    ],
  },
  Stormy: {
    developmentAreas: [
      "Kesabaran dengan orang lain",
      "Empati dan mendengarkan",
      "Fleksibilitas",
    ],
    careerRecommendations: [
      "Management",
      "Entrepreneurship",
      "Law",
      "Politics",
      "Business Development",
    ],
  },
  Cloudy: {
    developmentAreas: [
      "Mengambil inisiatif",
      "Asertivitas dalam komunikasi",
      "Motivasi diri",
    ],
    careerRecommendations: [
      "Counseling",
      "Human Resources",
      "Teaching",
      "Healthcare",
      "Customer Service",
    ],
  },
};
