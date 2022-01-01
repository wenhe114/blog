<template>
  <div>
    <layout-top  ref="top"/>
    <div style="height: 70px"></div>
    <div class="content-main">
      <nuxt />
    </div>
    <layout-footer class="footer" />
    <a-back-top>
      <div class="back-top">
        <span class="iconfont icon-dingbu"></span>
      </div>
    </a-back-top>
  </div>
</template>

<script>
import request from "@/service/index";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getAboutInfo();
  },
  methods: {
    getAboutInfo() {
      request.get("/about").then((res) => {
        this.$store.dispatch("common/aboutInfoActions", res.data);
      });
    },
  },
};
</script>

<style lang="less">
@media screen and (min-width:950px) {
  .content-main {
    width: 95%;
    margin: 0 auto;
  }
  .blog-top-wrap {
    width: 100%;
  }
  .blog-top {
    width: 95%;
  }
}


@media screen and (max-width: 950px) {
  .content-main {
    width: 90%;
    margin: 0 auto;
  }
  .blog-top-wrap {
    width: 100%;
  }
  .blog-top {
    width: 90%;
  }
  
  .c-d-right,
  .content-right {
    display: none;
  }

}
.footer {
  width: 100%;
  margin: 0 auto;
}
.back-top {
  background: @theme-color;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: @white-color;
  > span {
    font-size: 30px;
  }
}
</style>