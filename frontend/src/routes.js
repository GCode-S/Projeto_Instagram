import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header';

import Feed from './pages/Feed';
import New from './pages/New';

export default function Routes(){
    return(
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/" exact component={Feed} />
                <Route path="/new" component={New} />
            </Switch>
        </BrowserRouter>
    );
}