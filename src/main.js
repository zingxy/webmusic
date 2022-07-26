import { createApp } from 'vue'
import { createPinia } from 'pinia'
import lazyPlugin from 'vue3-lazy'
import loadingDirective from './components/base/loading/direactive'
import noResultDirective from './components/base/no-result/directive'
import App from './App.vue'
// 引入css
import './assets/index.css'
import router from './router'

/*  */

const app = createApp(App)

app.use(createPinia())
app.use(router)
/* 图片懒加载插件 */
import loadingImg from './assets/images/loading.png'

import errorImg from './assets/images/error.png'

app.use(lazyPlugin, {
    loading: loadingImg,
    error: errorImg,
})
/* 注册指令 */
app.directive('loading', loadingDirective)
app.directive('no-result', noResultDirective)
app.mount('#app')
