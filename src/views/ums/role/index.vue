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
              placeholder="角色名称"
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
        <span>角色列表</span>
      </div>

      <el-button
        size="small"
        class="btn-add"
        @click="handleAdd()"
        v-permission="['Post_Jurisdiction_setRole']"
        style="margin-left: 20px"
        icon="el-icon-plus"
        type="primary"
        >添加</el-button
      >
    </el-card>
    <div class="table-container">
      <el-table
        ref="roleTable"
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
        <el-table-column label="编号" type="index" width="60" align="center">
        </el-table-column>
        <el-table-column label="角色名称" align="center">
          <template slot-scope="scope">{{ scope.row.roleName }}</template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{ scope.row.remark }}</template>
        </el-table-column>
        <el-table-column label="状态" width="160" align="center">
          <template slot-scope="scope">
            <span :class="scope.row.verify ? 'enable_txt' : 'disable_txt'">{{
              scope.row.verify ? "启用" : "禁用"
            }}</span></template
          >
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{
            scope.row.joinTime | formatDateTime
          }}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              v-permission="['Post_Jurisdiction_setRoleVerify']"
              @change="handleStatusChange($event, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.verify"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-row class="handle-table-box">
              <el-button
                size="mini"
                type="primary"
                v-permission="['Get_Jurisdiction_getAdminStaffByRole']"
                @click="handleStaff(scope.row.id)"
                >查看员工
              </el-button>
              <el-button
                size="mini"
                type="primary"
                v-permission="['Post_Jurisdiction_setAdminAppliByRole']"
                @click="handleSelectMenu(scope.$index, scope.row)"
                >绑定权限
              </el-button>
              <el-button
                size="mini"
                type="primary"
                v-permission="['Post_Jurisdiction_setRole']"
                @click="handleUpdate(scope.$index, scope.row)"
              >
                编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                v-permission="['Post_Jurisdiction_setDelRole']"
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
      :title="isEdit ? '编辑角色' : '添加角色'"
      :visible.sync="dialogVisible"
      width="500px"
      @close="close()"
      :close-on-click-modal="false"
    >
      <el-form
        :model="role"
        ref="roleForm"
        :rules="rules"
        label-width="80px"
        size="small"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="role.roleName" class="input-width"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色码" prop="roleCode">
          <el-input v-model="role.roleCode" style="width: 250px"></el-input>
        </el-form-item> -->
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="role.remark"
            type="textarea"
            :rows="5"
            class="input-width"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否启用">
          <el-radio-group v-model="role.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
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
      title="员工列表"
      :visible.sync="staffDialogVisible"
      width="90%"
      @close="staffClose()"
      class="clearfix"
      :close-on-click-modal="false"
    >
      <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="staffListQuery" size="small">
            <el-form-item label="输入搜索">
              <el-input
                v-model="staffListQuery.keyword"
                class="input-width"
                placeholder="搜索关键词"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item class="fr">
              <el-button
                type="primary"
                @click="staffHandleSearchList()"
                size="small"
              >
                查询
              </el-button>
              <el-button @click="staffHandleResetSearch()" size="small">
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-table
        ref="roleTable"
        :data="staffList"
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
        <el-table-column label="创建时间" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.joinTime }}</template>
        </el-table-column>
        <el-table-column label="状态" width="160" align="center">
          <template slot-scope="scope">
            <span :class="scope.row.verify ? 'enable_txt' : 'disable_txt'">
              {{ scope.row.verifyMsg }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="clearfix">
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="staffHandleSizeChange"
            @current-change="staffHandleCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="staffListQuery.pageSize"
            :page-sizes="[10, 20, 30]"
            :current-page.sync="staffListQuery.pageIndex"
            :total="staffTotal"
          >
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getRoles,
  fetchStaffList,
  setRole,
  getRoleDetails,
  setRoleVerify,
  setDelRole,
} from "@/api/role";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null,
};
const staffDefaultListQuery = {
  pageIndex: 1,
  pageSize: 10,
  id: null,
  keyword: null,
};

export default {
  name: "roleList",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      staffListQuery: Object.assign({}, staffDefaultListQuery),
      list: null,
      staffList: null,
      total: null,
      id: null,
      listLoading: false,
      dialogVisible: false,
      staffDialogVisible: false,
      staffTotal: null,
      role: {},
      isEdit: false,
      rules: {
        roleCode: [
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        remark: [{ max: 50, message: "最多50字符", trigger: "blur" }],
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个中英文数字",
            trigger: "blur",
          },
        ],
      },
      isCreated: false,
    };
  },
  activated() {
    if (!this.isCreated) {
      this.getList();
    }
    this.isCreated = false;
  },
  created() {
    this.isCreated = true;
    this.getList();
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
    close() {
      this.role = {};
      this.$refs.roleForm.resetFields();
    },
    staffClose() {
      this.staffListQuery = Object.assign({}, staffDefaultListQuery);
    },
    handleStaff(id) {
      this.listLoading = true;
      this.staffListQuery.id = id;
      this.id = id;
      this.getStaffList();
    },
    getStaffList() {
      fetchStaffList(this.staffListQuery).then((response) => {
        this.listLoading = false;
        this.staffDialogVisible = true;
        this.staffList = response.retData.pageData;
        this.staffTotal = response.retData.recordCount;
      });
    },
    staffHandleSearchList() {
      this.getStaffList();
    },
    staffHandleResetSearch() {
      this.staffListQuery = Object.assign({ id: this.id }, defaultListQuery);
      this.getStaffList();
    },
    staffHandleSizeChange(val) {
      this.staffListQuery.pageIndex = 1;
      this.staffListQuery.pageSize = val;
      this.getStaffList();
    },
    staffHandleCurrentChange(val) {
      this.staffListQuery.pageIndex = val;
      this.getStaffList();
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
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

    handleStatusChange(status, row) {
      row.verify = status === 1 ? 0 : 1;
      this.$confirm("是否要修改该状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          setRoleVerify({ verify: status, commonIds: row.id }).then(
            (response) => {
              if (response.retCode === 200) {
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
                row.verify = status;
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
          // this.getList();
        });
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        setDelRole({ id: row.id }).then((response) => {
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
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      getRoleDetails({ id: row.id }).then((response) => {
        if (response.retCode === 200) {
          this.role = Object.assign({}, response.retData);
        }
      });
    },
    handleDialogConfirm() {
      this.$refs.roleForm.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            setRole(this.role).then((response) => {
              if (response.retCode === 200) {
                this.dialogVisible = false;
                this.role = {};
                this.$message({
                  message: "编辑成功！",
                  type: "success",
                  duration: 1000,
                });
                this.getList();
              }
            });
          } else {
            this.role.id = 0;
            this.role.roleCode = "000";
            setRole(this.role).then((response) => {
              if (response.retCode === 200) {
                this.dialogVisible = false;
                this.role = {};
                this.$message({
                  message: "新增成功！",
                  type: "success",
                  duration: 1000,
                });
                this.getList();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSelectMenu(index, row) {
      this.$router.push({ path: "/ums/allocMenu", query: { roleId: row.id } });
    },
    handleSelectResource(index, row) {
      this.$router.push({
        path: "/ums/allocResource",
        query: { roleId: row.id },
      });
    },
    getList() {
      this.listLoading = true;
      getRoles(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.retData.pageData;
        this.total = response.retData.recordCount;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.enabled {
  color: #67c23a;
}
</style>


