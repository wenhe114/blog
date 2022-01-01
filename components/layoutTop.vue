<template>
  <div class="blog-top-wrap">
    <div class="blog-top pc-nav">
      <span class="logo" @click="toRoute(4, false, '/', 0)">文和博客</span>
      <ul class="nav-wrap" :class="isShowNva ? 'active' : ''">
        <li class="nav-item" v-for="(item, index) in menu" :key="index">
          <template v-if="item.children && item.children.length > 0">
            <div
              class="nav-title"
              :class="currentIndex === index ? 'nav-active' : ''"
            >
              <span class="iconfont" :class="item.icon"></span
              >{{ item.meun_title }}
              <span class="icon-xiala iconfont"></span>
            </div>
            <ul class="children-nav">
              <li
                class="children-nav-item"
                v-for="it in item.children"
                :key="it.id"
                :class="id == it.id ? 'nav-active' : ''"
              >
                <div class="nav-title" @click="toRoute(it.id, true, '', index)">
                  <span class="iconfont" :class="it.icon"></span>
                  {{ it.meun_title }}
                </div>
              </li>
            </ul>
          </template>
          <div
            v-else
            class="nav-title"
            @click="toRoute(item.id, false, item.url, index)"
            :class="id == item.id ? 'nav-active' : ''"
          >
            <span class="iconfont" :class="item.icon"></span>
            {{ item.meun_title }}
          </div>
        </li>
      </ul>
      <div class="blog-top-right">
        <a-select v-model="searchType">
          <a-select-option value="all">所有</a-select-option>
          <a-select-option value="bufen">当前</a-select-option>
        </a-select>
        <a-input-search
          placeholder="请输入查询关键字"
          v-model="keywords"
          @search="onSearch"
        />
      </div>
      <div class="layout-search-wrap">
        <span
          class="iconfont icon-sousuo searchbtn"
          @click="isSearch = true"
        ></span>
        <div class="search-pc-wrap" :class="isSearch ? '' : 'none'">
          <div class="search-box" :class="isSearch ? 'active' : ''">
            <a-select v-model="searchType">
              <a-select-option value="all">所有</a-select-option>
              <a-select-option value="bufen">当前</a-select-option>
            </a-select>
            <a-input-search
              placeholder="请输入查询关键字"
              v-model="keywords"
              @search="onSearch"
            />
          </div>
        </div>
      </div>
      <span class="iconfont icon-menu open-menu-nav-btn" @click="isShowNva = true"> </span>
    </div>
    <div
      class="mask"
      :class="isSearch || isShowNva ? '' : 'none'"
      @click="closeMask"
    ></div>
  </div>
</template>

<script>
import request from "@/service/index";
export default {
  data() {
    return {
      keywords: "",
      id: "",
      currentIndex: 0,
      searchType: "bufen",
      isSearch: false,
      isShowNva: false,
    };
  },
  computed: {
    menu: {
      get() {
        return this.$store.state.common.menu;
      },
    },
  },
  created() {},
  mounted() {
    // request.get("/menu/list").then((res) => {
    //   console.log(res);
    //   if (res.status === 1) {
    //     this.$store.dispatch("common/menuActions", res.data);
    //     const i = res.data.findIndex((item) => {
    //       if (item.children && item.children.length > 0) {
    //         return (
    //           item.children.findIndex((it) => {
    //             return it.id == this.$route.query.id;
    //           }) != -1
    //         );
    //       }
    //     });
    //     this.currentIndex = i;
    //   }
    // });
  },
  methods: {
    toRoute(id, type, path, index) {
      this.keywords = "";
      this.searchType = "bufen";
      if (type) {
        this.$router.push({
          path: "/content",
          query: {
            id: id,
          },
        });
      } else {
        this.$router.push({
          path: path,
          query: {
            id: id,
          },
        });
      }
    },
    onSearch() {
      this.isSearch = false;
      if (this.searchType === "all") {
        this.$router.push({
          path: "/content",
          query: {
            name: this.keywords,
          },
        });
      } else {
        let query = { name: this.keywords };
        if (this.id) {
          query = Object.assign(query, { id: this.id });
        }
        this.$router.push({
          path: "/content",
          query: query,
        });
      }
    },
    closeMask() {
      this.isSearch = false;
      this.isShowNva = false;
    },
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.closeMask()
        this.id = val.query.id;
        const i = this.$store.state.common.menu.findIndex((item) => {
          if (item.children && item.children.length > 0) {
            return (
              item.children.findIndex((it) => {
                return it.id == this.id;
              }) != -1
            );
          }
        });
        this.currentIndex = i;
      },
      // 深度观察监听
      deep: true,
      // immediate: true,
    },
  },
};
</script>

