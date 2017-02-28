const express = require('express');
const path = require('path');
const webpackMiddleWare = require('webpack-dev-middleware');
const webpack = require('webpack');
const walkDir = require('./lib/walk');
const infoDir = require('./lib/info');

const webpackConfig = require('./webpack.config');

const REPO_FOLDER = process.env.REPO_FOLDER || '/tmp/z';

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
  res.json({
    files: walkDir(REPO_FOLDER)
  });
});

app.get('/info.json', (req, res) => {
  res.json(infoDir(REPO_FOLDER));
});

app.listen(3000);
