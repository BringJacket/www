import urljoin from 'url-join';

function canBeFoundAt(name) {
  const domain = 'http://' + name + '.' + baseDomain();
  return (function(/* url parts */) {
    const args = Array.prototype.slice.call(arguments);
    args.unshift(domain);
    return urljoin.apply(this, args)
  });
}

function baseDomain() {
  if (typeof window != 'undefined') {
    const parts = window.location.host.split('.');
    parts.shift();
    return parts.join('.');
  } else {
    return process.env.SERVER_BASE_DOMAIN;
  }
}

const Env = {
  urlFor: {
    content: canBeFoundAt('api'),
    auth: canBeFoundAt('auth'),
    user: canBeFoundAt
  }
}

export default Env;
