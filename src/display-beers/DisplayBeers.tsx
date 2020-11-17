import { Row, Col } from "antd";
import React, { ReactNode } from "react";
import { BeerInfo } from "../models/BeerInfo";

interface DisplayBeersProps<T extends BeerInfo> {
  beers: T[];
  renderBeer: (beer: T) => ReactNode;
}

export const DisplayBeers = <T extends BeerInfo>(
  props: DisplayBeersProps<T>
) => {
  const firstRow = props.beers.slice(0, 4);
  const secondRow = props.beers.slice(4, 8);

  const BeerRow = (beers: T[]) => {
    return (
      <Row className="beers-row" gutter={[16, 24]}>
        {beers.map((beer, index) => (
          <Col key={"Col" + beer.id} span={6}>
            {props.renderBeer(beer)}
          </Col>
        ))}
      </Row>
    );
  };
  return (
    <>
      {BeerRow(firstRow)}
      {BeerRow(secondRow)}
    </>
  );
};
