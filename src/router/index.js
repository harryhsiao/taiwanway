import Vue from 'vue'
import Router from 'vue-router'

import Homepage from '../components/page/front_end/Homepage.vue'
import Menu from '../components/page/front_end/Menu.vue'
import Shop from '../components/page/front_end/Shop.vue'

import Login from '../components/page/Login.vue'

import Dashboard from '../components/page/back_end/Dashboard.vue'
import Products from '../components/page/back_end/Products.vue'
import Orders from '../components/page/back_end/Orders.vue'
import Coupon from '../components/page/back_end/Coupon.vue'

import Store from '../components/page/front_end/shopping/Store.vue'
import Product from '../components/page/front_end/shopping/Product.vue'

import Checkpage from '../components/page/front_end/settle_accounts/Checkpage.vue'
import Addcart from '../components/page/front_end/settle_accounts/Addcart.vue'
import Custinfo from '../components/page/front_end/settle_accounts/Custinfo.vue'
import Custcheckout from '../components/page/front_end/settle_accounts/Custcheckout.vue'
import Checkcomp from '../components/page/front_end/settle_accounts/Checkcomp.vue'

Vue.use(Router)

export default new Router({
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/Menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/Store',
      name: 'Store',
      component: Store
    },
    {
      path: '/Addcart',
      name: 'Addcart',
      component: Addcart
    },
    {
      path: '/Shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/Product/:productId',
      name: 'Product',
      component: Product
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'Products',
          name: 'Products',
          component: Products
        },
        {
          path: 'Orders',
          name: 'Orders',
          component: Orders
        },
        {
          path: 'Coupon',
          name: 'Coupon',
          component: Coupon
        }
      ]
    },
    {
      path: '/Checkpage',
      name: 'Checkpage',
      component: Checkpage,
      children: [
        {
          path: 'Custinfo',
          name: 'Custinfo',
          component: Custinfo
        },
        {
          path: 'Custcheckout',
          name: 'Custcheckout',
          component: Custcheckout
        },
        {
          path: 'Checkcomp/:order_id',
          name: 'Checkcomp',
          component: Checkcomp
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
