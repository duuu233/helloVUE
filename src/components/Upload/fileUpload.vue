<template>
  <div>
    <!-- :on-exceed="handleExceed" -->
    <!--     :before-remove="beforeRemove" -->
    <el-upload
      class="upload-box"
      :action="fileUploadUrl"
      :before-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-change="handleEditChange"
      :before-upload="beforeAvatarUpload"
      :class="{ hide: hideUploadEdit }"
      :file-list="fileList"
      :on-progress="progress"
      :on-error="error"
      name="fileParam"
      accept=".apk"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" v-show="!hideUploadEdit" class="el-upload__tip">
        只能上传.apk文件，且不超过100M
      </div>
    </el-upload>
    <!-- <el-upload
      class="upload-box"
      :action="fileUploadUrl"
      list-type="picture-card"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-change="handleEditChange"
      :before-upload="beforeAvatarUpload"
      :class="{ hide: hideUploadEdit }"
      :file-list="fileList"
      name="fileParam"
      accept=".apk"
    >
      <i class="el-icon-plus"></i>
    </el-upload> -->
  </div>
</template>
<script>
export default {
  name: 'singleUpload',
  props: {
    value: String,
    defaultAttachmentName: String
  },
  watch: {
    // value(v, old) {
    //   this.imgUrl = v;
    //   this.handleEditChange();
    // },
  },
  computed: {
    fileList() {
      let fileList = []
      if (this.value) {
        fileList.push({ url: this.value, name: this.fileName })
        this.hideUploadEdit = true
      } else {
        this.hideUploadEdit = false
      }

      return fileList
    }
  },
  mounted() {},
  watch: {
    defaultAttachmentName(v, old) {
      this.fileName = v
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: null,
      fileUploadUrl: process.env.BASE_BIGUPLOAD,
      hideUploadEdit: false,
      imgUrl: '',
      fileName: this.defaultAttachmentName,
      loading: null
    }
  },
  methods: {
    error() {
      this.hideUploadEdit = false
      this.loading.close()
      this.$message.error('上传文件失败')
    },
    progress() {
      this.hideUploadEdit = true
      this.loading = this.$loading({
        lock: true,
        text: '上传中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 100
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 100MB!')
      }
      return isLt1M
    },
    handleRemove(file, fileList) {
      return new Promise((resolve, reject) => {
        this.$confirm('是否要删除该文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$emit('input', '')
            this.hideUploadEdit = false
            return resolve(true)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消修改'
            })
            return reject(false)
          })
      })
    },

    handlePreview(file) {
      // this.dialogVisible = true;
      // this.dialogImageUrl = file.url;
    },

    handleUploadSuccess(res, file) {
      if (res.retCode === 200) {
        this.fileName = file.name
        this.$emit('getAttachmentName', file.name)
        this.$emit('input', res.retData)
        // this.$emit("getImgUrl", res.retData);
      }
      this.loading.close()
    },
    handleEditChange(file, fileList) {
      this.hideUploadEdit = this.fileList.length ? true : false
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-box {
  display: flex;
  align-items: center;
}
::v-deep .el-upload__tip {
  margin-top: 0;
  padding-left: 10px;
}
::v-deep .hide .el-button--primary {
  display: none;
}
::v-deep .el-upload-list__item:first-child {
  margin-top: 0;
}
::v-deep .el-upload-list__item {
  line-height: 32px;
  height: 32px;
}
::v-deep .el-icon-close-tip {
  display: none;
  z-index: -998;
}
::v-deep .el-upload-list__item {
  transition: none !important;
}
</style>
