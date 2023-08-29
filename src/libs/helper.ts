import { onActivated, onDeactivated, shallowRef, watch } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRoute } from 'vue-router'

function forkCurrentRoute(currentRoute: RouteLocationNormalizedLoaded) {
  const fork: RouteLocationNormalizedLoaded = {} as any
  fork.name = currentRoute.name
  fork.hash = currentRoute.hash
  fork.path = currentRoute.path
  fork.fullPath = currentRoute.fullPath
  fork.params = currentRoute.params
  fork.matched = currentRoute.matched
  fork.meta = currentRoute.meta
  fork.query = currentRoute.query
  fork.redirectedFrom = currentRoute.redirectedFrom
  return fork
}

export function useActivatedRoute() {
  const currentRoute = useRoute()
  const isActivated = shallowRef(true)
  const rawRoute = shallowRef<RouteLocationNormalizedLoaded>(forkCurrentRoute(currentRoute))
  const currentRouteInfo = shallowRef<RouteLocationNormalizedLoaded>(forkCurrentRoute(currentRoute))

  watch(
    () => {
      return JSON.stringify({
        query: rawRoute.value.query,
        meta: rawRoute.value.meta || {},
        name: rawRoute.value.name || '',
        path: rawRoute.value.path,
        hash: rawRoute.value.hash,
        fullPath: rawRoute.value.fullPath,
        params: rawRoute.value.params
      })
    },
    () => {
      currentRouteInfo.value = { ...rawRoute.value }
    },
    {
      immediate: false,
      deep: false
    }
  )

  watch(
    currentRoute,
    () => {
      const fork = forkCurrentRoute(currentRoute)

      setTimeout(() => {
        setTimeout(() => {
          if (isActivated.value) {
            rawRoute.value = fork
          }
        })
      })
    },
    { immediate: false }
  )

  onActivated(() => {
    isActivated.value = true
    rawRoute.value = forkCurrentRoute(currentRoute)
  })

  onDeactivated(() => {
    isActivated.value = false
  })

  return currentRouteInfo
}
