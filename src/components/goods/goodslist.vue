<template>
    <div class="tmpl">
        <ul class="mui-table-view mui-grid-view">
            <li class="mui-table-view-cell mui-media mui-col-xs-6">
                <router-link to="/goods/goodsinfo">
                    <img class="mui-media-object"
                         src="../../../statics/img/goods1.jpg">
                    <div class="mui-media-body">
                        <span>¥29.9</span>
                        <span><s>¥45.0</s></span>
                        <div>热卖中</div>
                    </div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-6">
                <router-link to="/goods/goodsinfo">
                    <img class="mui-media-object"
                         src="../../../statics/img/goods2.jpg">
                    <div class="mui-media-body">
                        <span>¥29.9</span>
                        <span><s>¥45.0</s></span>
                        <div>热卖中</div>
                    </div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-6">
                <a href="#"><img class="mui-media-object"
                         src="../../../statics/img/goods2.jpg">
                    <div class="mui-media-body">
                        <span>¥29.9</span>
                        <span><s>¥45.0</s></span>
                        <div>热卖中</div>
                    </div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-6">
                <a href="#">
                    <img class="mui-media-object"
                         src="../../../statics/img/goods1.jpg">
                    <div class="mui-media-body">
                        <span>¥29.9</span>
                        <span><s>¥45.0</s></span>
                        <div>热卖中</div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
    color: red;
    font-size: 15px;
}

.mui-media-body span:nth-child(2) {
    color: black;
    padding-left: 15px;
    font-size: 13px;
}

.mui-media-body span {
    float: left;
}

.mui-media-body div {
    font-size: 16px;
    color: red;
}
</style>