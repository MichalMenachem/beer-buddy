export interface BeerInfo {
  id: string;
  name: string;
  image_url: string;
  tagline: string;
  first_brewed: string;
  abv: string;
  volume: {
    value: string;
    unit: string;
  };
  food_pairing: string[];
}
