<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small">
          <el-form-item label="菜单名称">
            <el-input
              v-model="listQuery.keyword"
              class="input-width"
              placeholder="请输入菜单名称"
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
        <i class="el-icon-tickets" style="margin-top: 5px"></i>
        <span style="margin-top: 5px">菜单列表</span>
      </div>

      <el-button
        class="btn-add"
        @click="add()"
        icon="el-icon-plus"
        type="primary"
        size="small"
        v-permission="['Post_Jurisdiction_setAdminSystems']"
      >
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="menuTable"
        style="width: 100%"
        :data="list"
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
        <el-table-column label="菜单名称" align="center">
          <template slot-scope="scope">{{ scope.row.systemName }} </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span :class="scope.row.verify ? 'enable_txt' : 'disable_txt'">{{
              scope.row.verify ? "启用" : "禁用"
            }}</span></template
          >
        </el-table-column>
        <!-- <el-table-column label="权重" align="center">
          <template slot-scope="scope">{{ scope.row.grade }}</template>
        </el-table-column> -->
        <!-- <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column> -->

        <el-table-column
          label="是否启用"
          width="100"
          align="center"
  
        >
          <template slot-scope="scope">
            <el-switch
                    v-permission="['Post_Jurisdiction_setAdminSystemsVerify']"
              @change="handleHiddenChange($event, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.verify"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.joinTime }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-row class="handle-table-box">
              <el-button
                size="mini"
                type="primary"
                v-permission="['Post_Jurisdiction_setAdminSystemBindRoles']"
                @click="handleBindingRole(scope.row.id, scope.row.systemName)"
                >绑定角色
              </el-button>
              <el-button
                size="mini"
                type="primary"
                v-permission="['Post_Jurisdiction_setAdminSystems']"
                @click="edit(scope.row)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                v-permission="['Post_Jurisdiction_setAdminAppli']"
                @click="handlePermission(scope.row.id)"
                >设置权限
              </el-button>

              <el-button
                size="mini"
                type="primary"
                @click="handleStaff(scope.row.id)"
                v-permission="['Get_Jurisdiction_getAdminStaffBySys']"
                >查看
              </el-button>

              <!-- <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button> -->
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
          :page-size="listQuery.pageSize"
          :page-sizes="[10, 20, 30]"
          :current-page.sync="listQuery.pageIndex"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <el-dialog
      title="员工列表"
      :visible.sync="staffDialogVisible"
      width="90%"
      @close="staffClose()"
      class="clearfix"
       :close-on-click-modal='false'
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
                icon="el-icon-search"
              >
                查询
              </el-button>
              <el-button
                @click="staffHandleResetSearch()"
                size="small"
                icon="el-icon-refresh"
              >
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
            <span :class="scope.row.verify ? 'color-success' : ''">
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

    <el-dialog
      :title="isEdit ? '编辑菜单' : '新增菜单'"
      :visible.sync="dialogVisible"
      width="500px"
       :close-on-click-modal='false'
    >
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        size="small"
        @submit.native.prevent
      >
        <el-form-item label="菜单名称" prop="systemName">
          <el-input v-model="form.systemName" style="width: 250px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="系统编号" prop="systemCode">
          <el-input v-model="form.systemCode" style="width: 250px"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="备注" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="4"
            maxlength="20"
            style="width: 250px"
            show-word-limit
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

    <el-dialog
      :title="roleTitle"
      :visible.sync="roleDialogVisible"
      width="60%"
      @close="roleClose()"
      class="clearfix"
       :close-on-click-modal='false'
    >
      <el-card
        class="filter-container"
        style="margin-bottom: 20px"
        shadow="never"
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
                icon="el-icon-search"
              >
                查询
              </el-button>
              <el-button
                @click="roleHandleResetSearch()"
                size="small"
                icon="el-icon-refresh"
              >
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
        :header-cell-style="{
          background: '#F2F6FA',
          color: '#555555',
          'text-align': 'center',
        }"
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
      <div class="clearfix" style="padding: 10px 10px 0 0;text-align: center;">
        <el-button
          type="primary"
     
          size="small"
          @click="saveBindRoles"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  setAdminSystemsVerify,
  getAdminStaffBySys,
  setAdminSystems,
  getRoleBySystem,
  setAdminSystemBindRoles,
} from "@/api/menu";
import { isArr } from "@/utils/index";
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
const roleDefaultListQuery = {
  pageIndex: 1,
  pageSize: 10,
  id: null,
  keyword: null,
};

