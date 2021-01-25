'use strict'
import React, { Component } from 'react';
import {render} from 'react-dom';

import routes from './routes';

//render(App(), document.getElementById('app'));
render(routes, document.getElementById('app'));