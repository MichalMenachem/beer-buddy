import Card from "antd/lib/card";
import Meta from "antd/lib/card/Meta";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import "./beer-card.css";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { BeerInfo } from "../models/BeerInfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { addToFav, removeFromFav } from "../features/counter/beerSlice";

interface BeerCardProps {
  info: BeerInfo;
}

export const BeerCard = (props: BeerCardProps) => {
  const [visible, setVisible] = useState(false);
  const isFavorite = useSelector(
    (state: RootState) => state.beer.favorites[props.info.id] !== undefined
  );
  const dispatch = useDispatch();

  const handleAddToFav = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
    dispatch(addToFav(props.info));
  };

  const handleRemoveFromFav = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
    dispatch(removeFromFav(props.info.id));
  };

  return (
    <>
      <Card hoverable className="card-design" onClick={() => setVisible(true)}>
        {isFavorite ? (
          <StarFilled className="fill-star" onClick={handleRemoveFromFav} />
        ) : (
          <StarOutlined onClick={handleAddToFav} />
        )}
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
              {props.info.food_pairing.map((pairing, index) => (
                <li key={index}>{pairing}</li>
              ))}
            </ul>
          }
        </p>
      </Modal>
    </>
  );
};
