import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import App from './App.js';
import Board from './Board';
import Users from './Users';
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
            <li>
              <Link to="/board">Add a new board</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>

        </nav>
            <Switch>
                <Route path="/board">
                    <Board />
                </Route>
                <Route path="/users" component={Users} />
                <Route path="/" component={App} />
            </Switch>
                      </div>
        </main>
        </Router>
);
