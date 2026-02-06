const React = require('react');

function NextLink(props) {
  const { children, href, ...rest } = props;
  return React.createElement('a', { href, ...rest }, children);
}

module.exports = NextLink;
