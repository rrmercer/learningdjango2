import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import App from './App.js';
import AddBoard from './AddBoard';
import BoardIndex from './BoardIndex';
import Cards from './Cards';
import { Component } from 'react';


export default (
<Router>
  <main>
       <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>

        </nav>
            <Switch>
                <Route path="/board/add">
                    <AddBoard />
                </Route>
                <Route path="/board/:id" component= {BoardIndex} />
                <Route path="/cards" component={Cards} />
                <Route path="/" component={App} />
            </Switch>
        </div>
        </main>
        </Router>
);
