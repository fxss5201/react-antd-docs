import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/react-antd-docs',
  publicPath: '/react-antd-docs/',
  analytics: {
    baidu: 'acac39fe248c10911e126712aed731b9'
  },
  styles: [`
    .markdown .dumi-default-source-code pre.prism-code { background-color: #ecf4fa; padding: 1em 1em 1em 3.5em; }
    [data-prefers-color=dark] .markdown .dumi-default-source-code pre.prism-code { background-color: #282c34; }
    .markdown .dumi-default-source-code pre.prism-code .token-line { display: list-item; list-style: decimal; border-left: 1px solid #d8e9f6; padding-left: 1em; }
    [data-prefers-color=dark] .markdown .dumi-default-source-code pre.prism-code .token-line { border-left: 1px solid #222935; }
  `],
  themeConfig: {
    name: 'react-antd',
    nav: [
      { title: '指南', link: '/guide' },
      { title: '配置项', link: '/config' }
    ],
    prefersColor: { default: 'auto' },
    socialLinks: {
      github: 'https://github.com/fxss5201/react-antd',
    },
    footer: `Open-source MIT Licensed | Copyright © 2023-present
    <br />
    Powered by <a href="https://github.com/fxss5201" target="_blank" rel="noreferrer">fxss5201</a>`,
  },
});
