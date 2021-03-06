import React from "react";
import "./App.css";
import { BrowseBeers } from "./browse-beers/BrowseBeers";
import { FavoriteBeers } from "./favorite-beers/FavoriteBeers";
import { NavigationBar } from "./navigation-bar/NavigationBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar>
          <div className="beers-content">
            <Switch>
              <Route path="/browse">
                <BrowseBeers />
              </Route>
              <Route path="/favorites">
                <FavoriteBeers />
              </Route>
              <Route path="/">
                <BrowseBeers />
              </Route>
            </Switch>
          </div>
        </NavigationBar>
      </div>
    </Router>
  );
}

export default App;
