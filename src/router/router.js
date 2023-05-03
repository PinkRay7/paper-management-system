import { createRouter, createWebHashHistory } from 'vue-router'

import Main from '@/views/Main.vue'
import Home from '@/views/Home.vue'
import GroupList from '@/views/Group/GroupList.vue';
import Notification from '@/views/Notification/Notification.vue'
// import Login from '@/views/Login.vue'
// import Register from '@/views/Register.vue'

const routes = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login,
  //   meta: { 
  //     isAdmin: false,
  //     isLogin: false
  //   }
  // },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: Register,
  //   meta: {
  //     isAdmin: false,
  //     isLogin: false
  //   }
  // },
  // { 
  //   path: '/admin-login',
  //   component: Login,
  //   meta: { 
  //     isAdmin: true,
  //     isLogin: false
  //   }
  // },
  {
    path: '/',
    name: 'Main',
    component: Main,
    // redirect: '/login',
    // meta: {
    //   isLogin: true
    // },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/group',
        name: 'Group',
        component: GroupList
      },
      {
        path: '/notification',
        name: 'Notification',
        component: Notification
      },
      // { path: '', redirect: 'dashboard' },
      // { path: 'dashboard', component: Dashboard },
      // { path: 'profile', component: UserProfile },
      // { path: 'admin-dashboard', component: AdminDashboard, meta: { isAdmin: true } },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const originalPush = router.push
router.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
