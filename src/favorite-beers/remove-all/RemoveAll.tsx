import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { removeAllFav } from "../../app/beerSlice";
import "./remove-all.css";
import { RootState } from "../../app/store";

export const RemoveAll = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const noFavorites = useSelector(
    (state: RootState) => Object.keys(state.beer.favorites).length === 0
  );

  const handleRemoveAll = () => {
    dispatch(removeAllFav());
    setVisible(false);
  };

  return (
    <div>
      <Button
        disabled={noFavorites}
        className="remove-button"
        onClick={() => setVisible(true)}
      >
        Remove All
      </Button>
      <Modal
        visible={visible}
        onOk={handleRemoveAll}
        onCancel={() => setVisible(false)}
        cancelText="Hell no!"
        okText="Whatever..."
      >
        Are you sure you want to remove all your favorite beers?
      </Modal>
    </div>
  );
};
