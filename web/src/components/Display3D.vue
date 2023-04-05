<!--  -->
<template>
  <div class="root">
    <div>
      <a-space direction="vertical" :size="16" style="display: block;">
        <a-row class="head">
          <a-col :span="4">
            <div>3D分子模型</div>
          </a-col>
          <a-col :span="4">
            <a-dropdown @select="handleSelect" :popup-max-height="false">
              <a-button>外观<icon-down /></a-button>
              <template #content>
                <!-- // stick: 粘性键 sphere: 球形 cartoon: 卡通 line: 线 cross: 十字形 dot: 点 -->
                <a-doption>粘性键</a-doption>
                <a-doption>球形</a-doption>
                <a-doption>卡通</a-doption>
                <a-doption>线</a-doption>
                <a-doption>十字形</a-doption>
                <a-doption>点</a-doption>
              </template>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-space>
    </div>

    <div class="mol-container" ref="container"></div>

    <div class="foot"></div>
  </div>
</template>

<script setup>
import * as $3Dmol from "3dmol";
import { ref, getCurrentInstance, onMounted, defineExpose } from "vue";
import axios from "axios";

let pdbUri = "../../public/data/1AKI_clean.pdb";

const handleSelect = (name) => {
  // stick: 粘性键 sphere: 球形 cartoon: 卡通 line: 线 cross: 十字形 dot: 点
  switch (name) {
    case '粘性键':
      render({ stick: { color: "sphere" } });
      break;
    case '球形':
      render({ stick: { color: "cartoon" } });
      break;
    case '卡通':
      render({ stick: { color: "line" } });
      break;
    case '线':
      render({ stick: { color: "cross" } });
      break;
    case '十字形':
      render({ stick: { color: "dot" } });
      break;
  }
}

defineExpose({
  handleSelect
})

/**
 * setStyle函数是3Dmol.js中的一个函数，用于设置分子的样式。
 * setStyle函数的参数包括：style、sel、rebuild、viewer、invert、visible、clickable、callback等。
 * 其中，style参数是必须的，用于设置分子的样式。
 * sel参数是可选的，用于指定要设置样式的分子。
 *  - atom, bond, hetatm, protein, nucleic, solvent, not atom, not bond, not hetatm, not protein, not nucleic和not solvent。
 *  - 这些选项分别代表选择原子、键、非水原子、蛋白质、核酸、溶剂、非原子、非键、非水原子、非蛋白质、非核酸和非溶剂
 * rebuild参数是可选的，用于指定是否需要重建分子。
 * viewer参数是可选的，用于指定要设置样式的视图。
 * invert参数是可选的，用于指定是否反转颜色。
 * visible参数是可选的，用于指定是否可见。
 * clickable参数是可选的，用于指定是否可以单击。
 * callback参数是可选的，用于指定回调函数。
 */
const render = (options) => {
  axios
    .get(pdbUri)
    .then((response) => {
      let v = $3Dmol.createViewer(document.getElementsByClassName("mol-container")[0]);
      v.addModel(response.data, "pdb"); /* load data */
      v.setBackgroundColor('#E4E5EA');
      v.container.style.borderRadius = '10%';
      // stick: 粘性键 sphere: 球形 cartoon: 卡通 line: 线 cross: 十字形 dot: 点
      v.setStyle({}, options); /* style all atoms */
      // v.container.style.width = '500px';
      // v.container.style.height = '500px';
      v.zoomTo(); /* set camera */
      v.render(); /* render scene */
      v.zoom(1.1, 500); /* slight zoom */
    })
    .catch(function (error) {
      console.log(error);
    });
}

onMounted(() => {
  render({ stick: { color: "spectrum" } })
})

</script>
<style scoped>
.root {
  margin: 0 auto;
  width: 80%;
  height: 60vh;
  background-color: #E4E5EA;
  border-radius: 20px 20px 0 0;
}

.head {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 1em;
  letter-spacing: 0.05em;
  font-family: Microsoft JhengHei;
  font-weight: bold;
}

.mol-container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: calc(100% - 5px);
  /* border-style:solid;
    border-width:5px; */
}

.foot {
  height: 5px;
  width: 100%;
  background-color: rgba(22, 93, 255, 0.9);
  border-radius: 0 0 10px 10px;
}
</style>