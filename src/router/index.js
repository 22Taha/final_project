import Vue from 'vue'
import Router from 'vue-router'
import login from './../components/login'

import adminHome from './../components/Admin/home'
import adminProducts from './../components/Admin/products'
import adminOrders from './../components/Admin/orders'
import adminUsers from './../components/Admin/users'

import clientHome from './../components/Client/home'
import clientProducts from './../components/Client/products'
import clientOrders from './../components/Client/orders'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/admin/home',
            name: 'adminHome',
            component: adminHome,
            children: [
                {
                    path: '/admin/products',
                    name: 'adminProducts',
                    component: adminProducts
                },
                {
                    path: '/admin/orders',
                    name: 'adminOrders',
                    component: adminOrders
                },
                {
                    path: '/admin/users',
                    name: 'adminUsers',
                    component: adminUsers
                }
            ]
        },
        {
            path: '/client/home',
            name: 'clientHome',
            component: clientHome,
           
            children: [
                {
                    path: '/client/products',
                    name: 'clientProducts',
                    component: clientProducts,
                },
                {
                    path: '/client/orders',
                    name: 'clientOrders',
                    component: clientOrders
                }
            ]
        }
    ]
})