<script lang="ts" name="List" setup>
import { ref } from 'vue'

const list = ref<string>('')
</script>

<template>
  <div>
    <el-input v-model="list" placeholder="请输入list"></el-input>
  </div>
</template>

<style lang="scss" scoped></style>
