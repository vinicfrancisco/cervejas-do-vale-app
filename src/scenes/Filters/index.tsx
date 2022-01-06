import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import Picker from '~/components/Picker';
import Radio from '~/components/Radio';
import { BeersSort } from '~/contexts/BeersContext';
import useBeersFilters from '~/hooks/useBeersFilters';
import getBeerBrandsUseCase from '~/useCases/Beers/GetBeerBrandsUseCase';
import getBeerTypesUseCase from '~/useCases/Beers/GetBeerTypesUseCase';
import {
  Container,
  Subtitle,
  SectionHeader,
  Separator,
  CleanFiltersButton,
  CleanFiltersButtonText,
  ApplyFiltersButton,
} from './styles';

const Filters: React.VFC = () => {
  const { goBack } = useNavigation();
  const { filters, handleApplyFilters } = useBeersFilters();

  const { data: brands } = useQuery('brands', getBeerBrandsUseCase);

  const { data: types } = useQuery('types', getBeerTypesUseCase);

  const [selectedSort, setSelectedSort] = useState<BeersSort | null>(
    filters.sort,
  );
  const [selectedType, setSelectedType] = useState<string>(filters.beerTypeId);
  const [selectedBrand, setSelectedBrand] = useState<string>(
    filters.beerBrandId,
  );

  const brandsOptions = useMemo(() => {
    if (brands) {
      return brands.map(brand => ({
        label: brand.name,
        value: brand.id,
      }));
    }

    return [];
  }, [brands]);

  const typesOptions = useMemo(() => {
    if (types) {
      return types.map(type => ({
        label: type.name,
        value: type.id,
      }));
    }

    return [];
  }, [types]);

  const handleApplySort = (sort: BeersSort) => {
    setSelectedSort(state => {
      if (state) {
        return state === sort ? null : sort;
      }

      return sort;
    });
  };

  const handleCleanFilters = () => {
    setSelectedBrand('');
    setSelectedType('');
  };

  const confirmFilters = () => {
    handleApplyFilters({
      beerBrandId: selectedBrand,
      beerTypeId: selectedType,
      sort: selectedSort,
    });

    goBack();
  };

  return (
    <Container>
      <Subtitle>Ordenar por:</Subtitle>

      <Separator />

      <Radio
        label="Menor preço"
        selected={selectedSort === 'price'}
        onSelect={() => handleApplySort('price')}
      />

      <Radio
        label="Maior preço"
        selected={selectedSort === '-price'}
        onSelect={() => handleApplySort('-price')}
      />

      <Radio
        label="Menor graduação"
        selected={selectedSort === 'graduation'}
        onSelect={() => handleApplySort('graduation')}
      />

      <Radio
        label="Maior graduação"
        selected={selectedSort === '-graduation'}
        onSelect={() => handleApplySort('-graduation')}
      />

      <Radio
        label="Melhor avaliação"
        selected={selectedSort === 'rating'}
        onSelect={() => handleApplySort('rating')}
      />

      <Radio
        label="Pior avaliação"
        selected={selectedSort === '-rating'}
        onSelect={() => handleApplySort('-rating')}
      />

      <SectionHeader>
        <Subtitle>Filtrar por:</Subtitle>

        <CleanFiltersButton onPress={handleCleanFilters}>
          <CleanFiltersButtonText>LIMPAR FILTROS</CleanFiltersButtonText>
        </CleanFiltersButton>
      </SectionHeader>

      <Separator />

      <Picker
        label="Marca"
        value={selectedBrand}
        options={brandsOptions}
        onSelect={setSelectedBrand}
      />

      <Picker
        label="Tipo"
        value={selectedType}
        options={typesOptions}
        onSelect={setSelectedType}
      />

      <ApplyFiltersButton onPress={confirmFilters}>Aplicar</ApplyFiltersButton>
    </Container>
  );
};

export default Filters;
