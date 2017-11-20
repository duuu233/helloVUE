<template>
    <div class="subtmpl">
        <div class="left"
             @click="subtract">-</div>
        <div class="middle">{{count}}</div>
        <div class="right"
             @click="add">+</div>
    
    </div>
</template>
<script>
export default {
    data() {
        return {
            count: 1
        }
    },
    methods: {
        subtract() {
            if (this.count <= 1) {
                this.count = 1;
                return;
            }
            this.count--;
            this.deliver();
        },
        add() {
            this.count++;
            this.deliver();
        },
        deliver() {
            let key = 'count';
            this.$emit(key, this.count)
        }//定义这个方法将count值通知给父组件,
        //当点击的时候就会触发父组件（goodsinfo）里的getcount()
    }
}
</script>
<style scoped>
.subtmpl div {
    display: inline-block;
    width: 60px;
    height: 40px;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
    border: 1px solid rgba(92, 92, 92, .5);
}
</style>