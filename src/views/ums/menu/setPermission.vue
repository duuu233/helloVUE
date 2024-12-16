<template>
  <el-card class="app-container" shadow="never">
    <div slot="header" class="clearfix">
      <span>设置权限</span>
    </div>
    <!--   show-checkbox  -->
    <el-tree
      :data="menuTreeList"
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :default-checked-keys="permissionIds"
      :props="defaultProps"
    >
      <span
        class="custom-tree-node show-hide"
        style="width: 100%"
        slot-scope="{ node, data }"
      >
        <!-- <i class="el-icon-s-home" v-show="data.childs.length"></i>
        <i class="el-icon-s-order" v-show="!node.data.childs.length"></i> -->
        <span> {{ node.data.appName }} ({{ node.data.appCode }}) </span>
        <span style="display: none">
          <el-tooltip class="item" effect="dark" content="新增" placement="top">
            <i
              class="el-icon-plus"
              style="padding-left: 10px"
              @click.stop="() => add(data)"
            ></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i
              class="el-icon-edit"
              style="padding-left: 10px"
              v-if="[0].indexOf(data.id) === -1"
              @click.stop="() => edit(data)"
            ></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i
              class="el-icon-delete"
              style="padding-left: 10px"
              v-if="[0].indexOf(data.id) === -1"
              @click.stop="() => remove(node, data)"
            ></i>
          </el-tooltip>
        </span>
      </span>
    </el-tree>
    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">保 存</el-button>
      <el-button @click="goBack()">返回</el-button>
    </div>

    <el-dialog
      :title="isEdit ? '编辑' : '新增'"
      :visible.sync="dialogVisible"
      width="600px"
       :close-on-click-modal='false'
    >
      <el-form
        :model="form"
        ref="form"
        label-width="150px"
        :rules="rules"
        size="small"
        @submit.native.prevent
      >
        <el-form-item label="模块名称" prop="appName">
          <el-input v-model="form.appName" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="模块编码" prop="appCode">
          <el-input v-model="form.appCode" style="width: 350px"></el-input>
        </el-form-item>
        <el-form-item label="URL路径" prop="appUrl" >
          <el-input v-model="form.appUrl" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="是否导航" prop="isNav" class="form-item-radio">
          <el-radio-group v-model="form.isNav" >
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否刷新" prop="isRefresh" class="form-item-radio">
          <el-radio v-model="form.isRefresh" :label="1">是</el-radio>
          <el-radio v-model="form.isRefresh" :label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="权重" prop="grade">
          <el-input v-model="form.grade" class="input-width"></el-input>
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
  </el-card>
</template>

<script>
import {
  getAdminAppliBySys,
  setAdminAppli,
  setDelAdminAppli,
  getAdminAppliDetails,
} from "@/api/menu";
import { listMenuByRole, allocMenu } from "@/api/role";

export default {
  name: "setPermission",
  data() {
    return {
      menuTreeList: [],
      form: {
        id: 0,
        parentId: null,
        isNav: 1,
        isRefresh: 1,
        systemId: null,
      },
      isEdit: false,
      dialogVisible: false,
      permissionIds: [],

      defaultProps: {
        children: "childs",
        label: "appName",
      },
      id: null,
      rules: {
        appName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        appCode: [
          { required: true, message: "请输入编码", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
      isCreated: false,
    };
  },
  activated() {
    if (!this.isCreated) {
      this.id = this.$route.query.id;
      this.treeList();
    }
    this.isCreated = false;
  },
  created() {
    this.isCreated = true;
    this.id = this.$route.query.id;
    this.treeList();
  },
  methods: {
    handleDialogConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            setAdminAppli(this.form).then((response) => {
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
            console.log(this.form);
            setAdminAppli(this.form).then((response) => {
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
      getAdminAppliDetails({ id: data.id }).then((res) => {
        if (res.retCode === 200) {
          this.form = { ...res.retData };
        }
      });
      this.dialogVisible = true;
    },
    add(data) {
      this.isEdit = false;
      this.form = {
        id: 0,
        parentId: data.id,
        isNav: 1,
        isRefresh: 1,
        systemId: 0,
      };

      this.form.systemId = this.id * 1;
      this.dialogVisible = true;
      // if (data.parentId || data.parentId === 0) {
      //   this.form.parentId = data.parentId;
      // }
    },

    remove(node, data) {
      let params = {};
      params.id = data.id;
      //   if (data.parentId || data.parentId === 0) {
      //     params.parentId = data.parentId;
      //   }
      this.$confirm("是否要进行该删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        setDelAdminAppli(params).then((response) => {
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
      getAdminAppliBySys({ id: this.id }).then((response) => {
        if (response.retCode === 200) {
          this.menuTreeList = response.retData;
        }
      });
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang='scss'>
.show-hide:hover :nth-child(2) {
  display: inline-block !important;
}
</style>
