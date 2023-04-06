/**
 * 框架扩展
 * 解决在monorepo模式下，无法找到egg的问题
 */

const path = require('path');
const egg = require('egg');
const findup = require('findup-sync');

const EGG_PATH = Symbol.for('egg#eggPath');
const EGG_LOADER = Symbol.for('egg#loader');


const findLernaRoot = () => {
  const file = findup('lerna.json');

  return file && path.dirname(file);
};

class AppWorkerLoader extends egg.AppWorkerLoader {
  getEggPaths() {
    const result = super.getEggPaths();
    const monorepoRoot = findLernaRoot();
    if (monorepoRoot) {
      result.push(monorepoRoot);
    }

    return result;
  }
}

class AgentWorkerLoader extends egg.AgentWorkerLoader {
  getEggPaths() {
    const result = super.getEggPaths();
    const monorepoRoot = findLernaRoot();
    if (monorepoRoot) {
      result.push(monorepoRoot);
    }

    return result;
  }
}

class Application extends egg.Application {
  get [EGG_PATH]() {
    // 返回 framework 路径
    return path.dirname(__dirname);
  }
  get [EGG_LOADER]() {
    return AppWorkerLoader;
  }
}

class Agent extends egg.Agent {
  get [EGG_PATH]() {
    return path.dirname(__dirname);
  }
  get [EGG_LOADER]() {
    return AgentWorkerLoader;
  }
}

// 覆盖了 Egg 的 Application
module.exports = Object.assign(egg, {
  Application,
  Agent,
});