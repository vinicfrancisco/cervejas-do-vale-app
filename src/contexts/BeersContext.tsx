import React, { useCallback, useMemo, useState } from 'react';
import { createContext } from 'use-context-selector';

export type BeersSort =
  | 'price'
  | '-price'
  | 'graduation'
  | '-graduation'
  | 'rating'
  | '-rating';

export interface BeersFilters {
  sort: BeersSort | null;
  beerTypeId: string;
  beerBrandId: string;
}

export interface BeersContextData {
  filters: BeersFilters;
  handleApplyFilters: (filters: BeersFilters) => void;
}

export const BeersContext = createContext<BeersContextData>(
  {} as BeersContextData,
);

export const BeersProvider: React.FC = ({ children }) => {
  const [filters, setFilters] = useState<BeersFilters>({
    sort: null,
    beerBrandId: '',
    beerTypeId: '',
  });

  const handleApplyFilters = useCallback((newFilters: BeersFilters) => {
    setFilters(newFilters);
  }, []);

  const BeersContextValue = useMemo((): BeersContextData => {
    return {
      filters,
      handleApplyFilters,
    };
  }, [filters, handleApplyFilters]);

  return (
    <BeersContext.Provider value={BeersContextValue}>
      {children}
    </BeersContext.Provider>
  );
};
