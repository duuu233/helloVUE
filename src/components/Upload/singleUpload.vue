<template>
  <div>
    <!--   :on-remove="handleRemove" -->
    <el-upload
      class="upload-box"
      :action="fileUploadUrl"
      list-type="picture-card"
      :before-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-change="handleEditChange"
      :before-upload="beforeAvatarUpload"
      :class="{ hide: hideUploadEdit }"
      :file-list="fileList"
      name="fileParam"
      accept=".jpg,.jpeg,.png"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'singleUpload',
  props: {
    value: String,
    isLook: {
      type: Boolean,
      default: false
    }
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
        fileList.push({ url: this.value })
        this.hideUploadEdit = true
      } else {
        this.hideUploadEdit = false
      }

      return fileList
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: null,
      fileUploadUrl: process.env.BASE_UPLOAD,
      hideUploadEdit: false,
      imgUrl: ''
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!')
      }
      return isLt1M
    },
    handleRemove(file, fileList) {
      let _this = this
      return new Promise((resolve, reject) => {
        if (this.isLook) {
          this.$message({
            type: 'warning',
            message: '无效的操作'
          })
          return reject(false)
        }
        this.$confirm('是否要删除该图片?', '提示', {
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
            // this.getList();
          })
      })
    },

    handlePreview(file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },

    handleUploadSuccess(res, file) {
      console.log(file)
      if (res.retCode === 200) {
        this.$emit('input', res.retData)
        // this.$emit("getImgUrl", res.retData);
      }
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
}
::v-deep .el-upload--picture-card {
  width: 100px;
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;
}
::v-deep .el-upload-list__item {
  width: 100px;
  height: 100px;
}
::v-deep .hide .el-upload--picture-card {
  display: none;
}
::v-deep .el-icon-zoom-in {
  font-size: 20px;
}
::v-deep .el-upload-list__item {
  transition: none !important;
}
::v-deep .el-icon-close-tip {
  display: none;
  z-index: -99;
}
</style>
