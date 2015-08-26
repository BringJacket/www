/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './PostPage.css';
import withStyles from '../../decorators/withStyles';
import Link from '../../utils/Link';

@withStyles(styles)
class PostPage {

  static propTypes = {
    post: PropTypes.object.isRequired
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    this.context.onSetTitle(this.props.post.title);
    return (
      <div className="PostPage">
        <div className="PostPage-container">
          <h1>{this.props.post.title}</h1>
          <div dangerouslySetInnerHTML={{__html: this.props.post.body}} />
          <a href="2" onClick={Link.handleClick}>post 2</a>
        </div>
      </div>
    );
  }

}

export default PostPage;
