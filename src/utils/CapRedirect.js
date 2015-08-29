import Location from '../core/Location';

const Redirect = function (status, url) {
  if (url === undefined) url = status;

  Location.pushState(null, url);
};

export default Redirect;
