<!--  -->
<template>
  <div class="root">
    <div>
      <a-space class="head" direction="vertical">
        <a-row>
          <a-col :span="4">
            <div>3D分子模型</div>
          </a-col>
          <a-col :span="2">
            <a-dropdown @select="handleSelect" :popup-max-height="false">
              <a-button size="small" class="btn"><icon-skin />外观</a-button>
              <template #content>
                <!-- // stick: 粘性键 sphere: 球形 cartoon: 卡通 line: 线 cross: 十字形 dot: 点 -->
                <a-doption>粘性键</a-doption>
                <a-doption>球形</a-doption>
                <a-doption>卡通</a-doption>
                <a-doption>线</a-doption>
                <a-doption>十字形</a-doption>
              </template>
            </a-dropdown>
          </a-col>
          <a-col :span="2">
            <a-dropdown @select="handleSelectColor" :popup-max-height="false">
              <a-button size="small" class="btn"><icon-brush />背景</a-button>
              <template #content>
                <!-- // stick: 粘性键 sphere: 球形 cartoon: 卡通 line: 线 cross: 十字形 dot: 点 -->
                <a-doption>默认</a-doption>
                <a-doption>黑色</a-doption>
                <a-doption>白色</a-doption>
              </template>
            </a-dropdown>
          </a-col>
          <a-col :span="3">
            <a-button size="small" ref="download" class="btn" @click="getPng"><icon-file-image />导出PNG</a-button>
          </a-col>
          <a-col :span="3">
            <a-button size="small" ref="download" class="btn" @click="getPdb"><icon-cloud-download />导出PDB</a-button>
          </a-col>
          <a-col :span="4"></a-col>
          <a-col :span="6">{{ name }} - {{ style }}</a-col>
        </a-row>
      </a-space>
    </div>

    <div class="mol-container" ref="container"></div>

    <div class="foot"></div>
  </div>
</template>

<script setup>
import * as $3Dmol from "3dmol";
import FileSaver from 'file-saver';
import { ref, getCurrentInstance, onMounted, defineExpose } from "vue";
import SelectColor from "./SelectColor.vue";
import axios from "axios";

let pdbUri = "../../public/data/1AKI_clean.pdb";
const viewer = ref(null);
let name = ref('1AKI_clean.pdb');
let style = ref('粘性键');
let hasPdb = ref(false);
let pdb = ref('');
let download = ref(null);

const visible = ref(false);
const selectedColor = ref('#000000');
const color = ref('#E4E5EA');


const handleSelect = (name) => {
  // stick: 粘性键 sphere: 球形 cartoon: 卡通 line: 线 cross: 十字形 dot: 点
  style.value = name;
  switch (name) {
    case '粘性键':
      render(viewer.value, { stick: { color: "spectrum" } });
      break;
    case '球形':
      render(viewer.value, { sphere: { color: "spectrum" } });
      break;
    case '卡通':
      render(viewer.value, { cartoon: { color: "spectrum" } });
      break;
    case '线':
      render(viewer.value, { line: { color: "spectrum" } });
      break;
    case '十字形':
      render(viewer.value, { cross: { color: "spectrum" } });
      break;
  }
};

const handleSelectColor = (name) => {
  let v = viewer.value;
  switch (name) {
    case '默认':
      color.value = '#E4E5EA';
      break;
    case '黑色':
      color.value = 'black';
      break;
    case '白色':
      color.value = 'white';
      break;
  }
  v.setBackgroundColor(color.value);
}

const getPng = () => {
  downloadImage(viewer.value.pngURI(), name.value + '-' + style.value + '.png');
};
const getPdb = () => {
  if (hasPdb.value == true) {
    downloadPdb(pdb.value, name.value + '-' + style.value + '.pdb')
  }
};
const downloadImage = (base64String, filename) => {
  const byteCharacters = atob(base64String.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/png' });
  FileSaver.saveAs(blob, filename);
};
const downloadPdb = (pdbString, name) => {
  const blob = new Blob([pdbString], { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(blob, name);
};

defineExpose({
  handleSelect,
  handleSelectColor
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
const render = (v, options) => {
  axios
    .get(pdbUri)
    .then((response) => {
      hasPdb.value = true;
      pdb.value = response.data;
      v.addModel(response.data, "pdb"); /* load data */
      v.setBackgroundColor('#E4E5EA');
      // v.container.style.borderRadius = '10%';
      // stick: 粘性键 sphere: 球形 cartoon: 卡通 line: 线 cross: 十字形 dot: 点
      v.setStyle({}, options); /* style all atoms */
      v.container.style.width = `100%`;
      v.container.style.height = `calc(90% - 5px)`;
      v.zoomTo(); /* set camera */
      v.render(); /* render scene */
      v.setBackgroundColor(color.value);
      v.zoom(1.1, 500); /* slight zoom */
    })
    .catch(function (error) {
      console.log(error);
    });
}

onMounted(() => {
  viewer.value = $3Dmol.createViewer(document.getElementsByClassName("mol-container")[0])
  render(viewer.value, { stick: { color: "spectrum" } })
})

</script>
<style scoped>
.root {
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

.head {
  border-radius: 20px 20px 0 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 1em;
  letter-spacing: 0.05em;
  font-family: Microsoft JhengHei;
  font-weight: bold;
  background-color: rgba(22, 93, 255, 0.9);
  color: rgb(239, 235, 235);
  overflow: hidden;
}

.btn {
  padding: 10px;
  border-radius: 10px;
  background-color: #E4E5EA;
  font-weight: bold;
  font-size: 0.9em;
}

.mol-container {
  position: relative;
  margin: 0 auto;
}

.foot {
  height: 5px;
  width: 100%;
  background-color: rgba(22, 93, 255, 0.9);
  border-radius: 0 0 10px 10px;
}
</style>