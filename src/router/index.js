import Vue from 'vue'
import Router from 'vue-router'
import login from './../components/login'
import homeAdmin from './../components/homeAdmin'
import homeUser from './../components/homeUser'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: login
        },
        {
            path: '/admin/home',
            component: homeAdmin
        },
        {
            path: '/client/home',
            component: homeUser
        },
        
    ]
})