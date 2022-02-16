/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: 'src',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildTarget: 'node-cjs',
  devServerPort: 3001,
  ignoredRouteFiles: ['.*'],
};
