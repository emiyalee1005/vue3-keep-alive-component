<template>
  <keep-alive>
    <component :is="isComponent" />
  </keep-alive>
</template>
<script lang="ts" setup>
import { onActivated, onDeactivated, shallowRef, watch } from 'vue'

const props = defineProps<{ component?: any }>()

const isActivated = shallowRef(true)

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
