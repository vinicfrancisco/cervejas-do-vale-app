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
import AlexaModal from '~/components/AlexaModal';
import { BeerBrandDTO, BeerTypeDTO } from '~/dtos/beers';
import useUser from '~/hooks/useUser';
import { apiUrl } from '~/services/api';
import getBeerBrandsUseCase from '~/useCases/Beers/GetBeerBrandsUseCase';
import getBeerTypesUseCase from '~/useCases/Beers/GetBeerTypesUseCase';

export type BeersSort =
  | 'price'
  | '-price'
  | 'graduation'
  | '-graduation'
  | 'rating'
  | '-rating';

interface AlexaListBeersParams {
  type?: string;
  brand?: string;
  sort?: BeersSort;
}

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
  openAlexaModal: () => void;
}

export const BeersContext = createContext<BeersContextData>(
  {} as BeersContextData,
);

export const BeersProvider: React.FC = ({ children }) => {
  const { navigate } = useNavigation();
  const { user } = useUser();

  const [showAlexaModal, setShowAlexaModal] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
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

  const openAlexaModal = useCallback(() => {
    setShowAlexaModal(true);
  }, []);

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
    socketRef.current = io(apiUrl, {
      transports: ['websocket'],
    });

    if (user) {
      socketRef.current.emit('connectUser', { user_id: user.id });

      socketRef.current.on('Authenticated', () => {
        setAuthenticated(true);
      });

      socketRef.current.on(
        'ListBeers',
        ({ brand, type, sort }: AlexaListBeersParams) => {
          const findBrandId = beerBrands.find(
            beerBrand =>
              beerBrand.name.toLowerCase().trim() ===
              brand?.toLowerCase().trim(),
          );

          const findTypeId = beerTypes.find(
            beerType =>
              beerType.name.toLowerCase().trim() === type?.toLowerCase().trim(),
          );

          setShowAlexaModal(false);
          setFilters({
            sort: sort || null,
            beerBrandId: findBrandId?.id || '',
            beerTypeId: findTypeId?.id || '',
          });

          navigate('Main', { screen: 'Home', params: { screen: 'BeersList' } });
        },
      );

      socketRef.current.on('ListFavoriteBeers', () => {
        setShowAlexaModal(false);

        navigate('Main', {
          screen: 'Favorites',
          params: { screen: 'MyFavorites' },
        });
      });
    }

    return () => {
      setAuthenticated(false);
      socketRef.current?.disconnect();
    };
  }, [beerBrands, beerTypes, navigate, user]);

  const BeersContextValue = useMemo((): BeersContextData => {
    return {
      filters,
      beerBrands,
      beerTypes,
      openAlexaModal,
      handleApplyFilters,
    };
  }, [beerBrands, beerTypes, filters, openAlexaModal, handleApplyFilters]);

  return (
    <BeersContext.Provider value={BeersContextValue}>
      <AlexaModal
        authenticated={authenticated}
        visible={showAlexaModal}
        onClose={() => setShowAlexaModal(false)}
      />

      {children}
    </BeersContext.Provider>
  );
};
