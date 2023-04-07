<!--  -->
<script setup>
// import * as $3Dmol from '3dmol/build/3Dmol.js';;
import Display3D from "../components/Display3D.vue";
import Tree from '../components/Tree.vue'

</script>
<template>
  <div class='root'>
    <!-- <Display3D class="display"></Display3D> -->
    <Tree class="display" :tree-url="'../../public/data/tree.nwk'"></Tree>

  </div>
</template>


<style scoped>
.root {
  height: 100%;
  width: 100%;
  
}

.display {
  width: 800px;
  height: 600px;
}
</style>