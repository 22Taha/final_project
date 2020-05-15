import Vue from 'vue'
import Router from 'vue-router'
import login from './../components/login'
import home from './../components/home'
import products from './../components/products'
import orders from './../components/orders'
import users from './../components/users'

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
            path: '/:user/home',
            name: 'home',
            component: home,
            children: [
                {
                    path: '/:user/products',
                    name: 'products',
                    component: products
                },
                {
                    path: '/:user/orders',
                    name: 'orders',
                    component: orders
                },
                {
                    path: '/:user/users',
                    name: 'users',
                    component: users
                },
            ]
        },
        
       
        
    ]
})