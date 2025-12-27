import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Internal API Documentation",
        version: "1.0.0",
        description:
          "Core API for personality assessment and analysis services",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development Server",
        },
        {
          url: "https://example-domain.vercel.app", // Ganti nanti pas deploy
          description: "Production Server",
        },
      ],

      // Endpoint API
      paths: {
        "/api/questions": {
          get: {
            summary: "Get list of questions",
            tags: ["Assessment"],
            responses: {
              200: {
                description: "List of questions loaded",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Question" },
                    },
                  },
                },
              },
            },
          },
        },
        "/api/analyze": {
          post: {
            summary: "Send answers to AI",
            tags: ["Assessment"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AnalyzeRequest" },
                },
              },
            },
            responses: {
              200: {
                description: "Analysis result",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/AnalysisResponse" },
                    examples: {
                      Sunny: {
                        summary: "Sanguinis (Sunny)",
                        value: {
                          result: "Sunny",
                          analysis:
                            "You are the Radiant Sun, bringing energy...",
                        },
                      },
                      Rainy: {
                        summary: "Melankolis (Rainy)",
                        value: {
                          result: "Rainy",
                          analysis:
                            "You are the Gentle Rain, deep and thoughtful...",
                        },
                      },
                      Stormy: {
                        summary: "Koleris (Stormy)",
                        value: {
                          result: "Stormy",
                          analysis:
                            "You are the Powerful Storm, leading the way...",
                        },
                      },
                      Cloudy: {
                        summary: "Plegmatis (Cloudy)",
                        value: {
                          result: "Cloudy",
                          analysis: "You are the Calm Cloud, creating peace...",
                        },
                      },
                    },
                  },
                },
              },
              400: {
                description: "Bad Request",
                content: {
                  "application/json": {
                    example: {
                      error: "Invalid input: Missing answers or user data.",
                    },
                  },
                },
              },
              500: {
                description: "Server Error",
                content: {
                  "application/json": {
                    example: {
                      error: "Failed to generate analysis.",
                    },
                  },
                },
              },
            },
          },
        },
      },

      // Schemas (Data Models)
      components: {
        schemas: {
          Question: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              text: {
                type: "string",
                example: "Apa yang kamu lakukan saat pesta?",
              },
              options: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string", example: "A" },
                    text: {
                      type: "string",
                      example: "Menjadi pusat perhatian",
                    },
                  },
                },
              },
            },
          },
          UserData: {
            type: "object",
            required: ["nama"],
            properties: {
              nama: { type: "string", example: "Tester Nuansa" },
              email: {
                type: "string",
                format: "email",
                example: "nuansa@example.com",
              },
            },
          },
          Answer: {
            type: "object",
            required: ["questionId", "value"],
            properties: {
              questionId: { type: "integer", example: 1 },
              value: {
                type: "string",
                enum: ["A", "B", "C", "D"],
                description: "Option ID (A, B, C, or D)",
                example: "A",
              },
            },
          },
          AnalyzeRequest: {
            type: "object",
            required: ["userData", "answers"],
            properties: {
              userData: { $ref: "#/components/schemas/UserData" },
              answers: {
                type: "array",
                items: { $ref: "#/components/schemas/Answer" },
              },
            },
          },
          AnalysisResponse: {
            type: "object",
            properties: {
              result: { type: "string", example: "Sunny" },
              analysis: {
                type: "string",
                example: "You are the Radiant Sun...",
              },
            },
          },
        },
      },
    },
  });
  return spec;
};
