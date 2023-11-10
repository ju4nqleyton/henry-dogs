import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Banner from './components/Banner/Banner';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import Create from './views/Create/Create';
import './App.css';

function App() {
  return (
    <div className="App">
      <Banner />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/create" component={Create} />
      </Switch>
    </div>
  );
}

export default App;
