<template>
  <div id="phylocanvas" ref="treeContainer"></div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, defineProps } from "vue";
import { PhylocanvasGL } from "@phylocanvas/phylocanvas.gl";

const props = defineProps({
  treeUrl: {
    type: String,
    required: true,
  },
});

const treeContainer = ref(null);

onMounted(() => {
  axios
    .get(props.treeUrl)
    .then((response) => {
        console.log(response.data);
    //   // 在axios回调函数中实例化Phylocanvas对象
    //   const tree = new Phylocanvas(
    //     treeContainer.value,
    //     {
    //       tree: response.data,
    //       // 配置树状图的参数
    //     }
    //   );
    //   // 绘制树状图
    //   tree.draw();
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<style scoped>

</style>