if (process.env.NODE_ENV === 'production') {
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
