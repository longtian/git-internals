const express = require('express');
const path = require('path');
const webpackMiddleWare = require('webpack-dev-middleware');
const webpack = require('webpack');
const infoDir = require('./lib/info');

const webpackConfig = require('./webpack.config');
const REPO_FOLDER = process.env.REPO_FOLDER;

const app = express();

// mount webpack
app.use(webpackMiddleWare(
  webpack(webpackConfig),
  {
    quiet: true,
    publicPath: "/assets/"
  }
));

// static file
app.use(express.static(path.join(__dirname, 'public')));

// data.json
app.get('/info.json', (req, res) => {
  res.json(infoDir(REPO_FOLDER));
});

app.listen(3000);
