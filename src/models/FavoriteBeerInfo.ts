import { BeerInfo } from "./BeerInfo";

export interface FavoriteBeerInfo extends BeerInfo {
  rank: number | undefined;
}
