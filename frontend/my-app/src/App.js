import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SearchPage from "./components/SearchPage/SearchPage";
import Dashboard from "./components/Dashboard/Dashboard";
import MoviePage from "./components/ItemPage/MoviePage";
import BookPage from "./components/ItemPage/BookPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/search" component={SearchPage} />
          <Route path="/movie/:id" component={MoviePage} />
          <Route path="/book/:isbn" component={BookPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
