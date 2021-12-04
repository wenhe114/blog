<template>
  <div class="w-h-footer">
          <span>站点：{{aboutInfo.name}}</span>
          <span>邮箱：{{aboutInfo.mail}}</span>
          <span>
            <a title="github" :href="aboutInfo.github"><i class="icon-github iconfont"></i></a>
          </span>
      
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
.w-h-footer{
    margin-top: 30px;
    height: 70px;
    background: @white-color;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
        margin-left: 20px;
    }
}
</style>