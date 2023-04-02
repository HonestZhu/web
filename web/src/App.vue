<template>
  <div class="root">
    <Menu class="menu"></Menu>
    <transition name="fade" mode="out-in">
      <router-view v-slot="{ Component }">
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
/* .scale-enter-active,
.scale-leave-active {
  transition: transform 0.3s;
}

.scale-enter-from,
.scale-leave-to {
transform: scale(0);
} */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>