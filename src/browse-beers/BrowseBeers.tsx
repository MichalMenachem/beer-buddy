import React, { useEffect, useState } from "react";
import { BeerCard } from "../beer-card/BeerCard";
import { BeerInfo } from "../models/BeerInfo";
import "./browse-beers.css";
import { Input, message, Pagination, Spin } from "antd";
import axios from "axios";
import { DisplayBeers } from "../display-beers/DisplayBeers";
import { useHistory, useLocation } from "react-router-dom";

const { Search } = Input;

const PER_PAGE = 8;

export const BrowseBeers = () => {
  const [beers, setBeers] = useState<BeerInfo[]>([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchBeers = () => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get("https://api.punkapi.com/v2/beers", {
          params: {
            page: query.get("page") || 1,
            per_page: PER_PAGE,
            food: query.get("food"),
          },
        })
        .then(function (response) {
          setBeers(response.data);
        })
        .catch(function (error) {
          message.error("Oops! Something went wrong...");
        })
        .then(() => {
          setLoading(false);
        });
    }, 300);
  };

  useEffect(fetchBeers, [location]);

  const handleSearchPairing = (value: string) => {
    if (value === "") {
      query.delete("food");
    } else {
      query.set("food", value.replace(/\s+/g, "_"));
    }
    query.set("page", "1");
    history.push({
      pathname: "/browse",
      search: `?${query.toString()}`,
    });
  };

  const onPageChange = (page: number) => {
    query.set("page", page.toString());
    history.push({
      pathname: "/browse",
      search: `?${query.toString()}`,
    });
  };

  return (
    <>
      <div className="food-pairing">
        <span className="pairing-text">Food Pairing</span>
        <Search
          placeholder="Enter desired food"
          onSearch={handleSearchPairing}
          className="search-pairing"
        />
      </div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <DisplayBeers
          beers={beers}
          renderBeer={(beer) => (
            <BeerCard key={"Browse" + beer.id} info={beer} />
          )}
        />
      )}

      <Pagination
        className="pagination"
        showTitle={false}
        current={parseInt(query.get("page") || "1")}
        total={100}
        pageSize={PER_PAGE}
        showSizeChanger={false}
        onChange={onPageChange}
      />
    </>
  );
};
