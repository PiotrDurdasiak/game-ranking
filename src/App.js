import React from 'react';
import './App.css';
import Main from './pages/main';
import MyGames from './pages/MyGames';
import Ranking from './pages/MyRanking';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';


function App() {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/myGames" component={MyGames} />
            <Route path="/myRanking" component={Ranking} />
        </Switch>
    </BrowserRouter>
);
}

export default App;
