<template>
    <div class="lol">
        <!--公共样式头部-->
        <mt-header fixed
                   title='公共样式头部'></mt-header>
        <!--返回按钮-->
        <div class="back">
            <a v-on:click='goback'
               v-if='isShow'>返回</a>
        </div>
        <router-view></router-view>
        <!-- 通过路由改变的部分（单页开发）-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item"
                         to='/Home'>
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item "
                         to='/member'>
                <span class="mui-icon mui-icon-email"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item "
                         to='/shopcar'>
                <span class="mui-icon mui-icon-contact"><span class="mui-badge" >9</span></span>
                <span class="mui-tab-label"
                      v-on:countt="getcountt">购物车</span>
    
            </router-link>
            <router-link class="mui-tab-item "
                         to='/search'>
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
        <!--<goodsinfoo></goodsinfoo>-->
        <!--公共样式底部-->
    </div>
</template>
<script>
// import {vueobj} from 'components/kits/commom.js';
// vueobj.$on('shopdata',function(data){
//     console.log('data='+data);
// })
import goodsinfoo from './components/goods/goodsinfo.vue';
export default {
    data() {
        return {
            isShow: true
        }
    },
    created() {

    },
    components: {
        goodsinfoo
    },
    methods: {
        goback() {
            this.$router.go(-1);//点击返回上一个页面
        },
        getcountt(countt) {
            // let c = count
            console.log(111);
            console.log(countt);
        }
    },
    watch: {
        '$route': function (n, o) {
            if (n.path.toLowerCase() == '/home') {
                this.isShow = false;
            } else {
                this.isShow = true;
            }
        }
    }

}
</script>
<style scoped>
.back {
    position: fixed;
    top: 9px;
    left: 11px;
    z-index: 1000;
}

.back a {
    font-size: 16px;
    color: #fff;
    font-weight: 900;
}
</style>