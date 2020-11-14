import Menu from "antd/lib/menu";
import React from "react";
import { Link } from "react-router-dom";
import "./navigation-bar.css";

export const NavigationBar = () => {
  return (
    <>
      <Menu mode="horizontal" theme="dark">
        <Menu.Item key="home">
          <Link to="/">
            <span className="logo-design">BeerBuddy</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="browse">
          <Link to="/browse">Browse Beers</Link>
        </Menu.Item>
        <Menu.Item key="favorites">
          <Link to="/favorites">Favorite Beers</Link>
        </Menu.Item>
      </Menu>
    </>
  );
};
