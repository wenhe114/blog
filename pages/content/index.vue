<template>
  <div class="content-list-wrap">
    <div class="content-left">
      <div class="current-path">当前位置：{{ currentTitle }}</div>
      <template v-if="contentList.length > 0">
        <div class="content-item" v-for="item in contentList" :key="item.id">
          <router-link
            class="content-img"
            :to="{
              path: '/content/detail',
              query: {
                content_id: item.id,
              },
            }"
          >
            <img class="img" :src="item.img" />
          </router-link>
          <div class="content-base-box">
            <router-link
              class="content-name-box"
              :to="{
                path: '/content/detail',
                query: {
                  content_id: item.id,
                },
              }"
            >
              <p class="content-title" :title="item.name">
                <span class="content-type">{{ item.tag }}</span>
                {{ item.name }}
              </p>
            </router-link>
            <p class="c-intro">
              {{ item.intro }}
            </p>
            <div class="c-f-num">
              <span
                ><i class="icon-time iconfont"></i>{{ item.created_at }}</span
              >
              <span
                ><i class="icon-huoyan iconfont"></i>{{ item.read_num }}</span
              >
              <span
                ><i class="icon-dianzan iconfont"></i
                >{{ item.praise_num }}</span
              >
              <span
                ><i class="icon-xiaoxi iconfont"></i>{{ item.remark_num }}</span
              >
              <router-link
                class="to-detail"
                :to="{
                  path: '/content/detail',
                  query: {
                    content_id: item.id,
                  },
                }"
              >
                阅读全文 >></router-link
              >
            </div>
          </div>
        </div>
        <div class="page-box" v-if="total / contentList.length > 1">
          <a-pagination
            :default-current="params.currentPage"
            :defaultPageSize="params.pageSize"
            :total="total"
            @change="pageChange"
          />
        </div>
      </template>
      <template v-else>
        <div class="empty-box">啊哦，暂无数据~</div>
      </template>
    </div>
    <div class="content-right">
      <layout-right :id="params.id"></layout-right>
    </div>
  </div>
</template>

<script>
import request from "@/service/index";
import { setStore } from "@/static/untils/setStore";
import { contentListApi } from "@/static/untils/ssrApi";
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
  async asyncData(context) {
    function setTitle() {
      let currentTitle = "";
      if (!context.route.query.id) {
        return;
      }
      context.store.state.common.menu.findIndex((item) => {
        if (item.children && item.children.length > 0) {
          return (
            item.children.findIndex((it) => {
              if (it.id == context.route.query.id) {
                currentTitle = it.meun_title;
              }
              return it.id == context.route.query.id;
            }) != -1
          );
        } else {
          if (item.id == context.route.query.id) {
            currentTitle = item.meun_title;
          }
          return item.id == context.route.query.id;
        }
      });
      return currentTitle;
    }
    await setStore(context);
    let params = {
      currentPage: 1,
      pageSize: 15,
      id: context.route.query.id,
      name: context.route.query.name ? context.route.query.name : "",
    };
    const api = contentListApi(context);
    const data = await api.getContentList(params);
    return {
      contentList: data.list,
      currentTitle: setTitle(),
      params: params,
      total: data.page.total,
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
      total: 0,
    };
  },
  mounted() {
    // this.init();
    console.log(this.contentList);
  },
  methods: {
    // init() {
    //   this.params = {
    //     currentPage: 1,
    //     pageSize: 15,
    //     id: this.$route.query.id,
    //     name: this.$route.query.name ? this.$route.query.name : "",
    //   };
    //   this.$nextTick(async () => {
    //     // await this.getData();
    //     this.setTitle();
    //   });
    // },
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
              this.params.pageSize = res.data.page.pageSize;
              this.params.currentPage = res.data.page.currentPage;
              this.total = res.data.page.total;
              document.body.scrollTop = 0;
              if (!process.server) {
                this.$nuxt.$loading.finish();
                this.goTop();
              }
            }

            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    pageChange(currentPage, pageSize) {
      this.params.currentPage = currentPage;
      this.params.pageSize = pageSize;
      this.getData();
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
    // 回到底部
    goTop() {
      let scrollToTop = window.setInterval(() => {
        let Top = document.documentElement.scrollTop || document.body.scrollTop;
        if (Top > 0) {
          window.scrollTo(0, Top - 80);
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 10);
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
            if (!process.server) {
              await this.getData();
              this.setTitle();
            }
          });
      },
      // 深度观察监听
      deep: true,
    },
  },
};
</script>

<style lang="less">
@media screen and (min-width: 900px) {
  .content-list-wrap {
    .content-item {
      height: 181px;
      .content-img{
        width: 230px;
      }
      .content-base-box {
        min-width: 0;
        height: 100%;
        .c-intro{
          margin-top: 15px;
        }
      }
    }
  }
}
@media screen and (max-width: 900px) {
  .content-list-wrap {
    .content-item {
      height: 333px;
      flex-wrap: wrap;
      .content-img{
        width: 100%;
        margin-bottom: 10px;
      }
      .content-base-box {
        min-width: none;
        // height: 100%;
        .c-intro{
          margin-top: 0;
        }
        .to-detail{
          display: none;
        }
      }
    }
  }
}
.content-list-wrap {
  width: 100%;
  overflow: hidden;
  // padding: 15px 0;
  min-height: 850px;
  display: flex;
  flex-direction: row;
  .page-box {
    text-align: center;
    margin: 20px auto;
  }
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

      // overflow: hidden;
      .content-img {
        // width: 230px;
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
        
        width: 100%;
        .c-intro {
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