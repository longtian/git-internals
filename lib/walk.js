const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const util = require('util');

const PATH = '/tmp/zipp';

const log = obj => console.log(util.inspect(obj, {
  colors: true,
  depth: 10
}));

// [ '24260a00dfb2b93a879a91e7c6a2e75e588a83e2',
// '36b30ed7b5125bc37f8202a2f2cb607ffac6dbd0',
// 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391' ]
const objects = [].concat(...
  fs
    .readdirSync(path.join(PATH, '.git/objects'))
    .filter(i => i.length === 2)
    .map(p => fs.readdirSync(path.join(PATH, '.git/objects', p)).map(l38 => p + l38)));


const catFile = (type, id) => execSync(`git cat-file -${type} ${id}`, {
  cwd: PATH
}).toString();


const result = objects.map(id => ({
  id,
  type: catFile('t', id).trim(),
  content: catFile('p', id)
}));

log(result);
