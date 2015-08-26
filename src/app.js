/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel/polyfill';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import dispatcher from './core/dispatcher';
import router from './router';
import Location from './core/Location';
import ActionTypes from './constants/ActionTypes';

const context = {
  onSetTitle: value => document.title = value,
  onSetMeta: (name, content) => {
    // Remove and create a new <meta /> tag in order to make it work
    // with bookmarks in Safari
    let elements = document.getElementsByTagName('meta');
    [].slice.call(elements).forEach((element) => {
      if (element.getAttribute('name') === name) {
        element.parentNode.removeChild(element);
      }
    });
    let meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document.getElementsByTagName('head')[0].appendChild(meta);
  }
};

function run() {
  router.dispatch({ path: window.location.pathname, context }, (_, component) => {
    render(component);
  });

  dispatcher.register(action => {
    if (action.type === ActionTypes.CHANGE_LOCATION) {
      router.dispatch({ path: action.path, context }, (_, component) => {
        render(component);
      });
    }
  });

  Location.listen(async(location) => {
    const state = { path: location.pathname, query: location.query, context };
    await router.dispatch(state, (_, component) => {
      render(component);
    });
  });
}

function render (component) {
  const container = document.getElementById('app');
  ReactDOM.render(component, container, () => {
    let css = document.getElementById('css');
    css.parentNode.removeChild(css);
  });
}

function handlePopState(event) {
  Location.pushState({ replace: !!event.state }, window.location.pathname);
}

// Run the application when both DOM is ready
// and page content is loaded
new Promise(resolve => {
  if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', resolve);
    window.addEventListener('popstate', handlePopState);
  } else {
    window.attachEvent('onload', resolve);
    window.attachEvent('popstate', handlePopState);
  }
}).then(() => FastClick.attach(document.body)).then(run);
