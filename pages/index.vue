<template>
  <div class="content-list-wrap">
    <div class="content-left">
      <div class="resource-type-wrap">
        <span class="type-title">分类：</span>
        <div class="type-wrap">
          <router-link :to="{path:'/',query:{type_id:''}}" class="type-item" :class="!type_id?'active':''">全部</router-link>
          <router-link v-for="item in typeList" :key="item.id" :to="{path:'/',query:{type_id:item.id}}" class="type-item" :class="type_id==item.id?'active':''">{{item.type}}</router-link>
        </div>
      </div>
      <div class="resource-list-wrap" v-if="dataList.length>0">
        <div class="resource-item-box" v-for="item in dataList" :key="item.id">
          <nuxt-link class="resource-img" :to="item.url">
            <img :src="item.cover" alt="" srcset="" />
          </nuxt-link>
          <div class="resource-right">
            <h1 class="resource-name">
              <nuxt-link :to="item.url">{{ item.name }}</nuxt-link>
            </h1>
            <p class="resource-desc">{{ item.intro }}</p>
            <div class="down-adress">
              <span
                >下载地址：<nuxt-link :to="item.down_url">{{
                  item.down_url
                }}</nuxt-link></span
              >
            </div>
            <div>
              <span>提取码：</span
              ><span class="down-no">{{ item.down_no }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="none-data-wrap">
        啊哦，暂无数据~
      </div>
    </div>
    <div class="content-right">
      <layout-right :id="id"></layout-right>
    </div>
  </div>
</template>

<script>
import {
  setStore,
  getResourceList,
  getResourceTypeList,
} from "@/static/untils/setStore";
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
  watchQuery: true,
  async asyncData(context) {
    setStore(context);
    const type_id=context.query.type_id?context.query.type_id:''
    const typeData =await getResourceTypeList(context);
    const data =await getResourceList(context,type_id);
    return {
      dataList: data,
      typeList:typeData,
      type_id:type_id
    };
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

        this.params.name = this.$route.query.name ? this.$route.query.name : "";
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
  .resource-type-wrap {
    display: flex;
    padding: 15px;
    .type-title {
      flex-shrink: 0;
      margin-right: 15px;
    }
    .type-wrap {
      > .type-item {
        display: inline-block;
        padding: 2px 15px;
        margin-right: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 8px;
        cursor: pointer;
        &.active {
          background: @theme-color;
          color: #3695a8;
        }
      }
    }
  }
  .resource-list-wrap {
    padding: 15px;
    .resource-item-box {
      margin-top: 20px;
    }
  }
  @media screen and(min-width:900px) {
    .resource-list-wrap {
      .resource-item-box {
        display: flex;
        flex-direction: row;
        height: 155px;
        border: 1px solid #e2e2e2;
        border-radius: 4px;
        padding: 10px;
        .resource-img {
          width: 130px;
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .resource-right {
          margin-left: 15px;
          flex: 1;
          height: 100%;
          min-width: 1px;
        }
        .resource-name {
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .resource-desc {
          overflow: hidden;
          display: -webkit-box; //将对象作为弹性伸缩盒子模型显示;
          text-overflow: ellipsis; //溢出部分用省略号代替
          -webkit-line-clamp: 2; //设置文本显示两行
          -webkit-box-orient: vertical; //从上到下排列子元素;
          white-space: normal;
          font-size: 12px;
          color: #6b6b6b;
        }
        .down-adress {
          margin-top: auto;
        }
        .down-no {
          color: red;
        }
      }
    }
  }
  @media screen and(max-width:900px) {
    .resource-list-wrap {
      .resource-item-box {
        display: flex;
        flex-direction: column;
        // height: 155px;
        border: 1px solid #e2e2e2;
        border-radius: 4px;
        padding: 10px;
        .resource-img {
          width: 100%;
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .resource-right {
          margin-left: 15px;
          flex: 1;
          height: 100%;
          min-width: 1px;
        }
        .resource-name {
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .resource-desc {
          overflow: hidden;
          display: -webkit-box; //将对象作为弹性伸缩盒子模型显示;
          text-overflow: ellipsis; //溢出部分用省略号代替
          -webkit-line-clamp: 2; //设置文本显示两行
          -webkit-box-orient: vertical; //从上到下排列子元素;
          white-space: normal;
          font-size: 12px;
          color: #6b6b6b;
        }
        .down-adress {
          margin-top: auto;
        }
        .down-no {
          color: red;
        }
      }
    }
  }
}
.none-data-wrap{
  margin-top: 50px;
  text-align: center;
}
</style>