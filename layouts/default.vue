<template>
  <div>
    <layout-top />
    <div style="height: 70px"></div>
    <div class="content-main">
      <nuxt />
    </div>
    <layout-footer class="footer"/>
    <a-back-top>
      <div class="back-top">
       <span class="iconfont icon-dingbu"></span>
      </div>
    </a-back-top>
  </div>
</template>

<script>
import request from "@/service/index"
export default {
  data(){
    return{}
  },
  mounted(){
    this.getAboutInfo()
  },
  methods:{
    getAboutInfo(){
      request.get("/about").then((res)=>{
        this.$store.dispatch("common/aboutInfoActions",res.data)
      })
    }
  }
}
</script>

<style lang="less">
.content-main{
  width: 1200px;
  margin: 0 auto;
}
.footer{
  width: 100%;
  margin: 0 auto;
}
.back-top{
  background: @theme-color;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: @white-color;
  >span{
    font-size: 30px;
  }
}
</style>