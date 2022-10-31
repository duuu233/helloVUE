<template>
  <n-upload action="/api/upload/file-upload" @before-upload="beforeUpload" @finish="finish" name="file" :max="1"
    :show-file-list="false">
    <div class="slot-box">
      <n-button>上传文件</n-button>
      <!-- 自定义上传成功文件列表 -->
      <div class="file-list" @click="preview">
        <n-icon size="20">
          <attach-outline />
        </n-icon>
        <div>{{fileName}}</div>
      </div>
    </div>
  </n-upload>
   <!--预览图片-->
   <n-modal
    v-model:show="previewObj.showModal"
    preset="card"
    title="预览"
    :bordered="false"
    :style="{ width: '520px' }"
  >
    <img :src="previewObj.previewUrl" />
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
import { AttachOutline } from '@vicons/ionicons5'
import type { UploadFileInfo } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { basicProps } from './props';
import { isString } from '@/utils/is';
import { ResultEnum } from '@/enums/httpEnum';
import { useGlobSetting } from '@/hooks/setting';
import componentSetting from '@/settings/componentSetting';
import { valueToNode } from '@babel/types';
export default defineComponent({
  components: {
    AttachOutline
  },
  name: 'BasicUploadNk',
  props: {
    ...basicProps,
  },
  emits: ['uploadFinish'],
  setup(props, { emit }) {
    let fileName=ref<string>('')
    const previewObj=reactive({
      showModal:false,
      previewUrl:''
    })

    const fileListRef = ref<UploadFileInfo[]>([])
    const message = useMessage();
      const globSetting = useGlobSetting();
    function checkFileType(fileType: string) {
      return componentSetting.upload.fileType.includes(fileType);
    }
    //上传之前
    function beforeUpload(options) {
      const fileInfo = options.file.file;
      const { maxSize, accept } = props;
      const acceptRef = (isString(accept) && accept.split(',')) || [];

      // 设置最大值，则判断
      if (maxSize && fileInfo.size / 1024 / 1024 >= maxSize) {
        message.error(`上传文件最大值不能超过${maxSize}M`);
        return false;
      }

      // 设置类型,则判断
      const fileType = componentSetting.upload.fileType;
      if (acceptRef.length > 0 && !checkFileType(fileInfo.type)) {
        message.error(`只能上传文件类型为${fileType.join(',')}`);
        return false;
      }

      return true;
    }
    //组装完整图片地址
    function getImgUrl(url: string): string {
      const { imgUrl } = globSetting;
      return /(^http|https:\/\/)/g.test(url) ? url : `${imgUrl}${url}`;
    }
     function preview(){
      previewObj.showModal=true
      
     }
    //上传结束
    function finish({ event: Event }) {
      const res = eval('(' + Event.target.response + ')');
      const infoField = componentSetting.upload.apiSetting.infoField;
      const { code } = res;
      const messageText = res.msg || res.message || '上传失败';
      const result = res[infoField];
      console.log(res)
      fileName.value=res.data.name
   
      previewObj.previewUrl=getImgUrl(res.data.url)
      console.log(previewObj.previewUrl)
      emit('uploadFinish', res.data.url);

      //成功
      if (code === ResultEnum.SUCCESS) {
        console.log(result)


      } else {
        message.error(messageText)
      }
    }
    return {
      fileList: fileListRef,
      beforeUpload,
      finish,
      fileName,
      previewObj,
      preview
    }
  }
})
</script>
<style lang="less" scoped>
  .slot-box{
    display: flex;
    align-items: center;
    .file-list{
      cursor: pointer;
      display: flex;
    align-items: center;
    }
  }
</style>