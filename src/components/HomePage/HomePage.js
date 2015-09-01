/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './HomePage.css';
import Link from '../Link';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class HomePage {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    let title = 'Bring Jacket';
    this.context.onSetTitle(title);
    return (
      <div className="HomePage">
        <div className="HomePage-container">
          <h1>{title}</h1>
          <p>Hello :) <a onclick={Link.handleClick} href="/posts/1">Post 1</a></p>
        </div>
      </div>
    );
  }

}

export default HomePage;
