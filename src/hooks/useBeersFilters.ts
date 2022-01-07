import { useContextSelector } from 'use-context-selector';
import { BeersContext, BeersContextData } from '~/contexts/BeersContext';

type UseBeersFiltersData = Pick<
  BeersContextData,
  'filters' | 'handleApplyFilters' | 'beerBrands' | 'beerTypes'
>;

export default function useBeersFilters(): UseBeersFiltersData {
  const beerBrands = useContextSelector(
    BeersContext,
    state => state.beerBrands,
  );
  const beerTypes = useContextSelector(BeersContext, state => state.beerTypes);
  const filters = useContextSelector(BeersContext, state => state.filters);
  const handleApplyFilters = useContextSelector(
    BeersContext,
    state => state.handleApplyFilters,
  );

  return {
    filters,
    beerBrands,
    beerTypes,
    handleApplyFilters,
  };
}
