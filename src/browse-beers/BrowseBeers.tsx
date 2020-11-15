import React, { useEffect, useState } from "react";
import { BeerCard } from "../beer-card/BeerCard";
import { BeerInfo } from "../models/BeerInfo";
import "./browse-beers.css";
import { Input, message } from "antd";
import axios from "axios";

const { Search } = Input;

export const BrowseBeers = () => {
  const [beers, setBeers] = useState<BeerInfo[]>([]);
  const [foodSearch, setFoodSearch] = useState<string | undefined>(undefined);

  const fetchBeers = () => {
    axios
      .get("https://api.punkapi.com/v2/beers", {
        params: {
          page: 1,
          per_page: 12,
          food: foodSearch,
        },
      })
      .then(function (response) {
        setBeers(response.data);
      })
      .catch(function (error) {
        message.error("Oops! Something went wrong...");
      });
  };

  useEffect(fetchBeers, []);

  useEffect(fetchBeers, [foodSearch]);

  const handleSearchPairing = (value: string) => {
    if (value === "") {
      setFoodSearch(undefined);
    } else {
      setFoodSearch(value.replace(/\s+/g, "_"));
    }
  };

  return (
    <>
      <div>
        <span>Food Pairing</span>
        <Search
          placeholder="Enter desired food"
          onSearch={handleSearchPairing}
          style={{ width: 200 }}
        />
      </div>
      {beers.map((beer, index) => (
        <BeerCard key={index} info={beer} />
      ))}
    </>
  );
};
