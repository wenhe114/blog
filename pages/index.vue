<template>
  <div class="content-list-wrap">
    <div class="content-left">
      
    </div>
    <div class="content-right">
      <layout-right :id="id"></layout-right>
    </div>
  </div>
</template>

<script>
import request from "@/service/index";
import { setStore, getContentList } from "@/static/untils/setStore";
export default {
  head() {
    return {
      title: this.currentTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.currentTitle,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.currentTitle,
        },
      ],
    };
  },
  async asyncData(context) {
    await setStore(context);
   
  },
  data() {
    return {
      params: {
        currentPage: 1,
        pageSize: 15,
      },
      contentList: [],
      currentTitle: "文和博客-专注前端开发-技术学习-记录问题",
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.params = {
        currentPage: 1,
        pageSize: 15,
      };

    },
    
  
   
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.params.id = val.query.id;

        (this.params.name = this.$route.query.name
          ? this.$route.query.name
          : "")
      },
      // 深度观察监听
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="less">
.content-list-wrap {
  width: 100%;
  overflow: hidden;
  padding: 15px 0;
  min-height: 850px;
  display: flex;
  flex-direction: row;

  .content-left {
    flex: 1;
    background-color: @white-color;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .content-right {
    width: 300px;
    min-height: 600px;
    margin-left: 15px;
    // background: @white-color;
    flex-shrink: 0;
  }
}
</style>