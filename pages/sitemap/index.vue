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
        <li v-for="item in sitemap" :key="item.id" class="c-item">
          <span>
            <i class="icon-huoyan iconfont"></i>
            <nuxt-link :to="item.url">{{ item.name }}</nuxt-link>
          </span>
          <span>{{ item.created_at }}</span>
        </li>
      </ul>
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
        <i
          style="
            height: 20px;
            line-height: 20px;
            margin: 0px 0px 0px 5px;
          "
        >
          甘公网安备 62102502000131号
        </i></a
      >
    </footer>
  </div>
</template>

<script>
import { getContentSitemap } from "@/static/untils/setStore";
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
    const sitemap = await getContentSitemap(context);
    console.log(sitemap);
    return {
      sitemap: sitemap,
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
}
</style>