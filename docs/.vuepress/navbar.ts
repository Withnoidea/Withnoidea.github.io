/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/', icon: 'material-symbols:home'},
  { text: '博客', link: '/blog/', icon: 'material-symbols:note-stack'},
  { text: '标签', link: '/blog/tags/', icon: 'ri:price-tag-3-fill' },
  { text: '归档', link: '/blog/archives/', icon:'material-symbols:drive-file-move' },
  {
    text: '笔记', 
    items: [
      { text: '示例', link: '/demo/README.md' },
      {text:'missing-semester',link:'/note/missing-semester/README.md'},
    ],
    icon: 'material-symbols:stylus-note-rounded'
  },
    {
    text: '日记',
    items: [
      { text: '日记', link: '/diary/README.md' },
  ],
  icon: 'material-symbols:date-range'
  },
  {
    text:'计算机语言',
    items:[
      {text:'C',link:'/languages/C/README.md'},
      {text:'C++',link:'/languages/C++/README.md'},
      {text:'Python',link:'/languages/Python/README.md'},
      {text:'Java',link:'/languages/Java/README.md'},
      {text:'C#',link:'/languages/index/README.md'},
    ],
    icon:'material-symbols:code-blocks'
  }
])
