<template>
  <div class="w-h-footer">
    <div class="w-100">
      <span>站点：{{ aboutInfo.name }}</span>
      <span>邮箱：{{ aboutInfo.mail }}</span>
      <span>
        <a title="github" :href="aboutInfo.github"
          ><i class="icon-github iconfont"></i
        ></a>
      </span>
    </div>

    <div class="w-100">
      <a href="https://beian.miit.gov.cn/">{{ aboutInfo.beian_num }}</a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    aboutInfo: {
      get() {
        return this.$store.state.common.aboutInfo;
      },
    },
  },
};
</script>

<style lang="less">
.w-h-footer {
  margin-top: 30px;
  height: 70px;
  background: @white-color;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .w-100
  {
    width: 100%;
    text-align: center;
  }
  span {
    margin-left: 20px;
  }
}
</style>