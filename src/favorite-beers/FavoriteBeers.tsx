import React, { useState } from "react";
import { BeerCard } from "../beer-card/BeerCard";
import "./favorite-beers.css";
import { Pagination } from "antd";
import { DisplayBeers } from "../display-beers/DisplayBeers";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const FavoriteBeers = () => {
  const [page, setPage] = useState(1);

  const favoriteBeers = useSelector((state: RootState) =>
    Object.values(state.beer.favorites)
  );

  return (
    <>
      <br />
      <DisplayBeers
        beers={favoriteBeers.slice((page - 1) * 8, page * 8)}
        renderBeer={(beer) => (
          <BeerCard key={"Favorite" + beer.id} info={beer} rank={beer.rank} />
        )}
      />
      <Pagination
        className="pagination"
        showTitle={false}
        current={page}
        total={100}
        pageSize={8}
        showSizeChanger={false}
        onChange={(page) => setPage(page)}
      />
    </>
  );
};
