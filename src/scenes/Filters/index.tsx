import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Picker from '~/components/Picker';
import Radio from '~/components/Radio';
import { BeersSort } from '~/contexts/BeersContext';
import useBeersFilters from '~/hooks/useBeersFilters';
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
  const { filters, beerBrands, beerTypes, handleApplyFilters } =
    useBeersFilters();

  const [selectedSort, setSelectedSort] = useState<BeersSort | null>(
    filters.sort,
  );
  const [selectedType, setSelectedType] = useState<string>(filters.beerTypeId);
  const [selectedBrand, setSelectedBrand] = useState<string>(
    filters.beerBrandId,
  );

  const brandsOptions = useMemo(() => {
    return beerBrands.map(brand => ({
      label: brand.name,
      value: brand.id,
    }));
  }, [beerBrands]);

  const typesOptions = useMemo(() => {
    return beerTypes.map(type => ({
      label: type.name,
      value: type.id,
    }));
  }, [beerTypes]);

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
