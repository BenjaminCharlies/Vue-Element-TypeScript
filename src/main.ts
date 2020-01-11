import Vue from 'vue'
import 'whatwg-fetch'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'

import '@/styles/element-variables.scss'
import '@/styles/index.scss'

import router from '@/router'
import App from '@/App.vue'
import store from '@/store'
import '@/icons/components'
import '@/permission'

Vue.use(require('vue-moment'))
Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
