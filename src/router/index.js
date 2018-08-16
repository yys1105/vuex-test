import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
const homeView = () =>
    import ( /* webpackChunkName: "home" */ '../views/Home.vue')
const loginView = () =>
    import ( /* webpackChunkName: "login" */ '../views/loginView.vue')
// 404
const Fview = () =>
    import ( /* webpackChunkName: "fof" */ '../views/fof.vue')

Vue.use(Router)

export default new Router({
    mode: 'hash',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: [

        {
            path: '/',
            name: 'home',
            component: homeView
        },
        {
            path: '/login',
            name: "loginView",
            component: loginView
        },
        {
            path: '*',
            alias: "404",
            name: "fof",
            component: Fview
        }
    ]
})