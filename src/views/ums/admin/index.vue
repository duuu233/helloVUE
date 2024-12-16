<template>
   
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small">
          <el-form-item label="输入搜索">
            <el-input
              v-model="listQuery.keyword"
              class="input-width"
              placeholder="帐号/姓名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="fr">
            <el-button
              type="primary"
              @click="handleSearchList()"
              size="small"
              icon="el-icon-search"
            >
              查询
            </el-button>
            <el-button
              @click="handleResetSearch()"
              size="small"
              icon="el-icon-refresh"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <div>
        <i class="el-icon-tickets"></i>
        <span>员工列表</span>
      </div>
      <el-button
        size="small"
        class="btn-add"
        @click="handleAdd()"
        v-permission="['Post_Jurisdiction_setAdminStaff']"
        style="margin-left: 20px"
        icon="el-icon-plus"
        type="primary"
        >添加</el-button
      >
    </el-card>
    <div class="table-container">
      <el-table
        ref="adminTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
        :header-cell-style="{
          background: '#F2F6FA',
          color: '#555555',
          'text-align': 'center',
        }"
      >
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="姓名(账号)" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <!-- <el-table-column label="昵称" align="center">
          <template slot-scope="scope">{{ scope.row.nickName }}</template>
        </el-table-column> -->
        <el-table-column label="所属部门" align="center">
          <template slot-scope="scope">{{ scope.row.dpName }}</template>
        </el-table-column>
        <el-table-column label="角色" align="center">
          <template slot-scope="scope">{{ scope.row.roleNames }}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{
            scope.row.joinTime | formatDateTime
          }}</template>
        </el-table-column>
        <el-table-column label="状态" width="120" align="center">
          <template slot-scope="scope">
            <span :class="scope.row.verify ? 'enable_txt' : 'disable_txt'">{{
              scope.row.verify ? "启用" : "禁用"
            }}</span></template
          >
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              v-permission="['Post_Jurisdiction_setAdminStaffVerify']"
              @change="handleStatusChange($event, scope.row)"
              :active-value="1"
              :inactive-value="0"
              :disabled="scope.row.isSysAdmin === 1"
              v-model="scope.row.verify"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-row class="handle-table-box">
              <el-button
                size="mini"
                type="primary"
                v-show="scope.row.isSysAdmin === 0"
                v-permission="['Post_Jurisdiction_setAdminStaffBindRoles']"
                @click="handleSelectRole(scope.$index, scope.row)"
                >绑定角色
              </el-button>
              <el-button
                size="mini"
                type="primary"
                v-show="scope.row.isSysAdmin === 0"
                v-permission="['Post_Jurisdiction_setAdminStaff']"
                @click="handleUpdate(scope.$index, scope.row)"
              >
                编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                v-show="scope.row.isSysAdmin === 0"
                v-permission="['Post_Jurisdiction_setDelAdminStaff']"
                @click="handleDelete(scope.$index, scope.row)"
                >删除
              </el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="clearfix">
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :current-page.sync="listQuery.pageIndex"
          :page-size="listQuery.pageSize"
          :page-sizes="[10, 20, 30]"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="isEdit ? '编辑员工' : '添加员工'"
      :visible.sync="dialogVisible"
      width="800px"
      @close="resetDialog"
      :close-on-click-modal="false"
    >
      <el-form
        :rules="rules"
        :model="admin"
        ref="adminForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="登录帐号" prop="adminName">
          <el-input
            v-model="admin.adminName"
            style="width: 250px"
            placeholder="请输入登录帐号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEdit">
          <el-input
            v-model="admin.password"
            :type="pwdType"
            style="width: 250px"
            placeholder="请输入登录密码"
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span
              slot="suffix"
              @click="showPwd"
              v-show="pwdType === 'password'"
            >
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd" v-show="!pwdType">
              <i class="el-icon-view" style="color: #409eff"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" v-else prop="passwordEdit">
          <el-input
            v-model="admin.passwordEdit"
            :type="pwdType"
            style="width: 250px"
            placeholder="请输入登录密码"
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span
              slot="suffix"
              @click="showPwd"
              v-show="pwdType === 'password'"
            >
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd" v-show="!pwdType">
              <i class="el-icon-view" style="color: #409eff"></i>
            </span>
          </el-input>
          <i style="font-size: 12px; padding-left: 6px">输入密码则更新密码</i>
        </el-form-item>
        <el-form-item label="姓名" prop="trueName">
          <el-input v-model="admin.trueName" style="width: 250px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="绑定区域">
          <el-cascader
            
            v-model="admin.countyId"
            :options="AreaList"
            style="width: 250px"
            :props="{
              children: 'childs',
              label: 'areaName',
              value: 'areaId',
              checkStrictly: false,
              emitPath: false,
            }"
            filterable
          ></el-cascader>
        </el-form-item> -->

        <el-form-item label="所属部门" prop="departmentId">
          <el-select
            v-model="admin.departmentId"
            placeholder="选择部门"
            clearable
            style="width: 250px"
          >
            <el-option
              v-for="item in departmentList"
              :key="item.id"
              :label="item.dpName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="昵称" prop="nickName">
          <el-input v-model="admin.nickName" style="width: 250px"> </el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :title="roleTitle"
      :visible.sync="roleDialogVisible"
      width="60%"
      @close="roleClose()"
      class="clearfix"
      :close-on-click-modal="false"
    >
      <el-card
        class="filter-container"
        shadow="never"
        style="margin-bottom: 10px"
      >
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="roleListQuery" size="small">
            <el-form-item label="输入搜索">
              <el-input
                v-model="roleListQuery.keyword"
                class="input-width"
                placeholder="搜索关键词"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item class="fr">
              <el-button
                type="primary"
                @click="roleHandleSearchList()"
                size="small"
              >
                查询
              </el-button>
              <el-button @click="roleHandleResetSearch()" size="small">
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-table
        ref="roleTable"
        :data="roleList"
        style="width: 100%"
        v-loading="listLoading"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="角色名称" align="center">
          <template slot-scope="scope">{{ scope.row.roleNameCode }}</template>
        </el-table-column>
        <el-table-column label="状态" width="160" align="center">
          <template slot-scope="scope">
            <span :class="scope.row.verify ? 'enabled' : ''">{{
              scope.row.verify ? "启用" : "禁用"
            }}</span></template
          >
        </el-table-column>
      </el-table>
      <div class="clearfix">
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="roleHandleSizeChange"
            @current-change="roleHandleCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="roleListQuery.pageSize"
            :page-sizes="[10, 20, 30]"
            :current-page.sync="roleListQuery.pageIndex"
            :total="roleTotal"
          >
          </el-pagination>
        </div>
      </div>
      <div class="clearfix" style="padding: 10px 10px 0 0">
        <el-button
          type="primary"
          size="small"
          style="float: right"
          @click="saveBindRoles"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAdminStaffs,
  setAdminStaffBindRoles,
  setAdminStaffVerify,
  setDelAdminStaff,
  setAdminStaff,
  getAdminStaffDetails,
  getRoleByAdminStaff,
} from "@/api/login";
import { getAreaDataList } from "@/api/config";
import { getDepartments } from "@/api/menu";
import { isArr } from "@/utils/index";
import { formatDate } from "@/utils/date";
import { validateC_E_N, validateE_N } from "@/utils/validate";

