<template>
  <div>
    <el-card class="app-container" shadow="never">
      <div slot="header" class="clearfix">
        <span>地区配置</span>
      </div>
      <!--       default-expand-all -->
      <el-tree
        :data="treeData"
        v-loading="isLoading"
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        :default-expanded-keys="[-1]"
      >
        <span
          class="custom-tree-node show-hide"
          style="width: 100%"
          slot-scope="{ node, data }"
        >
          <span>
            <i class="el-icon-location" v-if="data.childs.length"></i>
            <i class="el-icon-location-outline" v-if="!data.childs.length"></i>
            {{ node.data.areaName }}
          </span>
          <span style="display: none">
            <i
              class="el-icon-plus"
              style="padding-left: 10px"
              v-permission="['Post_Common_SetAreaDataEdit']"
              @click.stop="() => append(data)"
            ></i>
            <i
              class="el-icon-edit"
              style="padding-left: 10px"
              v-permission="['Post_Common_SetAreaDataUpdateName']"
              v-if="node.data.areaName !== '中国'"
              @click.stop="() => edit(data)"
            ></i>
            <i
              class="el-icon-delete"
              style="padding-left: 10px"
              v-permission="['Post_Common_SetAreaDataDelete']"
              v-if="node.data.areaName !== '中国'"
              @click.stop="() => remove(node, data)"
            ></i>
          </span>
        </span>
      </el-tree>
    </el-card>

    <el-dialog
      :title="isEdit ? '编辑' : '新增'"
      :visible.sync="dialogVisible"
      width="600px"
       :close-on-click-modal='false'
    >
      <el-form
        :model="form"
        ref="form"
        label-width="100px"
        :rules="rules"
        size="small"
        @submit.native.prevent
      >
        <el-form-item label="区域名称" prop="name">
          <el-input v-model="form.name" style="width: 250px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="描述">
          <el-input
            v-model="role.description"
            type="textarea"
            :rows="5"
            style="width: 250px"
          ></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>  

<script>
import {
  getAreaDataList,
  setAreaDataDelete,
  setAreaDataEdit,
  setAreaDataUpdateName,
  getAreaDataDetail,
} from "@/api/areaSettings";

export default {
  name: "areaSettings",
  data() {
    return {
      treeData: [],
      dialogVisible: false,
      isEdit: false,
      isLoading: true,
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
      form: {
        id: null,
        parentId: null,
      },
      defaultProps: {
        children: "childs",
        label: "areaName",
      },
      roleId: null,
      isCreated: false,
    };
  },
  activated() {
    if (!this.isCreated) {
      this.treeList();
    }
    this.isCreated = false;
  },
  created() {
    this.isCreated = true;
    this.treeList();
  },
  methods: {
    handleDialogConfirm() {
      console.log(this.form);
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            setAreaDataUpdateName(this.form).then((response) => {
              if (response.retCode === 200) {
                this.dialogVisible = false;
                this.form = {};
                this.$message({
                  message: "编辑成功！",
                  type: "success",
                  duration: 1000,
                });
                this.treeList();
              }
            });
          } else {
            setAreaDataEdit(this.form).then((response) => {
              if (response.retCode === 200) {
                this.dialogVisible = false;
                this.form = {};
                this.$message({
                  message: "新增成功！",
                  type: "success",
                  duration: 1000,
                });
                this.treeList();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    edit(data) {
      this.isEdit = true;
      getAreaDataDetail({ id: data.areaId }).then((response) => {
        if (response.retCode === 200) {
          this.form = Object.assign({}, response.retData);
          this.dialogVisible = true;
        } else {
          this.$message({
            message: "获取详情失败",
            type: "error",
            duration: 1000,
          });
        }
      });
    },
    append(data) {
      this.isEdit = false;
      this.form = {};
      this.dialogVisible = true;
      this.form.parentId = data.areaId;
    },

    remove(node, data) {
      let params = {};
      params.commonIds = data.areaId;
      // if (data.parentId || data.parentId === 0) {
      //   params.parentId = data.parentId;
      // }
      this.$confirm("是否要进行该删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        setAreaDataDelete(params).then((response) => {
          if (response.retCode === 200) {
            this.$message({
              message: "删除成功！",
              type: "success",
              duration: 1000,
            });
            this.treeList();
          }
        });
      });
    },
    treeList() {
      this.isLoading = true;
      getAreaDataList().then((response) => {
        if (response.retCode === 200) {
          let data = [{ areaId: 0, areaName: "中国", childs: [], id: -1 }];
          data[0].childs = response.retData;
          this.treeData = data;
          this.isLoading = false;
        }
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.show-hide:hover :nth-child(2) {
  display: inline-block !important;
}
</style>
