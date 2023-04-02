<!--  -->
<template>
  <div class="root">
    <a-image
      class="image"
      width="200"
      src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
    />
    <div class="title">{{ title }}</div>
    <div>{{ description }}</div>
    <button class="btn">上传</button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
  description: String,
  text: String,
});
</script>
<style scoped>
.root {
  /* background-color: #f2f3f5; */
  border-radius: 2vh;
  margin: 10px 30px;
  text-align: center;
}

.image {
  border-radius: 2vh;
}

.title {
  font-weight: bold;
  margin-top: 0.5vh;
  font-size: 1.6em;
}

.btn {
  width: 60%;
  height: 30px;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 1.2em;
  letter-spacing: 0.4em;
  transition: 140ms;
  font-weight: bold;
  /* background-color: rgba(22,93,255,0.9); */
  /* color: rgb(239, 235, 235); */
}

.btn:hover {
  cursor: pointer;
  background-color: rgba(22, 93, 255, 0.9);
  color: rgb(239, 235, 235);
  transition: 140ms;
}

.btn::after {
  border: none;
}
</style>