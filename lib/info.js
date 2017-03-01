const execSync = require('child_process').execSync;
const Convert = require('ansi-to-html');
const escape = require('escape-html');
const convert = new Convert();
const glob = require('glob');
const fs = require('fs');
const looseFiles = require('./looseFiles');
const path = require('path');

const info = dir => {

  /**
   * 返回命令执行的结果并把 ansi 色彩转成对应的 HTML
   */
  const exec = (cmd) => {
    try {
      return convert.toHtml(escape(execSync(cmd, {
        cwd: dir
      }).toString()));
    } catch (e) {
      return e.message;
    }
  }

  const branch = exec(`git branch -v --no-abbrev --color`);
  const config = exec('cat .git/config');
  const files = looseFiles(dir);
  const gitTree = exec(`tree -C -a ${path.join(dir, '.git')}`);
  const HEAD = exec('cat .git/HEAD');
  const log = exec(`git log --graph --color --pretty=oneline --decorate`);
  const reflog = exec(`git reflog --no-abbrev`);
  const refInfo = exec('cat .git/info/refs');
  const srcTree = exec(`tree -C ${dir}`);
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
  }));

  return {
    branch,
    config,
    files,
    gitTree,
    HEAD,
    log,
    packs,
    refs,
    reflog,
    refInfo,
    srcTree,
    version
  };
}

module.exports = info;
