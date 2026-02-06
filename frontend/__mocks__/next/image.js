const React = require('react');

const NextImage = ({ src, alt, width, height, ...rest }) => {
  const resolvedSrc = typeof src === 'string' ? src : (src && src.src) || '';
  return React.createElement('img', { src: resolvedSrc, alt: alt || '', width, height, ...rest });
};

module.exports = NextImage;
