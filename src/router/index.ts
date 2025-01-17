import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'

import RouteViewComponent from '../layouts/RouterBypass.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'dashboard' },
  },
  {
    name: 'home',
    path: '/',
    component: AppLayout,
    redirect: { name: 'dashboard' },
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        meta: {
          requiresAuth: true,
        },
        component: () => import('../pages/home/dashboard/Dashboard.vue'),
      },
      {
        name: 'profile',
        path: 'profile',
        meta: {
          requiresAuth: true,
        },
        component: () => import('../pages/user/UserProfile.vue'),
      },
      {
        name: 'record',
        path: 'record',
        meta: {
          requiresAuth: true,
        },
        component: RouteViewComponent,
        children: [
          {
            name: 'record-list',
            path: 'record-list',
            component: () => import('../pages/dental/GetAllDental.vue'),
          },
          {
            name: 'detail',
            path: 'detail',
            component: () => import('../pages/dental/widget/DetailOption.vue'),
          },
          {
            name: 'create',
            path: 'create',
            component: () => import('../pages/dental/widget/CreateDentalOption.vue'),
          },
        ],
      },
      {
        name: 'dentist',
        path: 'dentist',
        meta: {
          requiresAuth: true,
        },
        component: RouteViewComponent,
        children: [
          {
            name: 'dentist-list',
            path: 'all',
            component: () => import('../pages/dentist/GetAllDentist.vue'),
          },
          {
            name: 'create-dentist',
            path: 'create',
            component: () => import('../pages/dentist/widget/CreateDentist.vue'),
          },
          {
            name: 'update-dentist',
            path: '/update',
            component: () => import('../pages/dentist/widget/UpdateDentist.vue'),
          },
          {
            name: 'delete-dentist',
            path: 'delete',
            component: () => import('../pages/dentist/widget/DeleteDentist.vue'),
            props: true, // Pass route params as props
          },
        ],
      },
      {
        name: 'notifications',
        path: 'notification',
        meta: {
          requiresAuth: true,
        },
        component: () => import('../pages/notification/Notification.vue'),
      },
      {
        name: 'audit logs',
        path: 'audit-logs',
        meta: {
          requiresAuth: true,
        },
        component: () => import('../pages/audit-logs/AuditLogs.vue'),
      },
      {
        name: 'users-management',
        path: 'users-management',
        meta: {
          requiresAuth: true,
        },
        component: () => import('../pages/user/UsersManagement.vue'),
      },
      {
        name: 'permission-management',
        path: 'permission',
        meta: {
          requiresAuth: true,
        },
        component: () => import('../pages/permission/PermissionManagement.vue'),
      },
      {
        name: 'clinic-profile',
        path: 'clinic',
        meta: {
          requiresAuth: true,
        },
        component: () => import('../pages/home/clinic/ClinicProfile.vue'),
      },
      {
        name: 'clinic-profile-management',
        path: 'clinic-management',
        meta: {
          requiresAuth: true,
        },
        component: () => import('../pages/home/clinic/ClinicDashboard.vue'),
      },
      {
        name: 'appointments',
        path: 'appointments',
        meta: {
          requiresAuth: true,
        },
        component: RouteViewComponent,
        children: [
          {
            name: 'appointment-list',
            path: 'appointment-list',
            component: () => import('../pages/appointment/AppointmentList.vue'),
          },
          {
            name: 'appointment-schedule',
            path: 'appointment-schedule',
            component: () => import('../pages/appointment/AppointmentSchedule.vue'),
          },
        ],
      },
    ],
  },

  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        meta: {
          requiresAuth: false,
          requiresCaptcha: true,
        },
        component: () => import('../pages/auth/Login.vue'),
      },
      {
        name: 'signup',
        path: 'signup',
        meta: {
          requiresAuth: false,
          requiresCaptcha: true,
        },
        component: () => import('../pages/auth/Signup.vue'),
      },
      {
        name: 'recover-password',
        path: 'recover-password',
        meta: {
          requiresAuth: false,
          requiresCaptcha: true,
        },
        component: () => import('../pages/auth/RecoverPassword.vue'),
      },
      {
        name: 'confirm-email',
        path: 'confirm-email',
        meta: {
          requiresAuth: false,
        },
        component: () => import('../pages/auth/ConfirmEmail.vue'),
      },
      {
        name: 'recover-password-email',
        path: 'recover-password-email',
        meta: {
          requiresAuth: false,
        },
        component: () => import('../pages/auth/CheckTheEmail.vue'),
      },
      {
        name: 'reset-password',
        path: 'reset-password',
        meta: {
          requiresAuth: false,
          requiresCaptcha: true,
        },
        component: () => import('../pages/auth/ResetPassword.vue'),
      },
      {
        path: '',
        meta: {
          requiresAuth: false,
        },
        redirect: { name: 'login' },
      },
    ],
  },
  {
    name: '404',
    path: '/404',
    component: () => import('../pages/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // For some reason using documentation example doesn't scroll on page navigation.
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      window.scrollTo(0, 0)
    }
  },
  routes,
})

export default router
