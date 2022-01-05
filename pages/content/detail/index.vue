<template>
  <div class="content-detail-wrap">
    <div class="current-path">
      当前位置：<span class="content-type" @click="toList(content.type)">{{
        type
      }}</span>
      > <span>{{ content.name }}</span>
    </div>
    <div class="content-detail-box">
      <div class="md-content-wrap">
        <div class="md-head-wrap">
          <div class="content-title">{{ content.name }}</div>
          <div class="c-f-num">
            <div>
              <span class="icon-yonghu iconfont"></span
              ><span>{{ content.author }}</span>
            </div>
            <div>
              <span class="icon-time iconfont"></span
              ><span>{{ content.created_at }}</span>
            </div>
            <div>
              <span class="icon-huoyan iconfont"></span
              ><span>{{ content.read_num }}</span>
            </div>
            <div @click="praiseNumClick">
              <span class="icon-dianzan iconfont"></span
              ><span>{{ content.praise_num }}</span>
            </div>
            <div>
              <span class="icon-xiaoxi iconfont"></span
              ><span>{{ content.remark_num }}</span>
            </div>
          </div>
        </div>
        <v-md-editor
          class="detail-md"
          v-model="content.content_md"
          height="auto"
          mode="preview"
          @copy-code-success="handleCopyCodeSuccess"
          ref="previewMd"
        ></v-md-editor>
      </div>
      <div class="c-d-right">
        <layout-right :id="content.type"></layout-right>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/service/index";
import { setStore } from "@/static/untils/setStore";
import { detailApi } from "@/static/untils/ssrApi";
import { showImg } from "@/static/untils/imgView";
export default {
  data() {
    return {
      //   detail: "",
      content: {},
      isClick: false,
    };
  },
  head() {
    return {
      title: this.content.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.content.intro,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.content.tag,
        },
      ],
    };
  },
  async asyncData(context) {
    await setStore(context);
    const content_id = context.route.query.content_id;
    const api = detailApi(context);
    const data = await api.getContentDetail(content_id);
    data.read_num++;
    await api.updateReadNum(data.id, data.read_num);
    return {
      content: data,
    };
  },
  computed: {
    type: {
      get() {
        let content_type = "";
        if (this.content.id && this.$store.state.common.menu.length > 0) {
          this.$store.state.common.menu.findIndex((item) => {
            if (item.children && item.children.length > 0) {
              return (
                item.children.findIndex((it) => {
                  console.log(it.id, this.content.type);
                  if (it.id == this.content.type) {
                    content_type = it.meun_title;
                  }
                  return it.id == this.content.type;
                }) != -1
              );
            } else {
              if (item.id == this.content.type) {
                content_type = item.meun_title;
              }
              return item.id == this.content.type;
            }
          });
        }
        return content_type;
      },
    },
  },
  mounted() {
    let imgs = this.$refs.previewMd.$el.querySelectorAll("img");
    console.log(imgs);
    imgs.forEach((element) => {
      console.log(element);
      element.onclick = function (e) {
        console.log(e);
        console.log(e.target.src);
        showImg(e.target.src);
        /*创建图片，并且设置属性*/
        //  var oImgBox = document.createElement("img");
        //  oImgBox.setAttribute("id", "imgBox");
        //  oImgBox.setAttribute("src", e.target.src);
        //  oImgBox.setAttribute("alt", "图片一");
        // document.body.append(oImgBox)
      };
    });
  },
  methods: {
    toList(id) {
      this.$router.push({
        path: "/content",
        query: {
          id: id,
        },
      });
    },
    // updateReadNum() {
    //   this.content.read_num += 1;
    //   let params = {
    //     id: this.content.id,
    //     read_num: this.content.read_num,
    //   };
    //   request.put("/content/update/readNum", params).then((res) => {
    //     console.log(res);
    //   });
    // },
    praiseNumClick() {
      this.isClick = !this.isClick;
      if (this.isClick) {
        this.content.praise_num += 1;
      } else {
        this.content.praise_num -= 1;
      }

      let params = {
        id: this.content.id,
        praise_num: this.content.praise_num,
      };
      request.put("/content/update/praiseNum", params).then((res) => {
        console.log(res);
      });
    },
    handleCopyCodeSuccess(code) {
      console.log(code);
      this.$message.success("复制成功");
    },
  },
};
</script>

<style lang="less">
.content-detail-wrap {
  width: 100%;
  min-height: 850px;
  .current-path {
    line-height: 50px;
    font-size: 18px;
    .content-type {
      cursor: pointer;
    }
  }
  .content-detail-box {
    display: flex;
    flex-direction: row;
    .md-content-wrap {
      flex: 1;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .c-d-right {
      width: 300px;
      min-height: 600px;
      margin-left: 15px;
      padding: 0 15px;
      flex-shrink: 0;
    }
  }
  .md-content-wrap {
    background: @white-color;
    .md-head-wrap {
      text-align: center;
      padding: 30px 30px 0px 30px;

      .content-title {
        font-size: 30px;
        font-weight: 400;
        margin-bottom: 20px;
      }
      .c-f-num {
        padding-bottom: 10px;
        border-bottom: 2px solid @theme-color;
        display: flex;
        justify-content: center;
        align-items: center;
        > div {
          margin-right: 15px;
        }
        > span {
          margin-left: 30px;
        }
      }
    }
  }
}
.detail-md {
  img {
    cursor: zoom-in;
  }
}
</style>