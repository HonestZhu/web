<template>
  <div class="color-picker">
    <input type="color" v-model="selectedColor" @input="updateColor" />
    <button :style="{ backgroundColor: selectedColor }" class="color-preview">背景</button>
  </div>
</template>

<style>
.color-picker {
  position: relative;
}

.color-picker input[type="color"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.color-picker button.color-preview {
  border: none;
  width: 50px;
  height: 30px;
  border-radius: 10px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.color-picker button.color-preview:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
}
</style>