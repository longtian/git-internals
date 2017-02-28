const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const util = require('util');
const glob = require('glob');

/**
 *
 * @param {string} dir 仓库目录的绝对地址
 *
 * @return {object} 仓库信息
 */
const getAllLooseFiles = dir => {

  const objects = glob.sync('.git/objects/**/*', {
    cwd: dir,
    nodir: true,
    ignore: ['**/pack/**', '**/info/**']
  }).map(item => ({
    id: item.slice(-41).replace('/', ''),
    path: path.join(dir, item)
  }));

  const catFile = (type, id) => execSync(`git cat-file -${type} ${id}`, {
    cwd: dir
  }).toString();

  const result = objects.map(({ id, path }) => Object.assign({
    id,
    type: catFile('t', id),
    content: catFile('p', id),
    contentSize: catFile('s', id),
    contentLength: catFile('p', id).length,
    stat: fs.statSync(path),
    path
  }));

  return result;
}

module.exports = getAllLooseFiles;
