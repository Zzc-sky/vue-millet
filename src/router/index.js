import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: () => import('views/home/Home')
        },
        {
            path: '/product/:id',
            component: () => import('views/product/Product')
        },
        {
            path: '/login',
            component: () => import('views/login/Login')
        },
        {
            path: '/register',
            component: () => import('views/register/Register')
        },
        {
            path: '/detail/:id',
            component: () => import('views/detail/Detail')
        },
        {
            path: '/cart',
            component: () => import('views/cart/Cart')
        },
        {
            path: '/order',
            component: () => import('views/order/Order'),
            children: [
                {
                    path: 'confirm',
                    component: () => import('views/order/children/OrderConfirm')
                },
                {
                    path: 'pay',
                    component: () => import('views/order/children/OrderPay')
                },
                {
                    path: 'list',
                    component: () => import('views/order/children/OrderList')
                },
                {
                    path: 'alipay',
                    component: () => import('views/order/children/alipay')
                }
            ]
        }
    ],
})

export default router
