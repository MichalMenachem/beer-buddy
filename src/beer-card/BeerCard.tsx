import Card from "antd/lib/card";
import Meta from "antd/lib/card/Meta";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import "./beer-card.css";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { BeerInfo } from "../models/BeerInfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { addToFav, removeFromFav, updateRank } from "../app/beerSlice";
import { Col, Row, Select } from "antd";

const { Option } = Select;

interface BeerCardProps {
  info: BeerInfo;
  rank?: number | null;
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

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <>
      <Card hoverable className="card-design" onClick={() => setVisible(true)}>
        <Row gutter={4}>
          <Col span={4}>
            {props.rank === undefined ? (
              <></>
            ) : (
              <div className="choose-rank">
                <span>Rank</span>
                <Select
                  onClick={(event) => event.stopPropagation()}
                  onChange={(value) =>
                    dispatch(
                      updateRank({
                        id: props.info.id,
                        rank: value === "" ? null : value,
                      })
                    )
                  }
                  defaultValue={props.rank === null ? "" : props.rank!}
                >
                  <Option value="" title="">
                    {" "}
                  </Option>
                  <Option value={5} title="">
                    5
                  </Option>
                  <Option value={4} title="">
                    4
                  </Option>
                  <Option value={3} title="">
                    3
                  </Option>
                  <Option value={2} title="">
                    2
                  </Option>
                  <Option value={1} title="">
                    1
                  </Option>
                </Select>
              </div>
            )}
          </Col>
          <Col span={16}>
            <img className="beer-img" alt="beer" src={props.info.image_url} />
          </Col>
          <Col span={4}>
            {isFavorite ? (
              <StarFilled
                className="fill-star star"
                onClick={handleRemoveFromFav}
              />
            ) : (
              <StarOutlined className="star" onClick={handleAddToFav} />
            )}
          </Col>
        </Row>

        <Meta title={props.info.name} />
      </Card>
      <Modal
        title={
          <div>
            <b>{props.info.name}</b>
            <br />
            <i>{props.info.tagline}</i>
          </div>
        }
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        cancelButtonProps={{ hidden: true }}
      >
        <Row>
          <Col className="img-col-expand" span={12}>
            <img className="img-card-expand" src={props.info.image_url} />
          </Col>
          <Col className="text-col-expand" span={12}>
            <span>&#128198; First Brewed: {props.info.first_brewed}</span>
            <br />
            <span>&#127867; Alcohol Level: {props.info.abv}%</span>
            <br />
            <span>
              &#128208; Volume: {props.info.volume.value}{" "}
              {props.info.volume.unit}
            </span>
            <br />
            <span>
              &#127828; Food Pairing:{" "}
              {
                <ul>
                  {props.info.food_pairing.map((pairing, index) => (
                    <li className="food-entry" key={index}>
                      {pairing}
                    </li>
                  ))}
                </ul>
              }
            </span>
            <br />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
