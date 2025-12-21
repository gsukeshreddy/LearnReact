import React, { createContext, useContext, useState } from 'react';
import type { Movie } from '../models/Movie';

interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

//create the context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

//create a provider component
//wrapping this will provide the children get access to the context
export const FavoritesProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const addFavorite = (movie: Movie) => {
    if (!favorites.some(fav => fav.id === movie.id)) {
      setFavorites(prev => [...prev, movie]);
    }
  };

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(movie => movie.id !== id));
  };

  const isFavorite = (id: number) => favorites.some(movie => movie.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

//custom hook
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
