<template>
    <div class="tmpl">
        <!--导入轮播组件实现商品轮播图-->
        <subimg :imagelist='goodsinfo'
                class="goodsimg"></subimg>
        <!--商品购买区-->
        <div class="sell">
            <h4>海天酱油真好喝！</h4>
            <div class="sellprice">
                <div>
                    <s>原价：¥49.08</s>
                    <span>活动价：¥39.88</span>
                </div>
                <div class="count">
                    购买数量：
                    <subnumber v-on:count="getcount"></subnumber>
                </div>
                <mt-button type="primary">立即购买</mt-button>
                <mt-button type="danger"
                           @click="toshopdata">加入购物车</mt-button>
            </div>
        </div>
        <!--/param参数部分-->
        <div class="params">
            <h6>商品参数部分</h6>
        </div>
        <footer class="footer">
            <mt-button plain
                       type="primary"
                       size="large"
                       class="footer_1"
                       @click='desc'>图文介绍</mt-button>
            <mt-button plain
                       type="danger"
                       size="large"
                       @click='comment'>商品评价</mt-button>
        </footer>
    </div>
</template>
<script>
import subimg from '../subcomp/subimg.vue';
import subnumber from '../subcomp/subnumber.vue';
// import {vueobj} from 'components/kits/commom.js';

export default {
    data() {
        return {
            goodsinfo: [
                {
                    "img": "../../../statics/img/goods1.jpg"
                },
                {
                    "img": "../../../statics/img/goods2.jpg"
                },
                {
                    "img": "../../../statics/img/goods1.jpg"
                },
                {
                    "img": "../../../statics/img/goods2.jpg"
                }
            ],
            count:1,
        }
    },
    created(){
        this.toshopdata();
    },
    components: {
        subimg,
        subnumber
    },
    methods: {
        getcount(count) {
            let c=count
            console.log(c);
        },//定义这个方法来接收子组件count值
        comment() {
            let id = this.$route.params.id;
            this.$router.push({ name: 'goodscomment', params: { id: id } });
        },//商品评价
        desc() {
            let id = this.$route.params.id;
            this.$router.push({ name: 'goodsdesc', params: { id: id } });
        },
        toshopdata() {
            let key = 'countt';
            console.log(222)
            this.$emit(key, this.count);
        }//定义这个方法将count值通知给父组件,
    }
}
</script>
<style scoped>
.tmpl .goodsimg,
.tmpl .footer {
    border: 1px solid rgba(92, 92, 92, .3);
}

.footer_1 {
    margin-bottom: 10px;
}

.sellprice h4 {
    line-height: 40px;
}

.sellprice s {
    padding-right: 20px;
    font-size: 14px;
    line-height: 30px;
}

.sellprice span {
    color: red;
}

.sell {
    border: 1px solid rgba(92, 92, 92, .3);
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
}

.sell .count {
    line-height: 30px;
    padding-bottom: 10px;
}

.tmpl .params {
    border: 1px solid rgba(92, 92, 92, .3);
    margin: 5px;
    margin-bottom: 10px;
    padding: 5px;
    height: 80px;
    border-radius: 5px;
}
</style>