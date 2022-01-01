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
    .current-path {
      padding: 15px;
      border-bottom: 4px solid #f4f4f4;
    }
    .content-item {
      padding: 15px;
      border-bottom: 1px solid #c8c8c8;
      display: flex;
      height: 181px;
      // overflow: hidden;
      .content-img {
        width: 230px;
        height: 150px;
        flex-shrink: 0;
        cursor: pointer;
        .img {
          width: 100%;
          height: 100%;
        }
      }
      .content-base-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        min-width: 0;
        .c-intro {
          margin-top: 15px;
          color: #aaa;
          line-height: 24px;
          display: -webkit-box; /**对象作为伸缩盒子模型展示**/
          -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
          -webkit-line-clamp: 3; /**显示的行数**/
          overflow: hidden; /**隐藏超出的内容**/
        }
        .content-name-box {
          overflow: hidden;
          text-overflow: ellipsis;
          .content-title {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            cursor: pointer;
            &:hover {
              color: @a-link;
            }
          }
          // white-space: nowrap;
          .content-type {
            font-size: 14px;
            background: @theme-color;
            color: #fff;
            padding: 2px 6px;
            border-radius: 3px;
          }
        }
        .c-f-num {
          margin-top: auto;
          display: flex;
          width: 100%;
          > span {
            margin-right: 20px;
            .iconfont {
              margin-right: 2px;
            }
          }

          .to-detail {
            margin-left: auto;
            cursor: pointer;
          }
        }
      }
    }
    .empty-box {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      margin-top: 50px;
      // align-items: center;
    }
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