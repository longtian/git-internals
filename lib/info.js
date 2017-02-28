const execSync = require('child_process').execSync;
const Convert = require('ansi-to-html');
const escape = require('escape-html');
const convert = new Convert();
const refsDir = require('./refs')

const info = path => {
  const exec = (cmd) => {
    return convert.toHtml(escape(execSync(cmd, {
      cwd: path
    }).toString()));
  }

  const srcTree = exec(`tree -C .`);
  const gitTree = exec(`tree -C -a .git`);
  const HEAD = exec('cat .git/HEAD');
  const config = exec('cat .git/config');
  const refs = refsDir(path);
  const branch = exec(`git branch --color`);
  const log = exec(`git log --color --pretty=oneline .`);
  return {
    srcTree,
    gitTree,
    log,
    refs,
    HEAD,
    config,
    branch
  };
}

module.exports = info;
