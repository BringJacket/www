/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-routing/src/Router';
import HttpClient from './core/HttpClient';
import Env from './core/Env';
import Redirect from './utils/Redirect';
import App from './components/App';
import HomePage from './components/HomePage';
import PostPage from './components/PostPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

const router = new Router(on => {

  on('*', async (state, next) => {
    state.host = state.host || window.location.host;
    state.user = state.host.split('.' + process.env.BASE_DOMAIN)[0];
    state.redirect = state.redirect || Redirect;

    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/', async () => <HomePage />);

  on('/posts/:postId', async (state) => {
    const url = Env.urlFor.content('posts', state.params.postId);
    const post = await HttpClient.get(url);
    if (state.user != post.user) {
      const url = '//' + post.user + '.' + process.env.BASE_DOMAIN + state.path;
      console.log('Redirect to', url);
    }
    return post && <PostPage post={post} />;
  });

  on('/login', async () => <LoginPage />);

  on('/register', async () => <RegisterPage />);

  on('error', (state, error) => {
    switch(state.statusCode) {
      case 404:
        return <App context={state.context} error={error}><NotFoundPage /></App>;
      default:
        return <App context={state.context} error={error}><ErrorPage /></App>;
    }
  });

});

export default router;
