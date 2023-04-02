<!--  -->
<template>
  <div class="mol-container" ref="container"></div>
</template>

<script setup>
import * as $3Dmol from "3dmol";
import { ref, getCurrentInstance, onMounted } from "vue";
import axios from "axios";

let pdbUri = "../../public/data/1AKI_clean.pdb";

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


axios
  .get(pdbUri)
  .then(function (response) {
    let v = $3Dmol.createViewer(
      document.getElementsByClassName("mol-container")[0]
    );
    v.addModel(response.data, "pdb"); /* load data */
    v.setBackgroundColor('#E4E5EA');
    v.container.style.borderRadius = '10%';
    v.setStyle({}, { cartoon: { color: "spectrum" }}); /* style all atoms */
    // v.container.style.width = '500px';
    // v.container.style.height = '500px';
    v.zoomTo(); /* set camera */
    v.render(); /* render scene */
    v.zoom(1.1, 500); /* slight zoom */
  })
  .catch(function (error) {
    console.log(error);
  });
</script>
<style scoped>
.mol-container {
  margin: 0 auto;
    /* border-style:solid;
    border-width:5px; */
    /* border-radius: 10px; */
}
</style>