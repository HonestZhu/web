<!--  -->
<script setup>
// import * as $3Dmol from '3dmol/build/3Dmol.js';;
import Display3D from "../components/Display3D.vue";
</script>
<template>
<div class='root'>
    <Display3D class="display"></Display3D>
</div>
</template>


<style scoped>
.root {
  height: 100vh;
}

.display {
  width: 60vw;
  height: 50vh;
}
</style>