import md5 from "js-md5";
const defaultListQuery = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null,
};
const defaultAdmin = {
  id: null,
  adminName: null,
  trueName: null,
  password: null,
  nickName: null,
  departmentId: null,
  countyId: 3005,
};
const roleDefaultListQuery = {
  pageIndex: 1,
  pageSize: 10,
  id: null,
  keyword: null,
};
export default {
  name: "adminList",
  data() {
    const _adminName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入登录账号"));
      } else if (!validateC_E_N(value)) {
        return callback(new Error("请输入中英文或数字"));
      } else if ((value + "").length < 2 || (value + "").length > 20) {
        return callback(new Error("请输入2~20个中英文数字"));
      } else {
        callback();
      }
    };
    const _password = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入登录密码"));
      } else if (!validateE_N(value)) {
        return callback(new Error("请输入6~20个英文数字或下划线"));
      } else if ((value + "").length < 6 || (value + "").length > 20) {
        return callback(new Error("请输入6~20个英文数字或下划线"));
      } else {
        callback();
      }
    };
    const _passwordEdit = (rule, value, callback) => {
      if (value && !validateC_E_N(value)) {
        return callback(new Error("请输入6~20个英文数字或下划线"));
      } else if (
        (value && (value + "").length < 6) ||
        (value && (value + "").length > 20)
      ) {
        return callback(new Error("请输入6~20个英文数字或下划线"));
      } else {
        callback();
      }
    };
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      admin: Object.assign({}, defaultAdmin),
      isEdit: false,
      roleTitle: "",
      pwdType: "password",
      roleDialogVisible: false,
      oldBindRoleIds: [], //以前绑定的ID集合，用于判断用户是否改变了绑定角色，没有则不请求修改接口
      checkedBindRoleIds: [], //现在绑定的ID集合
      roleList: [],
      AreaList: [],
      roleTotal: null,
      roleListQuery: Object.assign({}, roleDefaultListQuery),
      rules: {
        adminName: [
          {
            required: true,
            validator: _adminName,
            trigger: "blur",
          },
        ],
        nickName: [
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            validator: _password,
            trigger: "blur",
          },
        ],
        passwordEdit: [
          {
            validator: _passwordEdit,
            trigger: "blur",
          },
        ],
        trueName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        departmentId: [
          { required: true, message: "请选择所属部门", trigger: "change" },
        ],
        countyId: [
          { required: true, message: "请选择绑定区域", trigger: "change" },
        ],
      },
      departmentList: [],
      isCreated: false,
    };
  },
  activated() {
    if (!this.isCreated) {
      this.getAreaDataList();
      this.getList();
      this.getDepartmentList();
    }
    this.isCreated = false;
  },
  created() {
    this.isCreated = true;
    this.getAreaDataList();
    this.getList();
    this.getDepartmentList();
    // this.getAllRoleList();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    resetDialog() {
      this.$refs.adminForm.resetFields();
    },
    getAreaDataList() {
      getAreaDataList().then((response) => {
        if (response.retCode === 200) {
          this.AreaList = response.retData;
          this.AreaList.forEach((v, i) => {
            if (v.childs.length) {
              v.childs.forEach((value, index) => {
                if (value.childs.length) {
                  value.childs.forEach((j, k) => {
                    delete j.childs;
                  });
                }
              });
            }
          });
        }
      });
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    roleHandleResetSearch() {
      let adminStaffId = this.roleListQuery.id;
      this.roleListQuery = Object.assign({}, roleDefaultListQuery);
      this.roleListQuery.id = adminStaffId;
      this.getRoleList();
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
    },
    saveBindRoles() {
      this.checkedBindRoleIds = [];
      if (this.multipleSelection.length) {
        this.multipleSelection.forEach((v, i) => {
          this.checkedBindRoleIds.push(v.id);
        });
      }

      //改变再请求接口
      if (!isArr(this.checkedBindRoleIds, this.oldBindRoleIds)) {
        if (!this.checkedBindRoleIds.length) {
          this.$message({
            message: "请先选择需要绑定的角色",
            type: "warning",
            duration: 1000,
          });
          return;
        }
        let obj = {
          adminStaffId: this.roleListQuery.id,
          roleIds: this.checkedBindRoleIds.join(),
        };
        setAdminStaffBindRoles(obj).then((response) => {
          if (response.retCode === 200) {
            this.$message({
              message: "绑定角色成功！",
              type: "success",
              duration: 1000,
            });
            this.roleDialogVisible = false;
            this.getList();
          }
        });
      } else {
        this.$message({
          message: "您还没做任何修改呢",
          type: "warning",
          duration: 1000,
        });
      }
    },
    roleHandleSearchList() {
      this.getRoleList();
    },

    roleHandleSizeChange(val) {
      this.roleListQuery.pageIndex = 1;
      this.roleListQuery.pageSize = val;
      this.getRoleList();
    },
    roleHandleCurrentChange(val) {
      this.staffListQuery.pageIndex = val;
      this.getRoleList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleSearchList() {
      this.listQuery.pageIndex = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageIndex = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
    },
    handleAdd(row) {
      this.dialogVisible = true;
      this.isEdit = false;
      this.admin = Object.assign({}, defaultAdmin);
      this.admin.id = 0;
    },
    handleStatusChange(status, row) {
      row.verify = status === 1 ? 0 : 1;
      this.$confirm("是否要修改该状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          setAdminStaffVerify({ verify: status, commonIds: row.id }).then(
            (response) => {
              if (response.retCode === 200) {
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
                row.verify = status;
              } else {
                this.$message({
                  type: "info",
                  message: "修改失败",
                });
              }
            }
          );
        })
        .catch(() => {
          let oldStatus = status === 1 ? 0 : 1;
          row.verify = oldStatus;
          this.$message({
            type: "info",
            message: "取消修改",
          });
          // this.getList();
        });
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该员工?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        setDelAdminStaff({ id: row.id }).then((response) => {
          if (response.retCode === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          }
        });
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      getAdminStaffDetails({ id: row.id }).then((response) => {
        if (response.retCode === 200) {
          this.admin = Object.assign({}, response.retData);
          this.admin.countyId = 3005;
        }
      });
    },
    handleDialogConfirm() {
      this.$refs.adminForm.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            if (this.admin.passwordEdit) {
              //更新密码
              this.admin.password = md5(this.admin.passwordEdit);
            }
            setAdminStaff(this.admin).then((response) => {
              if (response.retCode === 200) {
                this.dialogVisible = false;
                this.admin = {};
                this.$message({
                  message: "编辑成功！",
                  type: "success",
                  duration: 1000,
                });
                this.$refs.adminForm.resetFields();
                this.getList();
              }
            });
          } else {
            let admin = Object.assign({}, this.admin);
            admin.password = md5(admin.password);
            setAdminStaff(admin).then((response) => {
              if (response.retCode === 200) {
                this.dialogVisible = false;
                this.admin = {};
                this.$message({
                  message: "新增成功！",
                  type: "success",
                  duration: 1000,
                });
                this.$refs.adminForm.resetFields();
                this.getList();
              } else {
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    handleSelectRole(index, row) {
      this.roleListQuery.id = row.id;
      this.roleTitle = `绑定 ${row.name} 下的角色`;
      this.getRoleList();
    },
    findAllChildren(data, arr) {
      data.forEach((item, index) => {
        if (item.id !== 0) {
          arr.push(item);
        }
        if (item.childs.length !== 0) {
          this.findAllChildren(item.childs, arr);
        }
      });
    },
    getDepartmentList() {
      getDepartments().then((response) => {
        if (response.retCode === 200) {
          this.findAllChildren(response.retData, this.departmentList);
        }
      });
    },
    getList() {
      this.listLoading = true;
      getAdminStaffs(this.listQuery).then((response) => {
        if (response.retCode === 200) {
          this.listLoading = false;
          this.list = response.retData.pageData;
          this.total = response.retData.recordCount;
        }
      });
    },
    getRoleList() {
      this.listLoading = true;
      this.roleDialogVisible = true;
      getRoleByAdminStaff(this.roleListQuery).then((response) => {
        this.listLoading = false;
        this.roleList = response.retData.pageData;
        this.roleList.forEach((v, i) => {
          if (v.isChecked) {
            this.$nextTick(() => {
              this.$refs.roleTable.toggleRowSelection(v);
            });

            this.oldBindRoleIds.push(v.id);
          }
        });
        this.checkedBindRoleIds = JSON.parse(
          JSON.stringify(this.oldBindRoleIds)
        );
        this.roleTotal = response.retData.recordCount;
      });
    },
    roleClose() {
      this.oldBindRoleIds = [];
      this.checkedBindRoleIds = [];
      this.roleListQuery = Object.assign({}, roleDefaultListQuery);
    },
  },
};
</script>
<style lang="scss" scoped>
.enabled {
  color: #67c23a;
}
</style>


