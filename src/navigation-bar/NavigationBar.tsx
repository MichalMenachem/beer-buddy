import { Button, PageHeader } from "antd";
import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import "./navigation-bar.css";

export const NavigationBar = (props: PropsWithChildren<{}>) => {
  return (
    <PageHeader
      className="nav-layout"
      ghost={false}
      title={<h3 className="logo-design">BeerBuddy</h3>}
      extra={[
        <Button key="1" type="primary">
          <Link to="/browse">Browse Beers</Link>
        </Button>,
        <Button key="2" type="primary">
          <Link to="/favorites">Favorite Beers</Link>
        </Button>,
      ]}
    >
      {props.children}
    </PageHeader>
  );
};
