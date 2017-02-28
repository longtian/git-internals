module.exports = {
  entry: './src/index.js',
  output: {
    path: "/",
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.png/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: 'assets/'
            }
          }
        ]
      }
    ]
  }
};
