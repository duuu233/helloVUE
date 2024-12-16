<template>
  <div>
    <el-card class="app-container" shadow="never">
      <div slot="header" class="clearfix">
        <span>部门管理</span>
      </div>
      <el-tree
        :data="menuTreeList"
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
      >
        <span
          class="custom-tree-node show-hide"
          style="width: 100%"
          slot-scope="{ node, data }"
        >
          <span class="handle-btns">
            <i class="el-icon-s-home" v-if="data.childs.length"></i>
            <i class="el-icon-s-order" v-if="!data.childs.length"></i>
            {{ node.data.dpName }}
          </span>
          <span style="display: none">
            <el-tooltip
              class="item"
              effect="dark"
              content="新增"
              placement="top"
            >
              <i
                v-permission="['Post_Jurisdiction_setDepartment']"
                class="el-icon-plus"
                style="padding-left: 10px"
                @click.stop="() => append(data, node)"
              ></i>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <i
                v-permission="['Post_Jurisdiction_setDepartment']"
                class="el-icon-edit"
                style="padding-left: 10px"
                v-if="[0].indexOf(data.id) === -1"
                @click.stop="() => edit(data)"
              ></i>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <i
                v-permission="['Post_Jurisdiction_setDelDepartment']"
                class="el-icon-delete"
                style="padding-left: 10px"
                v-if="[0].indexOf(data.id) === -1"
                @click.stop="() => remove(node, data)"
              ></i>
            </el-tooltip>
          </span>
        </span>
      </el-tree>
    </el-card>

    <el-dialog
      :title="isEdit ? '编辑部门' : '新增部门'"
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
        <el-form-item label="部门名称" prop="dpName">
          <el-input v-model="form.dpName" style="width: 250px"></el-input>
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
import { getDepartments, setFetchTreeList, setDelDepartment } from "@/api/menu";
import { listMenuByRole, allocMenu } from "@/api/role";
import { validateC_E_N } from "@/utils/validate";
export default {
  name: "department",
  data() {
    const _dpName = (rule, value, callback) => {
      setTimeout(() => {
        if (!value) {
          return callback(new Error("部门名称不能为空"));
        } else if (!validateC_E_N(value)) {
          return callback(new Error("请输入中英文或数字"));
        } else if ((value + "").length < 2 || (value + "").length > 8) {
          return callback(new Error("请输入2~8个中英文数字"));
        } else {
          callback();
        }
      }, 400);
    };
    return {
      menuTreeList: [],
      dialogVisible: false,
      isEdit: false,

      rules: {
        dpName: [{ required: true, validator: _dpName, trigger: "blur" }],
      },
      form: {
        id: null,
        parentId: null,
      },
      defaultProps: {
        children: "childs",
        label: "dpName",
      },
      roleId: null,
      isCreated: false,
    };
  },
  activated() {
    if (!this.isCreated) {
      this.roleId = this.$route.query.roleId;
      this.treeList();
    }
    this.isCreated = false;
  },
  created() {
    this.isCreated = true;
    this.roleId = this.$route.query.roleId;
    this.treeList();
    // this.getRoleMenu(this.roleId);
  },
  methods: {
    handleDialogConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            setFetchTreeList(this.form).then((response) => {
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
            setFetchTreeList(this.form).then((response) => {
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
      this.form = Object.assign({}, data);

      // if (data.parentId || data.parentId === 0) {
      //   this.form.parentId = data.parentId;
      // }

      this.dialogVisible = true;
    },
    append(data, node) {
      if (node.level >= 10) {
        this.$message({
          message: "最多添加至10级子项",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.isEdit = false;
      this.form = {};
      this.dialogVisible = true;
      this.form.parentId = data.id;
      // if (data.parentId || data.parentId === 0) {
      //   this.form.parentId = data.parentId;
      // }
    },

    remove(node, data) {
      let params = {};
      params.id = data.id;
      if (data.parentId || data.parentId === 0) {
        params.parentId = data.parentId;
      }
      this.$confirm("是否要进行该删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        setDelDepartment(params).then((response) => {
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
      getDepartments().then((response) => {
        this.menuTreeList = response.retData;
      });
    },
    getRoleMenu(roleId) {
      listMenuByRole(roleId).then((response) => {
        let menuList = response.data;
        let checkedMenuIds = [];
        if (menuList != null && menuList.length > 0) {
          for (let i = 0; i < menuList.length; i++) {
            let menu = menuList[i];
            if (menu.parentId !== 0) {
              checkedMenuIds.push(menu.id);
            }
          }
        }
        this.$refs.tree.setCheckedKeys(checkedMenuIds);
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
