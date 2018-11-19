const path = require('path');

const aliasPath = {
  '@/components': path.resolve(__dirname, 'src', 'components'),
  '@/middleware': path.resolve(__dirname, 'src', 'middleware'),
  '@/services': path.resolve(__dirname, 'src', 'services'),
  '@/utils': path.resolve(__dirname, 'src', 'utils'),
  '@/config': path.resolve(__dirname, 'src', 'config'),
  '@/__mocks__': path.resolve(__dirname, '__mocks__'),
  '@/': path.resolve(__dirname, 'src'),
};

module.exports = {
  plugins: [],
  resolve: {
    alias: { ...aliasPath }, // config for mocha
  },
  webpack: (config, options, webpack) => {
    config.entry.main = path.resolve(__dirname, 'src', 'index.js');
    config.output.path = path.resolve(__dirname, 'dist');
    config.resolve.alias = { ...aliasPath };
    return config;
  },
};
