const execSync = require('child_process').execSync;
const Convert = require('ansi-to-html');
const escape = require('escape-html');
const convert = new Convert();
const glob = require('glob');
const fs = require('fs');
const looseFiles = require('./looseFiles');

const info = dir => {
  const files = looseFiles(dir);
  const exec = (cmd) => {
    try {
      return convert.toHtml(escape(execSync(cmd, {
        cwd: dir
      }).toString()));
    } catch (e) {
      return e.message;
    }
  }

  const srcTree = exec(`tree -C .`);
  const gitTree = exec(`tree -C -a .git`);
  const HEAD = exec('cat .git/HEAD');
  const config = exec('cat .git/config');
  const branch = exec(`git branch --color`);
  const log = exec(`git log --color --pretty=oneline .`);
  const version = exec(`git --version`);

  const refs = glob.sync('.git/refs/**/*', {
    cwd: dir,
    nodir: true,
    absolute: true
  }).map(i => ({
    content: fs.readFileSync(i).toString().trim(),
    path: i
  }));

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
    version,
    files
  };
}

module.exports = info;
