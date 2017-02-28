const express = require('express');
const path = require('path');
const webpackMiddleWare = require('webpack-dev-middleware');
const webpack = require('webpack');
const walkDir = require('./lib/walk');
const infoDir = require('./lib/info');

const webpackConfig = require('./webpack.config');

const REPO_FOLDER = process.env.REPO_FOLDER;

const app = express();
app.use(webpackMiddleWare(
  webpack(webpackConfig),
  {
    quiet: true,
    publicPath: "/assets/"
  }
))
app.use(express.static(path.join(__dirname, 'public')));
app.get('/data.json', (req, res) => {
  res.json(Object.assign({
    files: walkDir(REPO_FOLDER)
  }, infoDir(REPO_FOLDER)));
});

app.listen(3000);
