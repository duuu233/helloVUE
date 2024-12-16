<template>
   
  <div class="app-container">
    <el-card class="box-card">
      <div
        style="
          background-color: #efefef;
          padding-left: 20px;
          margin-bottom: 30px;
        "
        class="clearfix"
      >
        <span>版本信息</span>
      </div>
      <el-form
        :model="appForm"
        ref="refappForm"
        :rules="rules"
        label-width="180px"
        size="small"
      >
        <el-form-item label="APP名称" prop="appTypeId">
          <el-select
            @change="getApplicationList"
            class="input-width"
            v-model="appForm.appTypeId"
            placeholder="请选择APP名称"
          >
            <el-option
              v-show="item.value > 0"
              v-for="(item, index) in selectData"
              :key="index"
              :value="item.value"
              :label="item.text"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上次更新版本号" prop="lastComVersion">
          <el-input
            placeholder="请输入上次更新版本号"
            class="input-width"
            v-model="appForm.lastComVersion"
          ></el-input>
          <i style="padding-left: 6px; font-size: 12px; color: #909399"
            >(版本号填写格式如:2.0.0)</i
          >
        </el-form-item>

        <el-form-item label="版本号" prop="versionNumber">
          <el-input
            placeholder="请输入版本号"
            class="input-width"
            v-model="appForm.versionNumber"
          ></el-input>
          <i style="padding-left: 6px; font-size: 12px; color: #909399"
            >(版本号填写格式如:2.0.0)</i
          >
        </el-form-item>

        <el-form-item label="客户端" prop="terminal" class="form-item-radio">
          <el-radio-group
            placeholder="请选择客户端"
            v-model="appForm.terminal"
            @change="getApplicationList"
          >
            <el-radio
              v-show="item.value > 0 && item.value < 2"
              v-for="item in clientData"
              :key="item.value"
              :label="item.value"
              >{{ item.text }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="安装包地址" prop="attachment">
          <el-input
            placeholder="请输入apk安装包地址"
            style="width:350px"
            v-model="appForm.attachment"
            type="textarea"
            :rows="6"
            maxlength="100"
            show-word-limit
          ></el-input>
          <!-- <file-upload
            v-model="appForm.attachment"
            :defaultAttachmentName="appForm.attachmentName"
            @getAttachmentName="getAttachmentName"
          ></file-upload> -->
        </el-form-item>
        <el-form-item label="二维码图片" prop="codeUrl">
          <single-upload v-model="appForm.codeUrl"></single-upload>
        </el-form-item>

        <div
          class="clearfix"
          style="
            background-color: #efefef;
            padding-left: 20px;
            margin-bottom: 30px;
          "
        >
          <span>升级任务信息</span>
        </div>
        <el-form-item label="权重" prop="grade">
          <el-input
            v-model="appForm.grade"
            placeholder="请输入权重"
            class="input-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="releaseTime">
          <el-date-picker
            style="width: 217px"
            v-model="appForm.releaseTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd"
            placeholder="请发布时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="升级类型"
          prop="compulsory"
          class="form-item-radio"
        >
          <el-radio-group
            v-model="appForm.compulsory"
            placeholder="请选择升级类型"
          >
            <el-radio
              v-show="item.value > 0"
              v-for="item in reminderData"
              :key="item.value"
              :label="item.value"
              >{{ item.text }}</el-radio
            >
          </el-radio-group>
        </el-form-item>

        <el-form-item label="升级提示语" prop="upgradeTips">
          <el-input
            placeholder="请输入升级提示语"
            v-model="appForm.upgradeTips"
            type="textarea"
            class="input-width"
            :rows="4"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <!-- <el-button>取消</el-button> -->
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { valiNumber } from "@/utils/validate";
import { getAppMarketList } from "@/api/applicationStore";
import { setAppVersionEdit, getAppVersionDetail } from "@/api/appVersion";
import fileUpload from "@/components/Upload/fileUpload";
import SingleUpload from "@/components/Upload/singleUpload";
const appForm = {
  appTypeId: null,
  attachment: null,
  compulsory: null,
  id: null,
  releaseTime: null,
  terminal: 1,
  upgradeTips: null,
  versionNumber: null,
  lastComVersion: null,
  grade: null,
  appMarketIdList: "", //应用市场id组合
};
export default {
  name: "config",
  components: { SingleUpload },
  data() {
    const _grade = (rule, value, callback) => {
      setTimeout(() => {
        if (!value) {
          return callback(new Error("权重不能为空"));
        } else if (!valiNumber(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value * 1 > 2147483647) {
            callback(new Error("最大值为2147483647"));
          } else {
            callback();
          }
        }
      }, 400);
    };
    return {
      rules: {
        appTypeId: [
          { required: true, message: "请选择app名称", trigger: "change" },
        ],
        attachment: [
          { required: true, message: "请输入apk安装包地址", trigger: "blur" },
        ],
        compulsory: [
          { required: true, message: "请选择升级类型", trigger: "change" },
        ],
        releaseTime: [
          { required: true, message: "请选择发布时间", trigger: "change" },
        ],
        terminal: [
          { required: true, message: "请选择客户端", trigger: "change" },
        ],
        upgradeTips: [
          { required: true, message: "请输入升级提示语", trigger: "blur" },
        ],
        versionNumber: [
          { required: true, message: "请输入版本号", trigger: "blur" },
        ],
        codeUrl: [
          { required: true, message: "请上传二维码图片", trigger: "change" },
        ],

        lastComVersion: [
          { required: true, message: "请输入上次更新版本号", trigger: "blur" },
        ],
        grade: [{ required: true, validator: _grade, trigger: "blur" }],
      },
      appForm: Object.assign({}, appForm),
      loading: true,
      urlData: [],
      selectData: [],
      clientData: [],
      reminderData: [],
      editType: null,
      applicationId: null,
      aplicationType: null,
      isCreated: false,
    };
  },
  activated() {
    if (!this.isCreated) {
      this.aplicationType = this.$route.query.type;
      if (this.$route.query.applicationId) {
        this.applicationId = this.$route.query.applicationId;
        this.getApplication();
      }
    }
    this.isCreated = false;
  },
  created() {
    this.isCreated = true;
    this.aplicationType = this.$route.query.type;
    if (this.$route.query.applicationId) {
      this.applicationId = this.$route.query.applicationId;
      this.getApplication();
    }
    let allKeyValues = JSON.parse(sessionStorage.getItem("allKeyValues"));
    this.selectData = allKeyValues[2].childs;
    this.clientData = allKeyValues[0].childs;
    this.reminderData = allKeyValues[4].childs;
  },
  filters: {},
  methods: {
    getAttachmentName(v) {
      if (v) {
        this.appForm.attachmentName = v;
      }
    },
    getApplicationList() {
      // 内容做展示判断处理
      this.appForm.terminal == 1
        ? (this.editType = true)
        : (this.editType = false);
      var form = {
        pageIndex: 1,
        pageSize: 10,
        appTypeId: this.appForm.appTypeId,
        terminal: this.appForm.terminal,
      };
      getAppMarketList(form).then((response) => {
        if (response.retCode == 200) {
          this.urlData = response.retData.pageData;
          var arr = [];
          if (this.urlData) {
            for (let item of this.urlData) {
              arr.push(item.id);
            }
          }
          let form = Object.assign({}, this.appForm);
          form.appMarketIdList = arr.join(",");
          this.appForm = form;
        }
      });
    },
    getApplication() {
      getAppVersionDetail({ id: this.applicationId }).then((res) => {
        if (res.retCode == 200) {
          this.getApplicationList();
          this.appForm = Object.assign({}, res.retData);
        }
      });
    },
    submitForm() {
      this.$refs.refappForm.validate((valid) => {
        if (valid) {
          let form = Object.assign({}, this.appForm);
          form.attachmentName = this.appForm.attachment;
          setAppVersionEdit(form).then((response) => {
            if (response.retCode === 200) {
              this.form = {};
              this.$refs.refappForm.resetFields();
              this.urlData = [];
              let message =
                this.aplicationType == "edit" ? "编辑成功" : "新增成功";
              this.$message({
                message: message,
                type: "success",
                duration: 1000,
              });
              this.$router.push({
                path: "/sms/appVersion",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-box {
  text-align: center;
}
.el-card {
  //   min-height: 80vh;
}
</style>


