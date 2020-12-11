import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import APlayer from '@moefe/vue-aplayer'

router.beforeEach((to,from,next)=>{
  nprogress.start();
  next();
})

router.afterEach((to,from)=>{
  nprogress.done();
})

Vue.use(ElementUI)

Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
