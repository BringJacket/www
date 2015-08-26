/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import request from 'superagent';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

const http = {

  get: url => new Promise((resolve, reject) => {
    request
      .get(url)
      .timeout(1000)
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  })

};

export default http;
