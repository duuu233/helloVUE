<template>
    <div class="tmpl">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media"
                v-for='(item,index) in list' :key="index">
                <router-link v-bind='{to:"/news/newsinfo/"+item.id}'><img class="mui-media-object mui-pull-left"
                         :src="item.img">
                    <div class="mui-media-body">
                        {{item.name}}
                        <p class='mui-ellipsis'>{{item.date|fmtdate('YYYY-MM-DD')}}</p>
                    </div>
                </router-link>
            </li>
            <!--<li class="mui-table-view-cell mui-media">
    					<a href="javascript:;">
    						<img class="mui-media-object mui-pull-left" src="../../../statics/img/lol2.jpg">
    						<div class="mui-media-body">
    							木屋
    							<p class='mui-ellipsis'>想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
    						</div>
    					</a>
    				</li>-->
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: []
        }
    },
    created() {
        this.getsimg();
    },
    methods: {
        getsimg() {
            let url = '../../a.json';
            this.$http.get(url).then(res => {
                this.list = res.body.simg;
            }, res => {
                console.log('图片获取失败');
            })
        }
    }

}
</script>
<style>

</style>