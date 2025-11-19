import type { RouteParamsRaw } from 'vue-router'
import type { Router } from 'vue-router'
import { RouteName } from '@/utils/type/enum.type'

export const navigate = (router: Router, name: RouteName, params?: RouteParamsRaw) => {
  try {
    router.push({ name, params })
  } catch (error) {
    console.error('Navigation error:', error)
  }
}
