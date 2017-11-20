<template>
    <div class="tmpl">
        <div class="title">
            这是图片id为{{this.$route.params.id}}的详情页
        </div>
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
                    v-for="(item, index) in list">
                    <!--<router-link to="/newslist">-->
                    <img class="preview-img"
                         :src="item.src"
                         height="100"
                         @click="$preview.open(index, list)">
                    <!--</router-link>-->
                </li>
            </ul>
        </div>
        <div class="explain">
            图片的说明
        </div>
        <subcomment></subcomment>
    </div>
</template>
<script>
//导入评论组件
import subcomment from '../subcomp/subcomment.vue';
export default {
    data() {
        return {
            // photolist: [
            //     '../../../statics/img/photo1.jpg',
            //     '../../../statics/img/photo2.jpg',
            //     '../../../statics/img/photo3.jpg',
            //     '../../../statics/img/photo4.jpg',
            //     '../../../statics/img/photo5.jpg',
            //     '../../../statics/img/photo6.png'
            // ],
            list: [{
                src: '../../../statics/img/photo1.jpg',
                w: 600,
                h: 400
            },
            {
                src: '../../../statics/img/photo2.jpg',
                w: 600,
                h: 400
            },
            {
                src: '../../../statics/img/photo3.jpg',
                w: 600,
                h: 400
            },
            {
                src: '../../../statics/img/photo4.jpg',
                w: 600,
                h: 400
            },
            {
                src: '../../../statics/img/photo5.jpg',
                w: 600,
                h: 400
            },
            {
                src: '../../../statics/img/photo6.png',
                w: 600,
                h: 400
            }
            ]

        }
    },
    components:{
        subcomment
    }
}
</script>
<style scoped>
.tmpl .title {
    height: 60px;
    line-height: 60px;
    border-bottom: 2px solid rgba(0, 0, 0, .4);
    font-size: 16px;
}

.mui-table-view-cell {
    float: left
}

.mui-table-view-cell img {
    width: 98px;
    height: 109px;
}
</style>