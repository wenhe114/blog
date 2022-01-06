<template>
  <div class="w-h-footer">
    <div class="w-100">
      <span>站点：{{ aboutInfo.name }}</span>
      <span>邮箱：{{ aboutInfo.mail }}</span>
      <span>
        <a title="github" :href="aboutInfo.github"
          ><i class="icon-github iconfont"></i
        >文和gitHub仓库</a>
      </span>
    </div>
<div class="w-100">
  <nuxt-link to="/about" class="a-link split-line">关于我</nuxt-link>
  <nuxt-link to="/message-board" class="a-link split-line">留言板</nuxt-link>
  <nuxt-link to="/blogroll" class="a-link split-line">友情链接</nuxt-link>
  <nuxt-link to="/sitemap" class="a-link">站点地图</nuxt-link>
</div>
    <div class="w-100">
      <a href="https://beian.miit.gov.cn/">{{
        aboutInfo.beian_num ? aboutInfo.beian_num : "陇ICP备2021003774号"
      }}</a>
      
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=62102502000131"
          style="
            display: inline-block;
            text-decoration: none;
            height: 20px;
            line-height: 20px;
          "
          >
          <span><img :src="gonganICon" /></span>
          <i
            style="
              height: 20px;
              line-height: 20px;
              margin: 0px 0px 0px 5px;
              color: #939393;
            "
          >
            甘公网安备 62102502000131号
          </i></a
        >
    </div>
  </div>
</template>

<script>
import gonganICon from "@/static/image/gongan.png"
export default {
  data(){
    return{
      gonganICon
    }
  },
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
  // height: 70px;
  background: @white-color;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 0px;
  .split-line{
    position: relative;
    &.a-link{
      margin-left: 10px;
      margin-right: 10px;
    }
    &::after{
      position: absolute;
      content: "";
      width: 1px;
      height: 15px;
      background: rgb(68, 68, 68);
      right: -10px;
      top: 4px;
    }
  }
  .w-100 {
    width: 100%;
    text-align: center;
    margin-top: 15px;
  }
  span {
    margin-left: 20px;
  }
}
</style>