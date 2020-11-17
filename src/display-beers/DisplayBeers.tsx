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
  return (
    <Row className="beers-row" gutter={[16, 24]}>
      {props.beers.map((beer, index) => (
        <Col key={index} span={6}>
          {props.renderBeer(beer)}
        </Col>
      ))}
    </Row>
  );
};
