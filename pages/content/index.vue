<template>
  <div class="content-list-wrap">
    <div class="content-left">
      <div class="current-path">当前位置：{{ currentTitle }}</div>
      <template v-if="contentList.length>0">
        <div class="content-item" v-for="item in contentList" :key="item.id">
        <span class="content-img" @click="toDetail(item.id)">
          <img class="img" :src="item.img" />
        </span>
        <div class="content-base-box">
          <h2 class="content-name-box" @click="toDetail(item.id)">
            <p class="content-title" :title="item.name">
              <span class="content-type">{{ item.tag }}</span>
              {{ item.name }}
            </p>
          </h2>
          <p class="c-intro">
            {{ item.intro }}
          </p>
          <div class="c-f-num">
            <span><i class="icon-time iconfont"></i>{{ item.created_at }}</span>
            <span><i class="icon-huoyan iconfont"></i>{{ item.read_num }}</span>
            <span
              ><i class="icon-dianzan iconfont"></i>{{ item.praise_num }}</span
            >
            <span
              ><i class="icon-xiaoxi iconfont"></i>{{ item.remark_num }}</span
            >
            <span class="to-detail" @click="toDetail(item.id)"
              >阅读全文 >></span
            >
          </div>
        </div>
      </div>
      </template>
      <template v-else>
        <div class="empty-box">
          啊哦，暂无数据~
        </div>
      </template>
    </div>
    <div class="content-right">
      <layout-right :id="params.id"></layout-right>
    </div>
  </div>
</template>

<script>
import request from "@/service/index";
export default {
  head() {
    return {
      title: "文和博客-" + this.currentTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "文和博客-" + this.currentTitle,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "文和博客-" + this.currentTitle,
        },
      ],
    };
  },

  data() {
    return {
      params: {
        currentPage: 1,
        pageSize: 15,
        id: this.$route.query.id,
        name: this.$route.query.name ? this.$route.query.name : "",
      },
      contentList: [],
      currentTitle: "",
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
        id: this.$route.query.id,
        name: this.$route.query.name ? this.$route.query.name : "",
      };
      this.$nextTick(async () => {
        await this.getData();
        this.setTitle()
      });
    },
    getData() {
      if (!process.server) {
        this.$nuxt.$loading.start();
      }

      this.contentList = [];
      return new Promise((resolve, reject) => {
        request
          .get("/contents/list", {
            params: { ...this.params },
          })
          .then((res) => {
            // console.log(res);
            if (res.status === 1) {
              this.contentList = res.data.list;
              if (!process.server) {
                this.$nuxt.$loading.finish();
              }
            }

            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    toDetail(id) {
      this.$router.push({
        path: "/content/detail",
        query: {
          content_id: id,
        },
      });
    },
    setTitle() {
      if (!this.params.id) {
        return;
      }
      this.$store.state.common.menu.findIndex((item) => {
        if (item.children && item.children.length > 0) {
          return (
            item.children.findIndex((it) => {
              if (it.id == this.params.id) {
                this.currentTitle = it.meun_title;
              }
              return it.id == this.params.id;
            }) != -1
          );
        } else {
          if (item.id == this.params.id) {
            this.currentTitle = item.meun_title;
          }
          return item.id == this.params.id;
        }
      });
    },
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.params.id = val.query.id;
        
        (this.params.name = this.$route.query.name
          ? this.$route.query.name
          : ""),
          this.$nextTick(async () => {
            await this.getData();
            this.setTitle()
          });
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
    .empty-box{
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
    padding: 0px 15px;
    // background: @white-color;
    flex-shrink: 0;
  }
}
</style>