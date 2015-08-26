/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './PostPage.css';
import withStyles from '../../decorators/withStyles';
import env from '../../core/env';
import http from '../../core/http';

@withStyles(styles)
class PostPage {

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    console.log(env.urlFor.content('posts', this.props.postId))
    this.context.onSetTitle(this.props.title);
    return (
      <div className="PostPage">
        <div className="PostPage-container">
          {
            this.props.path === '/' ? null : <h1>{this.props.title}</h1>
          }
          <div dangerouslySetInnerHTML={{__html: this.props.content || ''}} />
        </div>
      </div>
    );
  }

}

export default PostPage;
