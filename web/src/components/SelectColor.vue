<template>
    <div>
      <button @click="showColorPicker">选择颜色</button>
      <div v-if="colorPickerVisible">
        <input type="color" v-model="currentColor" />
        <button @click="cancel">取消</button>
        <button @click="confirm">确定</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const colorPickerVisible = ref(false);
  const currentColor = ref('#000000');
  const selectedColor = ref('#000000');
  
  function showColorPicker() {
    currentColor.value = selectedColor.value;
    colorPickerVisible.value = true;
  }
  
  function cancel() {
    colorPickerVisible.value = false;
  }
  
  function confirm() {
    selectedColor.value = currentColor.value;
    colorPickerVisible.value = false;
  }
  </script>