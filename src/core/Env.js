import urljoin from 'url-join';

function canBeFoundAt(name) {
  const baseDomain = process.env.SERVER_BASE_DOMAIN || process.env.BASE_DOMAIN;
  const domain = 'http://' + name + '.' + baseDomain;
  return (function(/* url parts */) {
    const args = Array.prototype.slice.call(arguments);
    args.unshift(domain);
    return urljoin.apply(this, args)
  });
}

const Env = {
  urlFor: {
    content: canBeFoundAt('api'),
    auth: canBeFoundAt('auth'),
    user: canBeFoundAt
  }
}

export default Env;
