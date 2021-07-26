import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/vocano-ui',
  publicPath: '/vocano-ui/',
  title: 'Vocano',
  favicon: 'http://static.yidianzixun.com/img/faviconred.ico',
  logo: 'https://static.yidianzixun.com/modules/build/download/images/pc_banner_logo_x1-edf31fe9.png',
  outputPath: 'docs-dist',
  mode: 'site',
  sass: {
    implementation: require('node-sass'),
    sassOptions: {},
  },
  exportStatic: {},
  // more config: https://d.umijs.org/config
});
