import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
Vue.use(VueAwesomeSwiper);

import 'bootstrap';
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import router from './router';
import './bus';
import './infotext';
import './infomodal';
import currencyFilter from './filters/currency';
import VueI18n from 'vue-i18n';

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

import App from './App.vue';

Vue.use(VueI18n);

Object.keys(rules).forEach((rule) => {
    extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

configure({
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
    },
});

extend('zhtw_name', (value) => {
    if (!value.match(/[0-9]/gi)) {
        return true;
    }    
    return '無效的姓名';
});

Vue.component('Loading', Loading);

axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.filter('currency', currencyFilter);

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
        axios.post(api).then((response) => {
            if (response.data.success) {
                next();
            } else {
                next({ path: '/' });
            }
        });
    } else {
        next();
    }
});
