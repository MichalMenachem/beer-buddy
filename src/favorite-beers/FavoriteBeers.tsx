import React from "react";
import { BeerCard } from "../beer-card/BeerCard";
import "./favorite-beers.css";
import { Pagination } from "antd";
import { DisplayBeers } from "../display-beers/DisplayBeers";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useHistory, useLocation } from "react-router-dom";
import { RemoveAll } from "./remove-all/RemoveAll";

const PER_PAGE = 8;

export const FavoriteBeers = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const history = useHistory();

  const onPageChange = (page: number) => {
    query.set("page", page.toString());
    history.push({
      pathname: "/favorites",
      search: `?${query.toString()}`,
    });
  };

  const favoriteBeers = useSelector((state: RootState) =>
    Object.values(state.beer.favorites)
  );

  const page = parseInt(query.get("page") || "1");

  return (
    <>
      <br />
      <RemoveAll />
      <DisplayBeers
        beers={favoriteBeers.slice((page - 1) * PER_PAGE, page * PER_PAGE)}
        renderBeer={(beer) => (
          <BeerCard key={"Favorite" + beer.id} info={beer} rank={beer.rank} />
        )}
      />
      <Pagination
        className="pagination"
        showTitle={false}
        current={page}
        total={100}
        pageSize={PER_PAGE}
        showSizeChanger={false}
        onChange={onPageChange}
      />
    </>
  );
};
