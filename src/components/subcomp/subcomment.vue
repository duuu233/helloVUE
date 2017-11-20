<template>
    <!--评论子组件-->
    <div class="tmpl">
        <div class="submittitle">
            提交评论
        </div>
        <div class="submitarea">
            <textarea class="textarea"
                      placeholder="请输入评论内容"
                      ref="postcontent"></textarea>
            <mt-button type="primary"
                       size="large"
                       @click='postcomment'>发表</mt-button>
        </div>
        <div class="commenttitle">
            评论列表
        </div>
        <div class="commentlist">
            <div class="lists"
                 v-for="item in comments">
                <div class="content">{{item.content}}</div>
                <div class="user">{{item.user}}</div>
                <div class="time">{{item.time}}</div>
            </div>
            <!--<div class="lists">
                            <div class="content">这个人很懒</div>
                            <div class="user">用户名</div>
                            <div class="time">2018-13-32</div>
                        </div>
                        <div class="lists">
                            <div class="content">这是一个评论</div>
                            <div class="user">用户名</div>
                            <div class="time">2018-13-32</div>
                        </div>-->
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            comments: [{ "content": '这是第一个评论', "user": '李白', "time": '2015/03/11/23:50' },
            { "content": '这是第二个评论', "user": 'hellovue', "time": '2016/03/11/13:20' },
            ],//用来存放单钱数据的评论信息列表
        }
    },
    created() {

    },
    methods: {
        //1.0 提交评论

        postcomment() {

            let commentText = this.$refs.postcontent.value;
            if (!commentText || commentText.trim().length <= 0) {
                Toast('评论不能为空');
                return;
            }
            // console.log(commentText);
            Toast('评论成功');
            //  this.comments=this.comments.concat(this.$refs.postcontent.value)
            // this.comments=this.comments.concat(arr[{ "content":'commentText', "user": '李白', "time": '2015-03-11' }])
            let newc = this.comments.unshift({ "content": commentText, "user": '李白', "time": '2017/03/12/13:36' })

            this.$refs.postcontent.value = '';


        },
        //2.0 获取评论
        getcomment() {

        }
    },
    props: ['artid']//用来接收当前评论的所属内容的id


}
</script>
<style scoped>
.tmpl {
    padding: 5px;
}

.submittitle {
    padding-bottom: 8px;
}

.textarea {
    padding: 0 8px;
    font-size: 12px;
    height: 60px;
}

.commenttitle {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, .4);
}

.commentlist .lists {
    border-bottom: 1px solid rgba(0, 0, 0, .4);
    clear: both;
    max-height: 80px;
    overflow-y: auto;
    padding: 5px;
    font-size: 14px;
}

.commentlist .user {
    float: left;
    width: 50%;
    font-size: 12px;
    color: deepskyblue;
}

.commentlist .time {
    /*width: 50%;*/
    float: right;
    font-size: 12px;
}
</style>