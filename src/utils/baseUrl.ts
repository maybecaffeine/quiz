const baseUrl: string =
  process.env.NODE_ENV === 'production'
    ? "http://localhost:5000/linkedin/callback"
    : "http://localhost:3000";

export default baseUrl;
export {};