/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  { text: '标签', link: '/blog/tags/' },
  { text: '归档', link: '/blog/archives/' },
  {
    text: '笔记',
    items: [
      { text: '示例', link: '/demo/README.md' },
      {text:'missing-semester',link:'/note/missing-semester/README.md'},
  ]
  },
  {
    text:'计算机语言',
    items:[
      {text:'C语言',link:'/languages/C/README.md'},
      {text:'C++',link:'/languages/C++/README.md'},
      {text:'Python',link:'/languages/Python/README.md'},
      {text:'Java',link:'/languages/Java/README.md'},
    ]
  }
])
