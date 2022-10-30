<template>
<n-upload
    action="/api/upload/file-upload"
 
            @before-upload="beforeUpload"
            @finish="finish"
    
    name="file"
  >
    <n-button>上传文件</n-button>
  </n-upload>
</template>

<script lang="ts">
import { defineComponent, ref,reactive,watch} from 'vue'
import type { UploadFileInfo } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { basicProps } from './props';
import { isString } from '@/utils/is';
import { ResultEnum } from '@/enums/httpEnum';
import { useGlobSetting } from '@/hooks/setting';
import componentSetting from '@/settings/componentSetting';
import { valueToNode } from '@babel/types';
export default defineComponent({
  name: 'BasicUploadNk',
  props: {
    ...basicProps,
  },
  emits: ['uploadChange'],
  setup(props, { emit }) {
 
    const globSetting = useGlobSetting();
    const fileListRef = ref<UploadFileInfo[]>([])
    const message = useMessage();
    function checkFileType(fileType: string) {
      return componentSetting.upload.fileType.includes(fileType);
    }
    //上传之前
    function beforeUpload({ file }) {
      console.log(44)
      const fileInfo = file.file;
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
      // function getImgUrl(url: string): string {
      //   const { imgUrl } = globSetting;
      //   return /(^http|https:\/\/)/g.test(url) ? url : `${imgUrl}${url}`;
      // }
    // const state = reactive({
    //     showModal: false,
    //     previewUrl: '',
    //     originalImgList: [] as string[],
    //     imgList: [] as string[],
    //   });
    //上传结束
    function finish({ event: Event }) {
        const res = eval('(' + Event.target.response + ')');
        const infoField = componentSetting.upload.apiSetting.infoField;
        const { code } = res;
        const messageText = res.msg || res.message || '上传失败';
        const result = res[infoField];
        console.log(res)
        emit('uploadChange', res.data.url);
  
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
      finish
    }
  }
})
</script>