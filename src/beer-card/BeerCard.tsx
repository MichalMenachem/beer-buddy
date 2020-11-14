import Card from "antd/lib/card";
import Meta from "antd/lib/card/Meta";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { BeerInfo } from "../browse-beers/BrowseBeers";
import "./beer-card.css";

interface BeerCardProps {
  info: BeerInfo;
}

export const BeerCard = (props: BeerCardProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Card hoverable className="card-design" onClick={() => setVisible(true)}>
        <img className="beer-img" alt="beer" src={props.info.image_url} />
        <Meta title={props.info.name} />
      </Card>
      <Modal
        title={props.info.name}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        cancelButtonProps={{ hidden: true }}
      >
        <p>
          <i>
            <b>{props.info.tagline}</b>
          </i>
        </p>
        <p>First Brewed: {props.info.first_brewed}</p>
        <p>Alcohol Level: {props.info.abv}%</p>
        <p>
          Volume: {props.info.volume.value} {props.info.volume.unit}
        </p>
        <p>
          Food Pairing:{" "}
          {
            <ul>
              {props.info.food_pairing.map((pairing) => (
                <li>{pairing}</li>
              ))}
            </ul>
          }
        </p>
      </Modal>
    </>
  );
};
