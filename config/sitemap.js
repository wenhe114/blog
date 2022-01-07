import axios from "axios"
import {getIpAddress} from "./getIp.js"
const isDev=process.env.ENV==='dev'?true:false
const httpPath= isDev?"http://"+getIpAddress()+":7001":"http://101.42.234.72:7001"
const sitemap = [
    {
        path: '/sitemap.xml', // 生成的文件路径
        hostname: 'http://www.linshipeng.com/', // 网址
        // cacheTime: 1000 * 60 * 60 * 24, // 1天 更新频率，只在 generate: false有用
        gzip: true, // 生成 .xml.gz 压缩的 sitemap
        generate: false, // 允许使用 nuxt generate 生成
        // 排除不要页面
        exclude: [
            '/404', //  这里的路径相对 hostname
            "/content/detail"
        ],
        // xml默认的配置
        defaults: {
            changefreq: 'daily',
            lastmod: new Date()
        },
        // 需要生成的xml数据, return 返回需要给出的xml数据
        routes (callback) {
            // const routes = [
            //     {
            //         url: "/helloword",
            //         changefreq: "daily",
            //         lastmod: "2020-12-04"
            //     }
            // ]
            axios.all([
                // 文章分类
                // axios.get(httpPath+'/menu/sitemap', {
                //   params: {
                //     type: 2
                //   }
                // }),
                // 遍历所有文章
                axios.get(httpPath+'/contents/sitemap', {
                  params: {
                    type: 2,
                    page: 1,
                    per_page: 100,
                    _embed: true
                  },
                  data: { progress: false }
                }),
               
        
              ]).then(axios.spread(function ( contents,) {
                let now = new Date();
                now.setHours(now.getHours(), now.getMinutes() - now.getTimezoneOffset());
                let indexRoutes = []
                //  用concat进行数据合并
                callback(null, indexRoutes.concat(contents.data.data));
              }), function (err) {
                throw (err);
              });
            // return routes
        }
    },
]
export default sitemap