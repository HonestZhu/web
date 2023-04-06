<template>
  <div class="root">
    <Menu class="menu"></Menu>
    <transition name="fade" mode="out-in">
      <router-view class="content" v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </transition>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import Menu from "./components/Menu.vue";
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

html {
  overflow-x: hidden;
  overflow-y: auto;
}
.root {
  width: 100vw;
  overflow: hidden;
  padding-right: calc(100vw - 100%);
}

.content {
  width: 100%;
}
</style>