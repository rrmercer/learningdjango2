'use strict'
import React, { Component } from 'react';
import {render} from 'react-dom';

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return <section>You liked this.</section>;
    }

    return (<button onClick={ () => this.setState({ liked: true }) }>Like</button>);
  }
}

class ContactInfo extends Component {
    render() {
        return (
            <section>
                <form action="/users">
                <p>
                    <label>
                      First Name:
                      <input type="text" name="firstName" />
                    </label>
                </p>
                <p>
                    <label>
                      Last Name:
                      <input type="text" name="lastName" />
                    </label>
                </p>
                <input type="submit" value="Submit" />
              </form>
            </section>
        );
    }
}

render(<ContactInfo />, document.getElementById('app'));