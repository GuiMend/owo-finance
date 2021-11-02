const path = require('path')
const toPath = (filePath) => path.join(process.cwd(), filePath)

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@react-theming/storybook-addon',
  ],
  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@emotion/core': toPath('node_modules/@emotion/react'),
        'emotion-theming': toPath('node_modules/@emotion/react'),
        apollo: toPath('src/apollo'),
        assets: toPath('src/assets'),
        components: toPath('src/components'),
        configs: toPath('src/configs'),
        context: toPath('src/context'),
        hooks: toPath('src/hooks'),
        lib: toPath('src/lib'),
        pages: toPath('src/pages'),
        style: toPath('src/style'),
        theme: toPath('src/theme'),
        utils: toPath('src/utils'),
      },
    },
  }),
}
