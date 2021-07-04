import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './components/Nav';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import BinarySearchPage from './pages/searching/BinarySearch';
import BubbleSortPage from './pages/sorting/BubbleSort';
import SelectionSortPage from './pages/sorting/SelectionSort';

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {/* Searching */}
        <Route path="/binary-search">
          <BinarySearchPage />
        </Route>
        {/* Sorting */}
        <Route path="/selection-sort">
          <SelectionSortPage />
        </Route>
        <Route path="/bubble-sort">
          <BubbleSortPage />
        </Route>
        {/* Not Found */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