<style lang="less">
@media screen and (min-width: 900px) {
  .blog-top-wrap {
    height: 60px;
    box-shadow: 0 1px 3px #e6e6e6;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    // width: 100%;
    background: @white-color;

    z-index: 1113;
    .blog-top {
      margin: 0 auto;
      // display: flex;
      flex-direction: row;
      align-items: center;

      .logo {
        cursor: pointer;
      }
      .nav-wrap {
        display: flex;
        flex-direction: row;
        margin-left: 30px;

        .nav-item {
          padding: 0 15px;
          position: relative;
          height: 100%;
          line-height: 60px;
          cursor: pointer;
          .nav-title {
            .iconfont {
              margin-right: 5px;
            }
            &:hover,
            &.nav-active {
              color: #0290a3;
            }
          }
          .children-nav {
            position: absolute;
            top: 60px;
            background: white;
            opacity: 0;
            visibility: hidden;
            transform: scale(1);
            transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s;
            // padding: 15px;
            width: 180px;
            box-shadow: 0px 3px 10px 0px #292b4b;
            overflow: hidden;
            height: 0;
            .children-nav-item {
              transition: 0.5s;
              padding: 0 10px;
              .iconfont {
                margin-right: 5px;
              }
              &:hover,
              &.nav-active {
                background: @theme-color;
                padding-left: 20px;
                color: #5d5d5d;
                text-indent: 5;
              }
            }
          }
          &:hover {
            .children-nav {
              opacity: 1;
              visibility: visible;
              height: auto;
            }
          }
        }
      }
      .blog-top-right {
        margin-left: auto;
        // display: flex;
      }
    }
  }
  .blog-top-right {
    display: flex;
  }
  .pc-nav {
    display: flex;
  }
  .layout-search-wrap {
    display: none;
  }
  .open-menu-nav-btn{
    display: none;
  }
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 1112;
  background: hsla(0, 0%, 99%, 0.5);
}
.search-pc-wrap {
}
.search-box {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  transform: translateY(100%);
  z-index: 1113;
  display: flex;
  height: 60px;
  align-items: center;
  background: #fff;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #eee;
  transition: 0.5s;
  &.active {
    top: 0;
    transform: translateY(0%);
  }
}
@media screen and (max-width: 1210px) and (min-width: 900px) {
  .blog-top-right {
    display: none;
  }
  .layout-search-wrap {
    margin-left: auto;
    display: block;
    .searchbtn {
      cursor: pointer;
    }
  }
  .open-menu-nav-btn{
    display: none;
  }
}
@media screen and (max-width: 960px) {
  .open-menu-nav-btn{
    display: block;
  }
  .blog-top {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    position: fixed;
    height: 60px;
    align-items: center;
    background: #fff;
    padding: 0 15px;
    z-index: 1114;
    > .icon-menu {
      margin-left: 15px;
      font-size: 20px;
    }
  }
  .logo {
    margin-right: auto;
  }
  .nav-wrap {
    position: fixed;
    right: 0;
    transform: translateX(100%);
    width: 230px;
    background: #fff;
    transition: 0.5s;
    z-index: 1115;
    top: 0;
    height: 100%;
    bottom: 0;
    padding: 15px;
    .nav-item {
      line-height: 35px;
      .nav-title {
        .iconfont {
          margin-right: 5px;
        }
        &:hover,
        &.nav-active {
          color: #0290a3;
        }
      }
      &:hover {
        .children-nav {
          height: auto;
          opacity: 1;
          visibility: initial;
        }
      }
      .children-nav {
        width: auto;
        position: inherit;
        visibility: hidden;
        background: transparent;
        transition: 0;
        box-shadow: 0 0 0;
        opacity: 0;
        transform: scale(1);
        height: 0;
        .children-nav-item {
              transition: 0.5s;
              padding: 0 10px;
              .iconfont {
                margin-right: 5px;
              }
              &:hover,
              &.nav-active {
                background: @theme-color;
                padding-left: 20px;
                color: #5d5d5d;
                text-indent: 5;
              }
            }
      }
    }
    &.active {
      top: 0;
      transform: translateY(0%);
    }
  }
  .blog-top-right {
    display: none;
  }
}
</style>