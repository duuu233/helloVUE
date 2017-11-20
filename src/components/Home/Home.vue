<template>
    <div class="tmpl">
        <!--使用子组件subimg实现轮播-->
        <subimg :imagelist='list'></subimg>
        <!--利用mui实现9宫格导航-->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/newslist">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/photo/photolist">
                        <span class="mui-icon mui-icon-navigate"></span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/goods/goodslist">
                        <span class="mui-icon mui-icon-gear"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-paperplane"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-info"></span>
                        <div class="mui-media-body">视频专区</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-help"></span>
                        <div class="mui-media-body">联系我们</div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import subimg from '../subcomp/subimg.vue';
export default {
    data() {
        return {
            // list: [
            //     { img: '../../../statics/img/01.jpg' },
            //     { img: '../../../statics/img/02.jpg' },
            //     { img: '../../../statics/img/03.jpg' },
            //     { img: '../../../statics/img/04.jpg' },
            //     { img: '../../../statics/img/05.jpg' }
            // ]
            list: [],
        }
    },
    components: {
        subimg
    },
    created() {
        this.getimg();
    },
    methods: {
        getimg() {
            let url = '../../a.json';
            this.$http.get(url).then(res => {
                this.list = res.body.message;
            }, res => {
                console.log('图片获取失败');
            })
        }
    }
}
</script>
<style scoped>
/*<style scoped>表示当前样式只在当前组件中生效*/

.mint-swipe {
    overflow: hidden;
    position: relative;
    /*height: 98px;*/
}

.mint-swipe-items-wrap {
    position: relative;
    overflow: hidden;
    height: 100%;
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
}

.mint-swipe-items-wrap>div {
    position: absolute;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    width: 100%;
    height: 100%;
    display: none;
}

.mint-swipe-items-wrap>div.is-active {
    display: block;
    -webkit-transform: none;
    transform: none;
}

.mint-swipe-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
}

.mint-swipe-indicator {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: #000;
    opacity: 0.2;
    margin: 0 3px;
}

.mint-swipe-indicator.is-active {
    background: #fff;
}









/*9宫格样式*/

.mui-icon {
    width: 64px;
    height: 64px;
}

.mui-icon-home::before,
.mui-icon-navigate::before,
.mui-icon-gear::before,
.mui-icon-paperplane::before,
.mui-icon-info::before,
.mui-icon-help::before {
    content: '';
}

.mui-icon-home {
    background: url(../../../statics/img/lol1.jpg) 0 0 no-repeat;
}

.mui-icon-navigate {
    background: url(../../../statics/img/lol2.jpg) 0 0 no-repeat;
}

.mui-icon-gear {
    background: url(../../../statics/img/lol3.jpg) 0 0 no-repeat;
}

.mui-icon-paperplane {
    background: url(../../../statics/img/lol4.jpg) 0 0 no-repeat;
}

.mui-icon-info {
    background: url(../../../statics/img/lol5.jpg) 0 0 no-repeat;
}

.mui-icon-help {
    background: url(../../../statics/img/lol6.jpg) 0 0 no-repeat;
}
</style>