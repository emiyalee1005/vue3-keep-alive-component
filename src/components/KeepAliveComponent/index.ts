import KeepAliveComponent from './KeepAliveComponent.vue'
import type { App, Plugin } from 'vue'

const plugin: Plugin = (app: App) => {
  app.component('KeepAliveComponent', KeepAliveComponent)
}

export default plugin
