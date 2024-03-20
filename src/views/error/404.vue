<script lang="ts" setup></script>

<template>
  <div class="error-container layout-padding flex-center">
    <img alt="404" class="error-img mb30" src="@/assets/404.svg" />
    <div class="error-wrap">
      <div class="error-title">您所访问的页面不存在！</div>
      <div class="error-msg">请检查您输入的网址是否正确，或点击下面的按钮返回首页。</div>
      <el-button round type="primary" @click="$router.push('/')">返回首页</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-container {
  .error-img {
    width: 350px;
  }

  .error-wrap {
    margin-left: 30px;

    .error-title {
      font-size: 20px;
      font-weight: 600;
    }

    .error-msg {
      font-size: 13px;
      margin: 10px 0 30px 0;
      color: #ccc;
    }
  }
}
</style>
