<template>
  <div class="content-list-wrap">
    <div class="content-left">
      <v-md-editor
          class="detail-md"
          v-model="aboutInfo.about_page"
          height="auto"
          mode="preview"
          ref="previewMd"
        ></v-md-editor>
    </div>
    <div class="content-right">
      <layout-right id=""></layout-right>
    </div>
  </div>
</template>
<script>
import {
  setStore
} from "@/static/untils/setStore";
export default {
  head() {
    return {
      title: "文和博客-关于我-关于本站",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "文和博客-关于我-关于本站",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "文和博客-关于我-关于本站",
        },
      ],
    };
  },
  data(){
    return{
      content:"1212"
    }
  },
  computed: {
    aboutInfo: {
      get() {
        return this.$store.state.common.aboutInfo;
      },
    },
  },
  async asyncData(context) {
    await setStore(context);
    return {};
  },
};
</script>