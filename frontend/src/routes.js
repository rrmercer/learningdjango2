import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import App from './App.js';
import BoardIndex from './BoardIndex';
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
                <Route path="/board/:id" component= {BoardIndex} />
                <Route path="/" component={App} />
            </Switch>
        </div>
        </main>
        </Router>
);
