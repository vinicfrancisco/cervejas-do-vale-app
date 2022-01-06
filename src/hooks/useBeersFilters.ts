import { useContextSelector } from 'use-context-selector';
import { BeersContext, BeersContextData } from '~/contexts/BeersContext';

type UseBeersFiltersData = Pick<
  BeersContextData,
  'filters' | 'handleApplyFilters'
>;

export default function useBeersFilters(): UseBeersFiltersData {
  const filters = useContextSelector(BeersContext, state => state.filters);
  const handleApplyFilters = useContextSelector(
    BeersContext,
    state => state.handleApplyFilters,
  );

  return {
    filters,
    handleApplyFilters,
  };
}
