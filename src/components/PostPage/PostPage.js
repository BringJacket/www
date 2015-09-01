/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './PostPage.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import marked from 'marked';

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
    const nextPost = this.props.post.id % 2 + 1;
    return (
      <div className="PostPage">
        <div className="PostPage-container">
          <h1>{this.props.post.title}</h1>
          <div dangerouslySetInnerHTML={{__html: marked(this.props.post.body)}} />
          <a href={nextPost} onClick={Link.handleClick}>post {nextPost}</a>
        </div>
      </div>
    );
  }

}

export default PostPage;
