/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-routing/src/Router';
import http from './core/http';
import env from './core/env';
import Location from './core/Location';
import App from './components/App';
import HomePage from './components/HomePage';
import PostPage from './components/PostPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

const router = new Router(on => {

  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/', async () => <HomePage />);

  on('/posts/:postId', async (state) => {
    const url = env.urlFor.content('posts', state.params.postId);
    const post = await http.get(url);
    return post && <PostPage post={post} />;
  });

  on('/login', async () => <LoginPage />);

  on('/register', async () => <RegisterPage />);

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>);

});

Location.listen(async(loc) => {
  const component = await router.dispatch(loc.pathname);
  if (component === undefined) {
    console.error("Router returned undefined for", loc.pathname)
  } else {
    ReactDOM.render(component, document.body);
  }
});

export default router;
