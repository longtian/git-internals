const execSync = require('child_process').execSync;
const Convert = require('ansi-to-html');
const escape = require('escape-html');
const convert = new Convert();
const refsDir = require('./refs')
const glob = require('glob');
const fs = require('fs');

const info = dir => {
  const exec = (cmd) => {
    return convert.toHtml(escape(execSync(cmd, {
      cwd: dir
    }).toString()));
  }

  const srcTree = exec(`tree -C .`);
  const gitTree = exec(`tree -C -a .git`);
  const HEAD = exec('cat .git/HEAD');
  const config = exec('cat .git/config');
  const refs = refsDir(dir);
  const branch = exec(`git branch --color`);
  const log = exec(`git log --color --pretty=oneline .`);
  const version = exec(`git --version`);

  const packs = glob.sync('.git/objects/pack/*.idx', {
    cwd: dir,
    nodir: true,
    absolute: true
  }).map(p => ({
    path: p,
    content: exec(`git verify-pack -v ${p}`)
  }))

  return {
    srcTree,
    gitTree,
    log,
    refs,
    HEAD,
    config,
    branch,
    packs,
    version
  };
}

module.exports = info;

// console.log(info('/tmp/z').packs);