export default {
  name: "menuList",
  data() {
    return {
      list: [],
      staffList: [],
      roleList: [],
      roleDialogVisible: false,
      form: {},
      total: null,
      staffTotal: null,
      roleTotal: null,
      id: null,
      listLoading: true,
      listQuery: Object.assign({}, defaultListQuery),
      staffListQuery: Object.assign({}, staffDefaultListQuery),
      roleListQuery: Object.assign({}, roleDefaultListQuery),
      parentId: 0,
      staffDialogVisible: false,
      isEdit: false,
      dialogVisible: false,
      roleTitle: null,
      multipleSelection: [],
      oldBindRoleIds: [], //以前绑定的ID集合，用于判断用户是否改变了绑定角色，没有则不请求修改接口
      checkedBindRoleIds: [], //现在绑定的ID集合
      rules: {
        systemCode: [
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        content: [{ max: 20, message: "最多20字符", trigger: "blur" }],
        systemName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
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
  filters: {},
  activated() {
    if (!this.isCreated) {
      this.getList();
    }
    this.isCreated = false;
  },
  created() {
    this.isCreated = true;
    // this.resetParentId();
    this.getList();
  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getList();
    },
  },
  methods: {
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
            message: "请选择需要绑定的角色",
            type: "warning",
            duration: 1000,
          });
          return;
        }
        let obj = {
          id: this.id,
          roleIds: this.checkedBindRoleIds.join(),
        };
        setAdminSystemBindRoles(obj).then((response) => {
          if (response.retCode === 200) {
            this.$message({
              message: "绑定角色成功！",
              type: "success",
              duration: 1000,
            });
            this.roleDialogVisible = false;
            // this.getRoleList();
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleBindingRole(id, name) {
      this.roleListQuery.id = id;
      this.id = id;
      this.roleTitle = `绑定 ${name} 下的角色`;
      this.getRoleList();
    },
    getRoleList() {
      this.listLoading = true;
      this.roleDialogVisible = true;
      getRoleBySystem(this.roleListQuery).then((response) => {
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
    handleDialogConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            setAdminSystems(this.form).then((response) => {
              if (response.retCode === 200) {
                this.dialogVisible = false;
                this.form = {};
                this.$message({
                  message: "编辑成功！",
                  type: "success",
                  duration: 1000,
                });
                this.getList();
              }
            });
          } else {
            this.form.verify = 1;
            setAdminSystems(this.form).then((response) => {
              if (response.retCode === 200) {
                this.dialogVisible = false;
                this.form = {};
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
    edit(data) {
      this.isEdit = true;
      this.form = Object.assign({}, data);
      // this.form.systemCode = data.systemCode;
      // this.form.systemName = data.systemName;
      // this.form.id = data.id;
      this.dialogVisible = true;
    },
    add(data) {
      this.isEdit = false;
      this.form = {};
      this.dialogVisible = true;
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
      getAdminStaffBySys(this.staffListQuery).then((response) => {
        if (response.retCode === 200) {
          this.listLoading = false;
          this.staffDialogVisible = true;
          this.staffList = response.retData.pageData;
          this.staffTotal = response.retData.recordCount;
        }
      });
    },
    handleSearchList() {
      this.getList();
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
    },
    staffHandleSearchList() {
      this.getStaffList();
    },
    staffHandleResetSearch() {
      this.staffListQuery = Object.assign({ id: this.id }, defaultListQuery);
      this.getStaffList();
    },
    roleHandleSearchList() {
      this.getRoleList();
    },
    roleHandleResetSearch() {
      this.roleListQuery = Object.assign({}, roleDefaultListQuery);
      this.roleListQuery.id = this.id;
      this.getRoleList();
    },
    resetParentId() {
      this.listQuery.pageIndex = 1;
      if (this.$route.query.parentId != null) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    },

    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.retData.pageData;
        this.total = response.retData.recordCount;
      });
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
    staffHandleSizeChange(val) {
      this.staffListQuery.pageIndex = 1;
      this.staffListQuery.pageSize = val;
      this.getStaffList();
    },
    staffHandleCurrentChange(val) {
      this.staffListQuery.pageIndex = val;
      this.getStaffList();
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
    handleHiddenChange(status, row) {
      row.verify = status === 1 ? 0 : 1;
      this.$confirm("是否要修改该状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          setAdminSystemsVerify({
            verify: status,
            commonIds: row.id,
          }).then((response) => {
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
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
          // this.getList();
        });
    },
    handlePermission(id) {
      console.log(id);
      this.$router.push({ path: "/ums/setPermission", query: { id } });
    },

    // handleDelete(index, row) {
    //   this.$confirm("是否要删除该菜单", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(() => {
    //     deleteMenu(row.id).then((response) => {
    //       this.$message({
    //         message: "删除成功",
    //         type: "success",
    //         duration: 1000,
    //       });
    //       this.getList();
    //     });
    //   });
    // },
  },
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return "一级";
      } else if (value === 1) {
        return "二级";
      }
    },
    disableNextLevel(value) {
      if (value === 0) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.enabled {
  color: #67c23a;
}
</style>
