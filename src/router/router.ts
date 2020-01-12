import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import { fetchInterceptor } from '../api-client/fetch-interceptor'
Vue.use(Router)

/*
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/
export default new Router({
  // mode: 'history',  // Enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
      meta: { hidden: true }
    },
    {
      path: '/404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
      meta: { hidden: true }
    },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
          meta: {
            title: 'Dashboard',
            icon: 'dashboard'
          }
        }
      ]
    },
    {
      path: '/session',
      component: Layout,
      redirect: '/session/list',
      meta: {
        title: 'Session',
        icon: 'form',
        alwaysShow: true
      },
      children: [
        {
          path: 'list',
          name: 'sessionList',
          component: () => import(/* webpackChunkName: "session" */ '@/views/session/index.vue'),
          meta: {
            title: 'SessionList'
          }
        },
        {
          path: 'create',
          name: 'createSession',
          component: () => import('@/views/session/create.vue'),
          meta: {
            title: 'CreateSession',
            activeMenu: '/session/list',
            hidden: true
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/404',
      meta: { hidden: true }
    }
  ]
})

// Request interceptors
fetchInterceptor.interceptors.push(
  {
    request: (input: string, init: RequestInit) => {
      let headers = new Headers(init.headers)
      headers.append('App-Lang', 'en')
      init.headers = headers
      return { input, init }
    }
  },
  {
    response: (response: Response) => {
      if (response.status === 401) {
        Message({
          message: 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        MessageBox.confirm(
          'You have been logged out, try to login again.',
          'Log out',
          {
            confirmButtonText: 'Relogin',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          UserModule.ResetToken()
          location.reload() // To prevent bugs from vue-router
        })
      }
      if (response.status === 403) {
        Message({
          message: 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      if (response.status === 412 || response.status === 500) {
        response.text().then(r => {
          let result = JSON.parse(r)
        })
      }
      return response
    }
  }
)
