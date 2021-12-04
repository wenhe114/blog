<template>
  <div class="layout-right-wrap">
    <div class="c-wrap">
      <div class="c-title">博主简介</div>
      <div class="base-info">
        <img class="photo" :src="aboutInfo.photo" alt="" srcset="">
        <div class="contact-box">
          <span>
            <a title="github" :href="aboutInfo.github"><i class="icon-github iconfont"></i></a>
          </span>
          <span>
            <a title="qq" target="_blank" :href="'http://wpa.qq.com/msgrd?v=3&uin='+aboutInfo.qq+'&site=qq&menu=yes'"><i class="icon-qq iconfont"></i></a>
          </span>
        </div>
        <div class="skill">
          <span>技能：</span>
          <span>{{aboutInfo.skill}}</span>
        </div>
        <p class="c-intro">
        简介：{{aboutInfo.intro}}
      </p>
      </div>
      
    </div>
    <div class="c-wrap">
      <div class="c-title">相关文章</div>
      <div class="c-c-list" v-for="item in datList" :key="item.id">
        <span class="c-left" @click="toDetail(item.id)">
          <img :src="item.img"/>
          <i class="c-tag">{{ item.tag }}</i>
        </span>
        <div class="c-right">
          <p :title="item.name" class="c-c-title" @click="toDetail(item.id)">{{ item.name }}</p>
          <div class="c-sum">
            <span>
              <i class="icon-huoyan iconfont"></i>{{ item.read_num }}
            </span>
            <span>
              <i class="icon-dianzan iconfont"></i>{{ item.remark_num }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="c-wrap">
      <div class="c-title">博客标签</div>
      <div class="tag-box">
        <span :title="item.menu_title" :style="{background:randomColor()}" v-for="item in AnalysisData" @click="toList(item.id)" :key="item.id">{{item.menu_title}}<i class="count">({{item.count}})</i></span>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/service/index";
import {arrSort,getRandomColor} from "@/static/untils/common"
export default {
  props: ["id"],
  data() {
    return {
      datList: [],
      AnalysisData:[],
      params: {
        currentPage: 1,
        pageSize: 15,
      },
    };
  },
  computed:{
    aboutInfo:{
      get(){
        return  this.$store.state.common.aboutInfo
      }
    }
  },
  mounted() {
    this.getData();
    this.getAnalysisData()
  },
  methods: {
    getData() {
      this.datList = [];
      return new Promise((resolve, reject) => {
        request
          .get("/contents/list", {
            params: { ...this.params },
          })
          .then((res) => {
            if (res.status === 1) {
              this.datList = res.data.list;
            }

            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getAnalysisData(){
      this.AnalysisData = [];
      return new Promise((resolve, reject) => {
        request
          .get("/contents/analysis")
          .then((res) => {
            if (res.status === 1) {
              this.AnalysisData = arrSort(res.data,'sort');
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
    toList(id){
      this.$router.push({
        path: "/content/",
        query: {
          id: id,
        },
      });
    },
    randomColor(){
      return getRandomColor()
    }
  },
  watch: {
    id() {
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.layout-right-wrap {
  .c-wrap {
    padding: 20px;
    background: @white-color;
    margin-bottom: 20px;
    .base-info{
      display: flex;
      flex-direction: column;
      justify-content: center;
      .photo{
        width: 100px;
        height: 100px;
        margin:  0 auto;
      }
      .contact-box{
        text-align: center;
        margin-top: 15px;
        >span{
          margin: 0 5px;
        }
      }
      .skill{
        margin-top: 10px;
      }
    }
    .c-title {
      font-size: 16px;
      margin-bottom: 15px;
    }
    .c-intro {
      font-size: 14px;
      color: rgb(150, 150, 150);
      // text-indent: 2em;
      margin-top: 10px;
    }
    .c-c-list {
      display: flex;
      flex-direction: row;
      height: 90px;
      padding: 10px 0;
      border-bottom: 1px dotted #c4c4c4;
      .c-left {
        width: 100px;
        position: relative;
        flex-shrink: 0;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
        .c-tag {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
        }
      }
      .c-right {
        flex: 1;
        min-width: 0;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        .c-c-title {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          flex: 1;
          min-height: 0;
          &:hover {
            cursor: pointer;
            color: @a-link;
          }
        }
        .c-sum {
          margin-top: auto;
          > span {
            margin-right: 10px;
            font-size: 12px;
          }
        }
      }
    }
    .tag-box{
      display: flex;
      flex-wrap: wrap;
      >span{
        padding:2px 5px;
        border-radius: 5px;
        margin: 10px;
        color: #fff;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .count{
          font-size: 12px;
        }
      }
    }
  }
}
</style>