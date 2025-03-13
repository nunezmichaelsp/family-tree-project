const ENV = process.env.NODE_ENV;

export const Config = {
  API_URL:
    ENV === "development"
      ? "http://localhost:5118/api" // Dev Backend
      : "https://your-backend-production-url.com/api", // Prd Backend
  CLIENT_ID: "my-constant-client-id",
};