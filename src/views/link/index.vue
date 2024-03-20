<script lang="ts" setup>
const toUrl = () => {
  window.location.href = 'https://www.usian.com'
}
</script>

<template>
  <div class="error-container layout-padding flex-center">
    <img alt="link" class="error-img mb30" src="@/assets/link.svg" />
    <div class="error-wrap">
      <div class="error-title">即将跳转到外部网站[积云官网]</div>
      <div class="error-msg">
        您将要访问的链接不属于 www.usian.com，请关注您的帐号安全！
        <br />
        https://www.usian.com
      </div>
      <el-button plain round type="primary" @click="toUrl">继续前往访问</el-button>
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
