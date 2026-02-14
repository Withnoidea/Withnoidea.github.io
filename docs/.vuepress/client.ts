import { defineClientConfig } from 'vuepress/client'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import Swiper from 'vuepress-theme-plume/features/Swiper.vue'
import './theme/styles/custom.css'
import Custom from './theme/components/Custom.vue'
import AllFriendContent from './theme/components/AllFriendContent.vue'  // 友情链接页面所需组件
import ViewedCount from './theme/components/ViewedCount.vue'  
import GithubHeatmap from './theme/components/GithubHeatmap.vue'  

import './theme/styles/custom.css'

export default defineClientConfig({
  enhance({ app }) {
    app.component('RepoCard', RepoCard)
    app.component('Swiper', Swiper)
    app.component('Custom', Custom)
    app.component('AllFriendContent', AllFriendContent)  
    app.component('ViewedCount', ViewedCount)  
    app.component('GithubHeatmap', GithubHeatmap)  
    // app.component('MyComponent', MyComponent)
    // app.component('CustomComponent', CustomComponent)
  },
})
