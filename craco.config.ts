import { Configuration, WebpackPluginInstance } from 'webpack'
const { getPlugin, pluginByName } = require('@craco/craco')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()

/**
 * 透過 Webpack Define Plugin 加入額外的 process.env 環境變數
 * @param value 數值物件(數值除 Boolean 和 Number，其餘必須經過 JSON.stringify 轉成字串)
 * @returns Webpack Config
 */
const addDefinePluginEnvValue = (value: object, webpackConfig: Configuration) => {
  // Use webpack plugin name to get matched plugin
  // This name is the plugin's constructor (plugin.constructor.name)
  const { isFound, match: plugin }: { isFound: boolean; match: WebpackPluginInstance } =
    getPlugin(webpackConfig, pluginByName('DefinePlugin'))

  if (isFound) {
    const processEnv = plugin.definitions['process.env'] || {}
    plugin.definitions['process.env'] = {
      ...processEnv,
      ...value
    }
  }
}

const getAppVersionInfo = () => {
  try {
    // use git commit hash as version info
    return `${gitRevisionPlugin.version()}@${gitRevisionPlugin.lastcommitdatetime()}@${Date.now()}`
  } catch (error) {
    return '[NO GIT INFO AS REFERENCE]'
  }
}

module.exports = {
  webpack: {
    configure: (webpackConfig: Configuration, { env, paths }: any) => {
      // 加入 process.env 額外的環境變數
      addDefinePluginEnvValue({
        APP_VERSION: JSON.stringify(getAppVersionInfo())
      }, webpackConfig)

      return webpackConfig
    }
  }
}
