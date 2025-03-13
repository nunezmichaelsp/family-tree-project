const ENV = process.env.NODE_ENV;

export const Config = {
  API_URL:
    ENV === "development"
      ? "http://localhost:5118/api" // Dev Backend
      : "https://familytreeapi-cpc9g4gca5gdhuc7.centralus-01.azurewebsites.net/api", // Prd Backend
  CLIENT_ID: "my-constant-client-id",
};