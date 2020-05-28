const path = require('path');
import { transformScssModulesLoader } from './utils/transformScssModulesLoader'

module.exports = {
  stories: ['../src/**/*.stories.(mdx|tsx|ts|jsx|js)'],
  addons: [
    {
      name: '@storybook/preset-create-react-app',
      options: {
        tsDocgenLoaderOptions: {
          tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
          shouldExtractLiteralValuesFromEnum: true,
          propFilter: (prop: any) => {
            // Currently not working, prop.parent is always null.
            if (prop.parent) {
              return !prop.parent.fileName.includes('node_modules/@types/react/');
            }

            return true;
          },
        },
      },
    },
    '@storybook/addon-docs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
  ],
  webpackFinal: async (config: any, { configType }: any) => {
    // so that we don't have to include the extension in import paths; do we really want this?
    config.resolve.extensions.push('.scss')
    
    // overwrite the css-loader for files like *modules.scss
    const {i, j, newUseArray} = transformScssModulesLoader(config)
    config.module.rules[i].oneOf[j].use = newUseArray

    return config;
  }
};
