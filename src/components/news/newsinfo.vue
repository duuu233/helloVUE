<template>
    <div class="tmpl">
       这是id为{{this.$route.params.id}}的详情页
       <subcomment :artid='artid'></subcomment>
    </div>
</template>
<script>
import subcomment from '../subcomp/subcomment.vue'
export default {
    data() {
        return {
            list:[],
            artid:0,
        }
    },
    components : {
        subcomment  //注册私有组件
    },
    created() {
        this.getinfo();
        this.artid=this.$route.params.id;
    },
    methods: {
        getinfo() {
            let id=this.$route.params.id;
            let url = '../../a.json';
            this.$http.get(url).then(res => {
                this.list = res.body.simg.id;
            }, res => {
                console.log('图片获取失败');
            })
        }
    }
}
</script>
<style>

</style>