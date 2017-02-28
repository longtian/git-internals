const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const util = require('util');

const getAllLooseFiles = dir => {
  const objects = [].concat(...
    fs
      .readdirSync(path.join(dir, '.git/objects'))
      .filter(i => i.length === 2)
      .map(p => fs.readdirSync(path.join(dir, '.git/objects', p)).map(l38 => ({
        id: p + l38,
        path: path.join(dir, '.git/objects', p, l38)
      }))));

  const catFile = (type, id) => execSync(`git cat-file -${type} ${id}`, {
    cwd: dir
  }).toString();

  const status = path => {

    const statusData = fs.statSync(path);
    return {
      atime: +new Date(statusData.atime),
      ctime: +new Date(statusData.ctime),
      mtime: +new Date(statusData.mtime),
      size: statusData.size
    }
  }

  const result = objects.map(({ id, path }) => Object.assign({
    id,
    type: catFile('t', id).trim(),
    content: catFile('p', id),
    contentSize: catFile('s', id),
    contentLength: catFile('p', id).length,
    path
  }, status(path)));

  return result;
}

module.exports = getAllLooseFiles;
