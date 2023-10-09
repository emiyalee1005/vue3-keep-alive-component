<template>
  <keep-alive v-bind="keepAliveProps">
    <component :is="isComponent" />
  </keep-alive>
</template>
<script lang="ts" setup>
import { computed, onActivated, onDeactivated, shallowRef, watch } from 'vue'
type MatchPattern = string | RegExp | (string | RegExp)[]

const props = defineProps<{
  component?: any
  include?: MatchPattern
  exclude?: MatchPattern
  max?: number | string
}>()

const isActivated = shallowRef(true)

const keepAliveProps = computed(() => {
  const _props = { ...props }
  delete _props['component']
  return _props
})

onActivated(() => {
  isActivated.value = true
})

onDeactivated(() => {
  isActivated.value = false
})

const isComponent = shallowRef()

watch(
  () => props.component,
  () => {
    setTimeout(() => {
      if (isActivated.value) {
        isComponent.value = props.component
      }
    })
  },
  {
    immediate: true
  }
)
</script>
