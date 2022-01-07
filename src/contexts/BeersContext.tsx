import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Socket, io } from 'socket.io-client';
import { createContext } from 'use-context-selector';
import { BeerBrandDTO, BeerTypeDTO } from '~/dtos/beers';
import useUser from '~/hooks/useUser';
import getBeerBrandsUseCase from '~/useCases/Beers/GetBeerBrandsUseCase';
import getBeerTypesUseCase from '~/useCases/Beers/GetBeerTypesUseCase';

interface AlexaListBeersParams {
  type: string;
  brand: string;
}

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
  beerTypes: BeerTypeDTO[];
  beerBrands: BeerBrandDTO[];
  handleApplyFilters: (filters: BeersFilters) => void;
}

export const BeersContext = createContext<BeersContextData>(
  {} as BeersContextData,
);

export const BeersProvider: React.FC = ({ children }) => {
  const { navigate } = useNavigation();
  const { user } = useUser();

  const [beerTypes, setBeerTypes] = useState<BeerTypeDTO[]>([]);
  const [beerBrands, setBeerBrands] = useState<BeerBrandDTO[]>([]);
  const [filters, setFilters] = useState<BeersFilters>({
    sort: null,
    beerBrandId: '',
    beerTypeId: '',
  });

  const socketRef = useRef<Socket | null>(null);

  const handleApplyFilters = useCallback((newFilters: BeersFilters) => {
    setFilters(newFilters);
  }, []);

  const BeersContextValue = useMemo((): BeersContextData => {
    return {
      filters,
      beerBrands,
      beerTypes,
      handleApplyFilters,
    };
  }, [beerBrands, beerTypes, filters, handleApplyFilters]);

  useEffect(() => {
    async function loadBeersInfo() {
      try {
        const types = await getBeerTypesUseCase();
        const brands = await getBeerBrandsUseCase();

        setBeerTypes(types);
        setBeerBrands(brands);
      } catch {
        //
      }
    }

    if (user) {
      loadBeersInfo();
    }
  }, [user]);

  useEffect(() => {
    socketRef.current = io('https://cervejas-do-vale.herokuapp.com', {
      transports: ['websocket'],
    });

    if (user) {
      socketRef.current.emit('connectUser', { user_id: user.id });

      socketRef.current.on('Authenticated', args => {
        console.log(args);
      });

      socketRef.current.on(
        'ListBeers',
        ({ brand, type }: AlexaListBeersParams) => {
          const findBrandId = beerBrands.find(
            beerBrand =>
              beerBrand.name.toLowerCase().trim() ===
              brand.toLowerCase().trim(),
          );

          const findTypeId = beerTypes.find(
            beerType =>
              beerType.name.toLowerCase().trim() === type.toLowerCase().trim(),
          );

          setFilters(state => ({
            ...state,
            beerBrandId: findBrandId?.id || '',
            beerTypeId: findTypeId?.id || '',
          }));
        },
      );
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [beerBrands, beerTypes, navigate, user]);

  return (
    <BeersContext.Provider value={BeersContextValue}>
      {children}
    </BeersContext.Provider>
  );
};
