import Location from '../core/Location';

const redirect = function (status, url) {
  if (url === undefined) url = status;

  Location.pushState(null, url);
};

export default redirect;
