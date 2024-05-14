if (process.env.NODE_ENV === 'production') {
  console.log('test prod');
  module.exports = {
    plugins: [
      require('autoprefixer'),
      require("postcss-preset-env")
    ]
  };
} else {
  module.exports = {
    plugins: [
      require("postcss-preset-env")
    ]
  };
}
