export interface BeerBrandDTO {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface BeerTypeDTO {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface BeerDTO {
  id: string;
  name: string;
  volume: number;
  alcoholic_degree: string;
  price: string;
  beer_type_id: string;
  beer_brand_id: string;
  beer_brand: BeerBrandDTO;
  beer_type: BeerTypeDTO;
  image: string;
  image_url: string;
  rating: string;
  created_at: string;
  updated_at: string;
  hasFavorited?: boolean;
  hasRated?: boolean;
}

export interface GetBeersResponseDTO {
  data: BeerDTO[];
  total: number;
}

export interface FavoriteBeerResponseDTO {
  user_id: string;
  beer_id: string;
  id: string;
  created_at: string;
  updated_at: string;
}
