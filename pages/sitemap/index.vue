<template>
    <div>站点地图</div>
</template>

<script>
import {
  setStore
} from "@/static/untils/setStore";
export default {
   layout(context) {
    return 'empty'
  },
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
  async asyncData(context) {
    await setStore(context);
    return {};
  },
};
</script>