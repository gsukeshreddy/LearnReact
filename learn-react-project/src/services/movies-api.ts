const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/Movies/popular`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query: string) => {
  const response = await fetch(`${BASE_URL}/Movies/search&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results;
};
