import React, { useEffect, useState } from "react";
import { BeerCard } from "../beer-card/BeerCard";
import { BeerInfo } from "../models/BeerInfo";
import "./browse-beers.css";
import { Col, Input, message, Pagination, Row, Spin } from "antd";
import axios from "axios";

const { Search } = Input;

interface BeerQueryParams {
  foodSearch: string | undefined;
  page: number;
}

export const BrowseBeers = () => {
  const [beers, setBeers] = useState<BeerInfo[]>([]);
  const [params, setParams] = useState<BeerQueryParams>({
    page: 1,
    foodSearch: undefined,
  });
  const [loading, setLoading] = useState(true);

  const fetchBeers = () => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get("https://api.punkapi.com/v2/beers", {
          params: {
            page: params.page,
            per_page: 8,
            food: params.foodSearch,
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

  useEffect(fetchBeers, []);

  useEffect(fetchBeers, [params]);

  const handleSearchPairing = (value: string) => {
    if (value === "") {
      setParams({ page: 1, foodSearch: undefined });
    } else {
      setParams({ page: 1, foodSearch: value.replace(/\s+/g, "_") });
    }
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
        <Row className="beers-row" gutter={[16, 24]}>
          {beers.map((beer, index) => (
            <Col key={index} span={6}>
              <BeerCard key={index} info={beer} />
            </Col>
          ))}
        </Row>
      )}

      <Pagination
        className="pagination"
        current={params.page}
        total={100}
        pageSize={8}
        showSizeChanger={false}
        onChange={(page) =>
          setParams({ page: page, foodSearch: params.foodSearch })
        }
      />
    </>
  );
};
