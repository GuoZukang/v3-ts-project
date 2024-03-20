<script lang="ts" name="GoodsList" setup>
import { ref } from 'vue'

const list = ref<string>('')
</script>

<template>
  <div>
    <el-input v-model="list" placeholder="请输入list"></el-input>

    <el-button v-auth="'system:menu:add'">新增</el-button>
    <el-button v-auth="'system:menu:edit1'">编辑</el-button>
    <el-button v-auth="'system:menu:delete'">删除</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
