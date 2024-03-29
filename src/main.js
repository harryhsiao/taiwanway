import Vue from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import 'bootstrap'
import {
  ValidationObserver, ValidationProvider, extend, localize, configure
} from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import router from './router'

import './bus/bus'
import './bus/infotext'
import './bus/infomodal'

import currencyFilter from './filters/currency'
import VueI18n from '../node_modules/vue-i18n'

import 'aos/dist/aos.css'
import AOS from '../node_modules/aos'

import App from './App.vue'

Vue.use(VueAwesomeSwiper)
AOS.init()

Vue.use(VueI18n)

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

localize('zh_TW', TW)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

extend('zhtw_name', (value) => {
  if (!value.match(/[0-9]/gi)) {
    return true
  }
  return '無效的姓名'
})

// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Loading', Loading)

axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.filter('currency', currencyFilter)

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  let process
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      if (response.data.success) {
        next()
      } else {
        next({ path: '/' })
      }
    })
  } else {
    next()
  }
})
