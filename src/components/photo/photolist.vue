<template>
    <div class="tmpl">
        <!--1.0导航部分-->
        <nav class="nav">
            <ul>
                <li>
                    <a @click='getphoto(全部)'></a>
                </li>
                <li v-for='item in nav'><a @click='getphoto(item.sort)'>{{item.sort}}</a></li>
            </ul>
        </nav>
        <!--2.0图片列表部分-->
        <div class="photolist">
            <ul>
                <li v-for="item in list">
                    <router-link v-bind='{to:"/photo/photoinfo/"+item.id}'>
                        <img v-lazy="item.img">
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [
                // '../../../statics/img/06.jpg',
                // '../../../statics/img/07.jpg',
                // '../../../statics/img/08.jpg',
                // '../../../statics/img/09.jpg',
                // '../../../statics/img/05.jpg',
            ],
            nav: []
        }
    },
    created() {
        this.getnav();
        this.getphoto();
         
    },
    methods: {
        getnav() {
            var url = '../../../a.json';
            this.$http.get(url).then(res => {
                //    console.log(res.body.message1.id) 
                this.nav = res.body.message1;
            }, res => {
                console.log('图片获取失败');
            })
        },
        getphoto(listid) {
           console.log(listid)
            var url = '../../../a.json';
            this.$http.get(url).then(res => {
                //    console.log(res.body.message1.id) 
                this.list = res.body.message1;
            }, res => {
                console.log('图片获取失败');
            })
        }
    }
}
</script>
<style scoped>
.nav {
    font-size: 14px;
    overflow-x: auto;
    overflow-y: hidden;
    max-width: 400px;
}

.nav ul {
    padding-left: 10px;
    width: 600px;
}

.nav ul li {
    list-style: none;
    display: inline-block;
}

.nav ul li a {
    color: dodgerblue;
    padding-right: 5px;
}





/*懒加载图片样式*/

.photolist ul {
    padding: 0;
    margin: 0;
}

.photolist li {
    list-style: none;
}

.photolist img {
    width: 100%;
    height: 300px;
}

image[lazy=loading] {
    width: 100%;
    height: 300px;
    margin: auto;
}
</style>