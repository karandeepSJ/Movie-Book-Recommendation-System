import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SearchPage from "./components/SearchPage/SearchPage";
import Dashboard from "./components/Dashboard/Dashboard";
import MoviePage from "./components/ItemPage/MoviePage";
import BookPage from "./components/ItemPage/BookPage";
import NavbarPage from './components/NavbarPage';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Route path="/" component={NavbarPage}/>
        <Switch>
          <Route path="/home" component={Dashboard} />
          <Route path="/search/:query" component={SearchPage} />
          <Route path="/movie/:id" component={MoviePage} />
          <Route path="/book/:isbn" component={BookPage} />
          <Redirect from='/' to="/home" exact />
          <Route path="*" component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
