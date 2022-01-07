import { useContextSelector } from 'use-context-selector';
import { BeersContext, BeersContextData } from '~/contexts/BeersContext';

type UseBeersFiltersData = Pick<
  BeersContextData,
  | 'filters'
  | 'handleApplyFilters'
  | 'beerBrands'
  | 'beerTypes'
  | 'openAlexaModal'
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
  const openAlexaModal = useContextSelector(
    BeersContext,
    state => state.openAlexaModal,
  );

  return {
    filters,
    beerBrands,
    beerTypes,
    handleApplyFilters,
    openAlexaModal,
  };
}
