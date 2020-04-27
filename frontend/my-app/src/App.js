import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SearchPage from "./components/SearchPage/SearchPage";
import Dashboard from "./components/Dashboard/Dashboard";
import MoviePage from "./components/ItemPage/MoviePage";
import BookPage from "./components/ItemPage/BookPage";
import GenrePage from "./components/GenrePage";
import NavbarPage from './components/NavbarPage';
import NotFound from './components/NotFound/NotFound';
import BookSearchPage from "./components/SearchPage/BookSearchPage"
import BookGenrePage from "./components/BookGenrePage"

function App() {
  return (
    <div>
      <BrowserRouter>
          <Route path="/" component={NavbarPage}/>
        <Switch>
          <Route path="/home" component={Dashboard} />
          
          <Route path="/booksearch/:query" component={BookSearchPage} />
          <Route path="/booksearching/:genre" component={BookGenrePage} />
          <Route path="/search/:query" component={SearchPage} />
          <Route path="/searching/:genre" component={GenrePage} />
          
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
