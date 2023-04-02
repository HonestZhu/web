<!--  -->
<template>
  <div>
    <a-carousel
      class="carousel"
      :auto-play="true"
      indicator-type="line"
      show-arrow="always"
      arrow-class="arrow"
    >
      <a-carousel-item v-for="(image, index) in images" :key="index">
        <div>
          <img
            :src="image"
            :style="{
              width: '100%',
            }"
          />
        </div>
      </a-carousel-item>
    </a-carousel>
    <br />
    <a-row class="grid">
      <a-col :span="8">
        <Card :title="'序列输入'"></Card>
      </a-col>
      <a-col :span="8">
        <Card :title="'树输入'"></Card>
      </a-col>
      <a-col :span="8">
        <Card :title="'其他文件输入'"></Card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import Card from "../components/Card.vue";
const images = [
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
];
const titles = ["xxx", "xxx", "xxx"];
</script>
<style scoped>
.carousel {
  width: 80vw;
  height: 32vw;
  margin: 0 auto;
}

.card-title {
  text-align: center;
  font-weight: bold;
  font-size: 1.4em;
}

.arrow {
  background-color: black;
}

.grid {
    margin: 0 7vw;
}
</style>