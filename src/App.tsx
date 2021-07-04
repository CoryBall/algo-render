import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'
import BinarySearchPage from './pages/BinarySearch'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path='/binary-search'>
          <BinarySearchPage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;