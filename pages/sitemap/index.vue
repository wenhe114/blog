<template>
  <div class="sitemap-page-wrap">
    <h1>文和博客 | 站点地图</h1>
    <div class="breadcrumb-nav">
      当前位置：<a href="/" class="nuxt-link-active">文和博客</a>
      &gt; 站点地图
    </div>
    <section>
      <header>文章</header>
      <ul>
        <li v-for="item in contentSitemap" :key="item.id" class="c-item">
          <span>
            <i class="icon-huoyan iconfont"></i>
            <nuxt-link :to="item.url">{{ item.name }}</nuxt-link>
          </span>
          <span>{{ item.created_at }}</span>
        </li>
      </ul>
    </section>
    <section>
      <header>标签</header>
      <div class="tag-wrap">
        <span v-for="item in menuSitemap" :key="item.id">
          <nuxt-link :to="item.url"
            >{{ item.name }}({{ item.count }})</nuxt-link
          >
        </span>
      </div>
    </section>
    <footer class="w-100">
      <a href="https://beian.miit.gov.cn/">陇ICP备2021003774号</a>

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
        <i style="height: 20px; line-height: 20px; margin: 0px 0px 0px 5px">
          甘公网安备 62102502000131号
        </i></a
      >
    </footer>
  </div>
</template>

<script>
import { getContentSitemap, getMenutSitemap } from "@/static/untils/setStore";
export default {
  layout(context) {
    return "empty";
  },
  head() {
    return {
      title: "文和博客-站点地图",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "文和博客-站点地图",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "文和博客,站点地图",
        },
      ],
    };
  },
  async asyncData(context) {
    const [contentSitemap, menuSitemap] = await Promise.all([
      getContentSitemap(context),
      getMenutSitemap(context),
    ]);
    console.log(contentSitemap);
    return {
      contentSitemap: contentSitemap,
      menuSitemap: menuSitemap,
    };
  },
};
</script>

<style lang="less" scoped>
.sitemap-page-wrap {
  padding: 20px;
  section {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid var(--color-border);
    line-height: 2;
    .c-item {
      line-height: 35px;
      display: flex;
      justify-content: space-between;
    }
  }
  footer {
    margin-top: 30px;
    text-align: center;
  }
  .tag-wrap {
    span {
      display: inline-block;
      margin: 0 8px 8px 0;
      padding: 0 5px;
      border: 1px solid var(--color-border);
      border-radius: 3px;
    }
  }
}
</style>