import Vue from 'vue';
import vueRouter from 'vue-router';
import vueResource from 'vue-resource';
import App from './App.vue';
import mintUI from 'mint-ui';
import moment from 'moment';
import VuePreview from 'vue-preview';  //图片预览插件
Vue.use(VuePreview)
Vue.filter('fmtdate', function (input, datefmtsting) {
    return moment(input).format(datefmtsting);
})
import 'mint-ui/lib/style.min.css';
import '../statics/hello-mui/css/icons-extra.css';
// import '../statics/hello-mui/fonts/mui.ttf';
import '../statics/hello-mui/css/mui.min.css';
import '../statics/hello-mui/css/app.css';
import '../statics/css/common.less';

Vue.use(vueRouter);
Vue.use(vueResource);
Vue.use(mintUI);
import Home from './components/Home/Home.vue';
import member from './components/member/member.vue';
import shopcar from './components/shopcar/shopcar.vue';
import search from './components/search/search.vue';
import newslist from './components/news/newslist.vue';    //新闻列表
import newsinfo from './components/news/newsinfo.vue';    //新闻详情
import photolist from './components/photo/photolist.vue'; //图片列表
import photoinfo from './components/photo/photoinfo.vue'; //
import goodslist from './components/goods/goodslist.vue'; //
import goodsinfo from './components/goods/goodsinfo.vue'; //
import goodscomment from './components/goods/comment.vue';//商品评价
import goodsdesc from './components/goods/goodsdesc.vue'; //图文介绍

let router = new vueRouter({
    //默认点击会添加一个router-link-active
    //linkActiveClass可以修改默认
    //设置成mui-active实现点击高亮
    linkActiveClass: 'mui-active',
    routes: [
        { name: 'root', path: '/', redirect: '/Home' },
        //访问的是http://localhost:8080/#/或者http://localhost:8080都会
        //（重定向）跳转到http://localhost:8080/#/Home
        { name: 'Home', path: '/Home', component: Home },
        { name: 'member', path: '/member', component: member },
        { name: 'shopcar', path: '/shopcar', component: shopcar },
        { name: 'search', path: '/search', component: search },
        { name: 'newslist', path: '/newslist', component: newslist },
        { name: 'newsinfo', path: '/news/newsinfo/:id', component: newsinfo },
        { name: 'photolist', path: '/photo/photolist', component: photolist },
        { name: 'photoinfo', path: '/photo/photoinfo/:id', component: photoinfo },
        { name: 'goodslist', path: '/goods/goodslist', component: goodslist },
        { name: 'goodsinfo', path: '/goods/goodsinfo', component: goodsinfo },
        { name: 'goodscomment', path: '/goods/comment', component: goodscomment },
        { name: 'goodsdesc', path: '/goods/goodsdesc', component: goodsdesc },
    ]
})

new Vue({
    el: '#app',
    render: c => c(App),
    router,

    data() {
        return {
           
            
        }

    }
})
