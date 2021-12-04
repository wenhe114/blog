<template lang="html">
  <div class="loading-page" v-if="loading">
      <div class="loading-progress-box" :style="{width:width+'%'}"></div>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    width: 0,
    timer: null,
  }),
  methods: {
    start() {
      this.width = 0;
      this.loading = true;
      this.timer = setInterval(() => {
        this.width++;
        if (this.width >= 90) {
          clearInterval(this.timer);
        }
      }, 30);
    },
    finish() {
      clearInterval(this.timer);
      this.width = 100;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style scoped lang="less">
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 1114;
  .loading-progress-box {
    position: absolute;
    top: 0;
    height: 8px;
    background: @theme-color;
    border-radius: 4px;
  }
}
</style>