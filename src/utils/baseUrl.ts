const baseUrl: string =
  process.env.NODE_ENV === 'production'
    ? "https://quiz.minimacsystems.com"
    : "http://localhost:3000";

export default baseUrl;
export {};