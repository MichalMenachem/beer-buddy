import React from "react";
import { BeerCard } from "../beer-card/BeerCard";
import { BeerInfo } from "../models/BeerInfo";
import "./browse-beers.css";

const beerExample: BeerInfo[] = [
  {
    id: "2",
    name: "Trashy Blonde",
    tagline: "You Know You Shouldn't",
    first_brewed: "04/2008",
    image_url: "https://images.punkapi.com/v2/2.png",
    abv: "4.1",
    volume: {
      value: "20",
      unit: "litres",
    },
    food_pairing: [
      "Fresh crab with lemon",
      "Garlic butter dipping sauce",
      "Goats cheese salad",
      "Creamy lemon bar doused in powdered sugar",
    ],
  },
  {
    id: "192",
    name: "Punk IPA 2007 - 2010",
    tagline: "Post Modern Classic. Spiky. Tropical. Hoppy.",
    first_brewed: "04/2007",
    image_url: "https://images.punkapi.com/v2/192.png",
    abv: "6.0",
    volume: {
      value: "20",
      unit: "liters",
    },
    food_pairing: [
      "Spicy carne asada with a pico de gallo sauce",
      "Shredded chicken tacos with a mango chilli lime salsa",
      "Cheesecake with a passion fruit swirl sauce",
    ],
  },
];

export const BrowseBeers = () => {
  return (
    <>
      {beerExample.map((beer) => (
        <BeerCard info={beer} />
      ))}
    </>
  );
};
