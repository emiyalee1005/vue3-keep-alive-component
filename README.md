# Vue 3 Keep Alive Component

A workaround solution for vue3 router&keep-alive components issue [keep-alive component in nested route result in child route mounted twice](https://github.com/vuejs/router/issues/626)

## Installation

```bash
npm i vue3-keep-alive-component -S
```

## Usage

#### Keep Router Alive

```html

<template>
   <router-view v-slot="{ Component }">
      <KeepAliveComponent :component="Component" />
   </router-view>
</template>
<script lang="ts" setup>
   import { KeepAliveComponent } from 'vue3-keep-alive-component'
</script>
<style></style>

```

### Use Activated Route

When using <KeepAliveComponent/> and useRoute() together, there will be problem. In this case, use useActivatedRoute() instead.

```js
import { useActivatedRoute } from 'vue3-keep-alive-component'

const activatedRoute = useActivatedRoute() // a replacement api for official api useRoute()
```



## Building

* Clone this repo
* Make sure you have node-js `>=18.16` and [pnpm](https://pnpm.io/) `>=8.x` pre-installed
* Install dependencies `npm install`
* Run webpack dev server `npm run build`

## Testing

* This package is using [Jest](https://github.com/facebook/jest)
  and [vue-test-utils](https://github.com/vuejs/test-utils) for testing.
* Execute tests with this command `npm test`

## License

[MIT](LICENSE.txt) License
