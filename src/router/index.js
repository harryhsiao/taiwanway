import Vue from 'vue';
import Router from 'vue-router';

import Homepage from '@/components/Homepage';
import Menu from '@/components/page/front_end/Menu';
import Shop from '@/components/page/front_end/Shop';

import Login from '@/components/page/Login';

import Dashboard from '@/components/page/back_end/Dashboard';
import Products from '@/components/page/back_end/Products';
import Orders from '@/components/page/back_end/Orders';
import Coupon from '@/components/page/back_end/Coupon';

import Cart from '@/components/page/front_end/shopping/Cart';
import Product from '@/components/page/front_end/shopping/Product';

import Checkpage from '@/components/page/front_end/settle_accounts/Checkpage';
import Addcart from '@/components/page/front_end/settle_accounts/Addcart';
import Custinfo from '@/components/page/front_end/settle_accounts/Custinfo';
import Custcheckout from '@/components/page/front_end/settle_accounts/Custcheckout';
import Checkcomp from '@/components/page/front_end/settle_accounts/Checkcomp';

Vue.use(Router);

export default new Router({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: '/',
            name: 'Homepage',
            component: Homepage,
        },
        {
            path: '/Menu',
            name: 'Menu',
            component: Menu,
        },
        {
            path: '/Cart',
            name: 'Cart',
            component: Cart,
        },
        {
            path: '/Addcart',
            name: 'Addcart',
            component: Addcart,
        },
        {
            path: '/Shop',
            name: 'Shop',
            component: Shop,
        },
        {
            path: '/Product/:productId',
            name: 'Product',
            component: Product,
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login,
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
                    component: Products,
                },
                {
                    path: 'Orders',
                    name: 'Orders',
                    component: Orders,
                },
                {
                    path: 'Coupon',
                    name: 'Coupon',
                    component: Coupon,
                },
            ],
        },
        {
            path: '/Checkpage',
            name: 'Checkpage',
            component: Checkpage,
            children: [
                {
                    path: 'Custinfo',
                    name: 'Custinfo',
                    component: Custinfo,
                },
                {
                    path: 'Custcheckout',
                    name: 'Custcheckout',
                    component: Custcheckout,
                },
                {
                    path: 'Checkcomp/:order_id',
                    name: 'Checkcomp',
                    component: Checkcomp,
                },
            ],
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});
