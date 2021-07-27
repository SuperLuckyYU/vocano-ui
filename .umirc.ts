import { defineConfig, IConfig } from 'dumi';

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
  locales: [['zh-CN', '中文'], ['en-US', 'English']],
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/SuperLuckyYU/vocano-ui.git',
    },
  ],
} as IConfig);
