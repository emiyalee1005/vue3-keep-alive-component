import KeepAliveComponentPlugin from './components/KeepAliveComponent/index'
import KeepAliveComponent from './components/KeepAliveComponent/KeepAliveComponent.vue'
import { useActivatedRoute } from './libs/helper'
import type { App } from 'vue'

const install = (app: App) => {
  app.use(KeepAliveComponentPlugin)
}
const Plugin = {
  install
}

export { KeepAliveComponent, useActivatedRoute }

export default Plugin
