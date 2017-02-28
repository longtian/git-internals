const glob = require('glob');
const path = require('path');
const fs = require('fs');

const refs = p => {
  return glob.sync('.git/refs/**/*', {
    cwd: p,
    nodir: true,
    absolute: true
  }).map(i => ({
    content: fs.readFileSync(i).toString().trim(),
    path: i
  }));
}

module.exports = refs;
