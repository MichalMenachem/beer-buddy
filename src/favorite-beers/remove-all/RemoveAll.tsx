import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { removeAllFav } from "../../app/beerSlice";
import "./remove-all.css";
import { RootState } from "../../app/store";

export const RemoveAll = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [removeAll, setRemoveAll] = useState(false);
  const noFavorites = useSelector(
    (state: RootState) => Object.keys(state.beer.favorites).length === 0
  );

  /**
   * Given the behavior of an open modal and its unmounting upon favorites removal,
   * we must first close it before removing all favorite beers, otherwise it locks the scroll.
   */
  const handleRemoveAll = () => {
    setVisible(false);
    setRemoveAll(true);
  };

  useEffect(() => {
    if (removeAll) {
      dispatch(removeAllFav());
      setRemoveAll(false);
    }
  }, [removeAll]);

  return (
    <>
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
    </>
  );
};
