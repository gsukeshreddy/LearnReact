const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/Movies/popular`);
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status}`);
  }
  let data;
  try {
    data = await response.json();
  } catch (e) {
    throw new Error('Invalid JSON response');
  }
  return data && data.results ? data.results : [];
};

export const searchMovies = async (query: string) => {
  const response = await fetch(`${BASE_URL}/Movies/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`Failed to search movies: ${response.status}`);
  }
  let data;
  try {
    data = await response.json();
  } catch (e) {
    throw new Error('Invalid JSON response');
  }
  return data && data.results ? data.results : [];
};
