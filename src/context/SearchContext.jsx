/* SEARCH FUNCTIONALITY */
// Global search context so the Header (input) and ProductsGrid (filter)
// can share the same searchTerm without prop-drilling through Layout/Home.
import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext(undefined);

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}

// Custom hook for easy, safe access from any component
export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
