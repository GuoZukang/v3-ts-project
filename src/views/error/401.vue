<script lang="ts" setup>
const url = location.host
</script>

<template>
  <div class="error-container layout-padding flex-center">
    <img alt="401" class="error-img mb30" src="@/assets/401.svg" />
    <div class="error-wrap">
      <div class="error-title">您没有操作权限，请联系管理员！</div>
      <div class="error-msg">
        联系方式：
        <span>{{ url }}</span>
      </div>
      <el-button round type="primary">重新登录</el-button>
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
