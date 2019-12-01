import './css/reset.css'
import './css/base.css'

import Vue from 'vue'
import App from './App.vue'

import bus from './bus'

Vue.config.productionTip = false
Vue.prototype.$bus = bus

if (window.utools) {
  utools.onPluginReady(() => {
    console.log('插件初始化完成')
    new Vue({
      render: h => h(App),
    }).$mount('#app')
  })
} else {
  console.log('插件初始化完成')
  new Vue({
    render: h => h(App),
  }).$mount('#app')
}
