import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/entities',
    name: 'entities',
    component: () => import('@/views/entities/EntitiesView.vue')
  },
  {
    path: '/indicators',
    name: 'indicators',
    component: () => import('@/views/indicators/ERFIManagementView.vue')
  },
  {
    path: '/indicators/rrf',
    name: 'rrf-indicators',
    component: () => import('@/views/indicators/RRFManagementView.vue')
  },
  {
    path: '/indicators/report',
    name: 'report-indicators',
    component: () => import('@/views/indicators/ReportIndicatorsView.vue')
  },
  {
    path: '/reporting/timelines',
    name: 'reporting-timelines',
    component: () => import('@/views/reporting/ReportingTimelinesView.vue')
  },
  {
    path: '/reports/status',
    name: 'report-status',
    component: () => import('@/views/reports/ReportStatusView.vue')
  },
  {
    path: '/reports/review',
    name: 'report-review',
    component: () => import('@/views/reports/ReportReviewView.vue')
  },
  {
    path: '/reports/history',
    name: 'report-history',
    component: () => import('@/views/reports/ReportHistoryView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router