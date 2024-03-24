export const BASE_URL_SERVER =
  process.env.NODE_ENV === "production"
    ? "https://chatnextserver.onrender.com"
    : `http://localhost:8000`;

export const BASE_URL_CLIENT = `http://localhost:3000`;
