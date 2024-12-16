<template>
  <div class="upload">
    <el-upload
      class="upload-box"
      :class="{ hide: hideUploadEdit }"
      :action="fileUploadUrl"
      list-type="picture-card"
      :on-preview="handlePreview"
      :on-success="handleUploadSuccess"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :on-change="handleEditChange"
      :limit="maxCount"
      :before-upload="beforeAvatarUpload"
      multiple
      :file-list="fileList"
      name="fileParam"
      accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
    >
      <i class="el-icon-plus"></i>
      <div class="maxCount-box">
        ({{ value.length ? value.length : 0 }}/{{ maxCount }})
      </div>
    </el-upload>
    <div v-if="showRadio">
      <div class="radio" v-for="(item, index) in value" :key="index">
        <el-radio
          @change="handleRadio(index)"
          v-model="radio"
          :label="index"
          border
          :style="'left:' + index * 108 + 'px'"
          >设为主图</el-radio
        >
      </div>

      <div class="ps">
        <p>
          1.请上传至少1张主图，主图应包含商品正反面外包装图；若涉及活动，请在图片上清晰显示活动时间和活动方式
        </p>
        <p>
          2.图片支持png、jpg、jpeg格式;建议图片尺寸为600*600px,或更大的尺寸；图片大小请小于1M
        </p>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'multiUpload',
  props: {
    value: {
      type: Array,
      default: []
    },
    //最大上传图片数量
    maxCount: {
      type: Number,
      default: 5
    },
    showRadio: {
      type: Boolean,
      default: false
    },
    defaultProductImageIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: null,
      fileUploadUrl: process.env.BASE_UPLOAD,
      hideUploadEdit: false,
      radio: this.defaultProductImageIndex,
      isOK: true //是否符合上传图片的要求
    }
  },
  computed: {
    fileList() {
      let fileList = []
      if (this.value && this.value.length)
        for (let i = 0; i < this.value.length; i++) {
          fileList.push({ url: this.value[i] })
        }
      this.handleEditChange()
      return fileList
    }
  },
  watch: {
    defaultProductImageIndex(v, old) {
      this.radio = v
    }
  },
  created() {},
  mounted() {},

  methods: {
    beforeAvatarUpload(file) {
      let _this = this
      return new Promise(function(resolve, reject) {
        const isLt1M = file.size / 1024 / 1024 < 1
        if (!isLt1M) {
          _this.$message.error('上传图片大小不能超过1MB!')
          return reject(false)
        }
        if (_this.showRadio) {
          //需要校验1:1
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function(event) {
            var txt = event.target.result
            var img = document.createElement('img')
            img.src = txt
            img.onload = function() {
              if (img.width !== img.height) {
                _this.$message.error('请上传尺寸比例为1:1的图片')
                return reject(false)
              } else {
                return resolve(true)
              }
            }
          }
        } else {
          return resolve(true)
        }
      })
    },
    handleRadio(index) {
      this.$emit('getDefaultProductImageIndexFn', index)
    },
    handleRemove(file, fileList) {
      if (this.value.length && file.status === 'success') {
        this.value.forEach((v, i) => {
          if (v === file.url) {
            this.value.splice(i, 1)
            this.hideUploadEdit = this.value.length >= this.maxCount
          }
        })
      } else {
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    handlePreview(file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },

    handleUploadSuccess(res, file) {
      if (res.retCode === 200) {
        this.value.push(res.retData)
      }
    },
    handleExceed(files, fileList) {
      this.$message({
        message: '最多只能上传' + this.maxCount + '张图片',
        type: 'warning',
        duration: 1000
      })
    },
    handleEditChange(file, fileList) {
      this.hideUploadEdit = this.value.length >= this.maxCount
    }
  }
}
</script>
<style lang="scss" scoped>
.upload {
  position: relative;
  margin-bottom: 30px;

  p {
    color: #8c939d;
  }
}
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
::v-deep .maxCount-box {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  color: #8c939d;
  z-index: 10;
}
::v-deep .el-icon-zoom-in {
  font-size: 20px;
}
::v-deep .hide .el-upload--picture-card {
  display: none;
}
.radio {
  ::v-deep .el-radio {
    position: absolute;
    bottom: 76px;
    left: 40px;
  }
}
.ps {
  margin-top: 33px;
}
::v-deep .el-upload-list__item {
  transition: none !important;
}
</style>
