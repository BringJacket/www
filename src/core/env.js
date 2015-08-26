import urljoin from 'url-join';

function canBeFoundAt(domain) {
  return (function(/* url parts */) {
    var args = Array.prototype.slice.call(arguments)
    args.unshift(domain);
    return urljoin.apply(this, args)
  });
}

const Env = {
  urlFor: {
    content: canBeFoundAt(process.env.CONTENT_SERVER_URL),
    auth: canBeFoundAt(process.env.AUTH_SERVER_URL)
  }
}

export default Env;
